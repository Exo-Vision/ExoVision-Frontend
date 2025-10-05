import { ResponsiveLine } from "@nivo/line";
import React, { useMemo } from "react";

export default function TransitLightCurveGraph({
                                                   transitDuration,          // hours (total)
                                                   transitDepth,             // fractional drop (e.g., 0.01 = 1%)
                                                   signalToNoiseRatio,       // SNR (higher => less noise)
                                                   points = 400,
                                               }) {
    const duration = Math.max(0.1, Number(transitDuration) || 2);
    const depth    = Math.max(0,   Number(transitDepth)    || 0.01);
    const SNR      = Math.max(1,   Number(signalToNoiseRatio) || 50);

    const timeSpan = [0, Math.round(duration * 2)];
    const midTime  = (timeSpan[1] - timeSpan[0]) / 2 + timeSpan[0];

    // --- small PRNG + gaussian noise (deterministic) ---
    let seed = 42;
    const rand = () => {
        // LCG for stable uniforms in [0,1)
        seed = (1664525 * seed + 1013904223) >>> 0;
        return seed / 2 ** 32;
    };
    const gaussian = () => {
        // Box–Muller
        const u1 = Math.max(1e-12, rand());
        const u2 = rand();
        return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    };
    const noiseStd = depth / SNR; // tie noise to depth and SNR

    // Smooth dip: baseline 1 minus a gaussian; width picked from duration
    const data = useMemo(() => {
        const [t0, t1] = timeSpan;
        const sigma = duration / 6; // ~99% inside duration
        const series = [];

        for (let i = 0; i < points; i++) {
            const t = t0 + (i / (points - 1)) * (t1 - t0);
            const g = Math.exp(-0.5 * Math.pow((t - midTime) / sigma, 2));
            const fluxIdeal = 1 - depth * g;
            const fluxNoisy = fluxIdeal + gaussian() * noiseStd; // <<< add noise
            series.push({ x: +t.toFixed(3), y: +fluxNoisy.toFixed(5) });
        }

        return [{ id: "Transit", color: "url(#lcGrad)", data: series }];
    }, [duration, depth, midTime, timeSpan, points, noiseStd]);

    return (
        <div style={{ height: 360, width: "100%", background: "#0D1553", borderRadius: 8 }}>
            <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                    <linearGradient id="lcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FF4D00" />
                        <stop offset="100%" stopColor="#FFC63A" />
                    </linearGradient>
                </defs>
            </svg>

            <ResponsiveLine
                data={data}
                margin={{ top: 24, right: 20, bottom: 52, left: 64 }}
                xScale={{ type: "linear", min: timeSpan[0], max: timeSpan[1] }}
                yScale={{ type: "linear", min: 0.95, max: 1.005 }}
                axisBottom={{
                    legend: "Time",
                    legendOffset: 40,
                    legendPosition: "middle",
                    tickSize: 0,
                    tickPadding: 10,
                }}
                axisLeft={{
                    legend: "Normalized Brightness",
                    legendOffset: -52,
                    legendPosition: "middle",
                    tickSize: 0,
                    tickPadding: 10,
                    format: (v) => v.toFixed(2),
                }}
                enablePoints={false}
                useMesh
                curve="monotoneX"
                lineWidth={3}
                colors={(d) => d.color}
                theme={{
                    background: "#0D1553",
                    text: { fill: "#E9EDF8", fontFamily: "Pretendard, system-ui, sans-serif" },
                    axis: { ticks: { text: { fill: "#E9EDF8" } }, legend: { text: { fill: "#E9EDF8" } } },
                    grid: { line: { stroke: "rgba(233,237,248,0.35)" } },
                }}
                gridXValues={6}
                gridYValues={6}
                enableArea={false}
            />
        </div>
    );
}
