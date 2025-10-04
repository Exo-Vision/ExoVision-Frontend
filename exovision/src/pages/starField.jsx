import { useEffect, useRef } from "react";
/**
 * 배경에 별을 그리는 컴포넌트 입니다.
 * @param {number} maxStars - 최대로 생성할 별의 개수
 * @param {number} density - maxStars가 없을 때 별의 개수를 결정하는 비율
 * @param {number} twinkleAmplitude - 별이 반짝이는 밝기 변화 비율
 * @param {number} twinkleSpeedRange - 별이 반짝이는 속도 비율
 * @param {number} radiusRange - 별 크기 비율
 * @param {number} colorVariance - hue 색상 분포도
 * @param {number} zIndex - 컴포넌트의 z-index
 * @param {string} className - 컴포넌트의 Class Name
 * @param {boolean} followMouse - true로 설정 시, mouse 이벤트를 통해 camera를 이동합니다.
 * @param {number} parallaxStrength - followMouse가 true일 때, camera 이동 속도를 조절합니다.(1)
 * @param {number} parallaxEase - followMouse가 true일 때, camera 이동 속도를 조절합니다.(2)
 * @param {boolean} idleDrift - followMouse가 true일 때, camera 이동 속도를 조절합니다.(3)
 * @param {number} idleDriftStrength - followMouse가 true일 때, camera 이동 속도를 조절합니다.(4)
 * @param {number} idleDriftSpeed - followMouse가 true일 때, camera 이동 속도를 조절합니다.(5)
 * @param {boolean} respectReducedMotion - true로 설정 시, 브라우저의 애니메이션 최소화 설정을 무시합니다
 * @returns
 *
 * */
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
            lastPointerTs: -1e9, // ensure idle drift kicks in initially
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
                return {
                    x: Math.random() * state.w,
                    y: Math.random() * state.h,
                    r,
                    baseAlpha,
                    hue,
                    speed,
                    phase,
                };
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

        function drawFrame(ts) {
            if (!running) return;
            const t = ts / 1000;

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

            // draw
            ctx.clearRect(0, 0, state.w, state.h);
            ctx.save();
            if (!reduced) ctx.translate(state.camX, state.camY);

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
            ctx.restore();
            rafRef.current = requestAnimationFrame(drawFrame);
        }

        // init
        resize();
        rafRef.current = requestAnimationFrame(drawFrame);

        // listeners — use document for robustness
        const onResize = () => resize();
        window.addEventListener("resize", onResize);
        document.addEventListener("mousemove", onMouseMove, { passive: true });
        document.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("blur", resetTarget);
        document.addEventListener("mouseleave", resetTarget);

        // pause when hidden
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