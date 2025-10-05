import { useEffect, useRef } from "react";

/**
 * 배경에 별을 그리는 컴포넌트 입니다.
 * + 유성(혜성) 효과 추가: 좌상단 바깥에서 우하단으로 날아가며 꼬리를 남김
 */
export function StarField({
                              maxStars,
                              density = 0.12,
                              twinkleAmplitude = 0.1,
                              twinkleSpeedRange = [0.2, 0.5],
                              radiusRange = [0.4, 1.4],
                              colorVariance = 2,
                              zIndex = 0,
                              className,

                              followMouse = true,
                              parallaxStrength = 0.08,
                              parallaxEase = 0.08,
                              idleDrift = true,
                              idleDriftStrength,
                              idleDriftSpeed = 0.05,
                              respectReducedMotion = true,

                              // ==== METEORS: public knobs ====
                              meteorsEnabled = true,
                              meteorRateRange = [7, 10],        // average seconds between spawns (min, max)
                              meteorSpeedRange = [600, 1100],      // px/sec
                              meteorLengthRange = [140, 260],      // px tail length
                              meteorThicknessRange = [2, 3.2],     // px stroke width
                              meteorHueRange = [195, 225],         // bluish-white hue
                              meteorSaturation = 90,               // %
                              meteorLightnessHead = 98,            // %
                              meteorLightnessTail = 85,            // %
                              meteorShadowBlur = 12,               // px glow
                          }) {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: true });
        let stars = [];
        let running = true;

        const reduced =
            respectReducedMotion &&
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const state = {
            dpr: 1,
            w: 1,
            h: 1,
            camX: 0,
            camY: 0,
            targetX: 0,
            targetY: 0,
            lastPointerTs: -1e9,
        };

        const rnd = (min, max) => Math.random() * (max - min) + min;
        const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

        function resize() {
            state.dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
            state.w = window.innerWidth;
            state.h = window.innerHeight;

            canvas.width = Math.max(1, Math.floor(state.w * state.dpr));
            canvas.height = Math.max(1, Math.floor(state.h * state.dpr));
            canvas.style.width = `${state.w}px`;
            canvas.style.height = `${state.h}px`;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(state.dpr, state.dpr);

            const area = state.w * state.h;
            const target =
                typeof maxStars === "number" ? maxStars : Math.floor((area / 10000) * density);

            stars = new Array(target).fill(0).map(() => {
                const hue = 220 + (Math.random() * 60 - 30) * colorVariance;
                const baseAlpha = rnd(0.4, 0.9);
                const speed = rnd(twinkleSpeedRange[0], twinkleSpeedRange[1]);
                const phase = rnd(0, Math.PI * 2);
                const r = rnd(radiusRange[0], radiusRange[1]);
                return { x: Math.random() * state.w, y: Math.random() * state.h, r, baseAlpha, hue, speed, phase };
            });
        }

        function setTarget(nx, ny) {
            const minDim = Math.min(state.w, state.h);
            const maxShift = minDim * parallaxStrength;
            state.targetX = -nx * maxShift;
            state.targetY = -ny * maxShift;
            state.lastPointerTs = performance.now();
        }

        function onMouseMove(e) {
            if (!followMouse || reduced) return;
            const nx = (e.clientX / state.w) * 2 - 1;
            const ny = (e.clientY / state.h) * 2 - 1;
            setTarget(nx, ny);
        }

        function onTouchMove(e) {
            if (!followMouse || reduced) return;
            if (!e.touches || e.touches.length === 0) return;
            const t = e.touches[0];
            const nx = (t.clientX / state.w) * 2 - 1;
            const ny = (t.clientY / state.h) * 2 - 1;
            setTarget(nx, ny);
        }

        function resetTarget() {
            state.targetX = 0;
            state.targetY = 0;
        }

        // ==== METEORS: state & helpers ====
        let meteors = []; // {x,y, ux,uy, speed, len, th, hue, alpha}
        let nextMeteorAt = 0; // timestamp (ms) when to spawn next
        const OUT_MARGIN = 120; // spawn/kill margin outside view

        function scheduleNextMeteor(now) {
            // Poisson-ish: random interval in [min,max] sec
            const delay = rnd(meteorRateRange[0], meteorRateRange[1]) * 1000;
            nextMeteorAt = now + delay;
        }

        function spawnMeteor(now) {
            // Start somewhere around top-left OUTSIDE the view
            const sx = rnd(-OUT_MARGIN, state.w * 0.1);
            const sy = rnd(-OUT_MARGIN, state.h * 0.2);

            // Direction ~45° (down-right) with small jitter
            const deg = rnd(35, 55);
            const rad = (deg * Math.PI) / 180;
            const ux = Math.cos(rad);
            const uy = Math.sin(rad);

            const speed = rnd(meteorSpeedRange[0], meteorSpeedRange[1]); // px/s
            const len = rnd(meteorLengthRange[0], meteorLengthRange[1]); // px
            const th = rnd(meteorThicknessRange[0], meteorThicknessRange[1]); // px

            const hue = rnd(meteorHueRange[0], meteorHueRange[1]);

            meteors.push({
                x: sx,
                y: sy,
                ux,
                uy,
                speed,
                len,
                th,
                hue,
                alpha: 1, // can fade if you want
            });

            scheduleNextMeteor(now);
        }

        // draw a single meteor: head at (x,y), tail = head - (ux,uy)*len
        function drawMeteor(m) {
            const headX = m.x;
            const headY = m.y;
            const tailX = m.x - m.ux * m.len;
            const tailY = m.y - m.uy * m.len;

            // gradient along trail: bright near head, fade to transparent
            const grad = ctx.createLinearGradient(headX, headY, tailX, tailY);
            grad.addColorStop(0, `hsla(${m.hue}, ${meteorSaturation}%, ${meteorLightnessHead}%, ${0.95 * m.alpha})`);
            grad.addColorStop(0.25, `hsla(${m.hue}, ${meteorSaturation}%, ${meteorLightnessTail}%, ${0.55 * m.alpha})`);
            grad.addColorStop(1, `hsla(${m.hue}, ${meteorSaturation}%, ${meteorLightnessTail}%, 0)`);

            ctx.save();
            ctx.globalCompositeOperation = "lighter"; // nice additive glow
            ctx.lineCap = "round";
            ctx.lineWidth = m.th;
            ctx.shadowBlur = meteorShadowBlur;
            ctx.shadowColor = `hsla(${m.hue}, ${meteorSaturation}%, ${meteorLightnessHead}%, ${0.9 * m.alpha})`;

            // trail
            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(headX, headY);
            ctx.strokeStyle = grad;
            ctx.stroke();

            // optional head flare
            ctx.beginPath();
            ctx.fillStyle = `hsla(${m.hue}, ${meteorSaturation}%, ${meteorLightnessHead}%, ${0.9 * m.alpha})`;
            ctx.arc(headX, headY, m.th * 1.2, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        // ==== /METEORS ====

        let lastTs = 0;

        function drawFrame(ts) {
            if (!running) return;
            const t = ts / 1000;
            const now = ts;
            const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 0; // clamp 50ms
            lastTs = ts;

            // idle drift after 1.2s of no input
            if (idleDrift && followMouse && !reduced) {
                const idleFor = performance.now() - state.lastPointerTs;
                if (idleFor > 1200) {
                    const minDim = Math.min(state.w, state.h);
                    const r = idleDriftStrength ?? minDim * 0.005;
                    state.targetX = Math.cos(t * 2 * Math.PI * idleDriftSpeed) * r;
                    state.targetY = Math.sin(t * 2 * Math.PI * idleDriftSpeed * 0.77) * r;
                }
            }

            // ease camera
            state.camX += (state.targetX - state.camX) * clamp(parallaxEase, 0.01, 0.5);
            state.camY += (state.targetY - state.camY) * clamp(parallaxEase, 0.01, 0.5);

            // clear & translate
            ctx.clearRect(0, 0, state.w, state.h);
            ctx.save();
            if (!reduced) ctx.translate(state.camX, state.camY);

            // stars
            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                let alpha = s.baseAlpha;
                if (!reduced) {
                    const tw = Math.sin(t * s.speed * 2 * Math.PI + s.phase);
                    alpha = clamp(s.baseAlpha + tw * (twinkleAmplitude * 0.5), 0, 1);
                }
                ctx.shadowBlur = 6;
                ctx.shadowColor = `hsla(${s.hue}, 80%, 85%, ${alpha})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${s.hue}, 100%, 96%, ${alpha})`;
                ctx.fill();
            }

            // ==== METEORS: update + draw ====
            if (meteorsEnabled && !reduced) {
                // spawn
                if (now >= nextMeteorAt) spawnMeteor(now);

                // update & cull
                const w = state.w, h = state.h;
                for (let i = meteors.length - 1; i >= 0; i--) {
                    const m = meteors[i];
                    m.x += m.ux * m.speed * dt;
                    m.y += m.uy * m.speed * dt;

                    // (optional) very slight fade over time:
                    m.alpha = Math.max(0, m.alpha - dt * 0.12);

                    // off-screen?
                    if (m.x > w + OUT_MARGIN || m.y > h + OUT_MARGIN || m.alpha <= 0) {
                        meteors.splice(i, 1);
                        continue;
                    }
                }

                // draw after update
                for (let i = 0; i < meteors.length; i++) drawMeteor(meteors[i]);
            }
            // ==== /METEORS ====

            ctx.restore();
            rafRef.current = requestAnimationFrame(drawFrame);
        }

        // init
        resize();
        rafRef.current = requestAnimationFrame(drawFrame);
        // schedule first meteor so it doesn’t pop immediately
        scheduleNextMeteor(performance.now() + rnd(400, 1200));

        // listeners — use document for robustness
        const onResize = () => resize();
        window.addEventListener("resize", onResize);
        document.addEventListener("mousemove", onMouseMove, { passive: true });
        document.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("blur", resetTarget);
        document.addEventListener("mouseleave", resetTarget);

        const onVis = () => {
            if (document.hidden) {
                if (rafRef.current) cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            } else if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(drawFrame);
            }
        };
        document.addEventListener("visibilitychange", onVis);

        return () => {
            running = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", onResize);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("blur", resetTarget);
            document.removeEventListener("mouseleave", resetTarget);
            document.removeEventListener("visibilitychange", onVis);
        };
    }, [
        maxStars,
        density,
        twinkleAmplitude,
        twinkleSpeedRange,
        radiusRange,
        colorVariance,
        followMouse,
        parallaxStrength,
        parallaxEase,
        idleDrift,
        idleDriftStrength,
        idleDriftSpeed,
        respectReducedMotion,

        // meteors
        meteorsEnabled,
        meteorRateRange,
        meteorSpeedRange,
        meteorLengthRange,
        meteorThicknessRange,
        meteorHueRange,
        meteorSaturation,
        meteorLightnessHead,
        meteorLightnessTail,
        meteorShadowBlur,
    ]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex,
                pointerEvents: "none",
            }}
            className={className}
        />
    );
}
