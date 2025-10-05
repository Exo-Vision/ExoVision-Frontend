import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import React, { useMemo } from "react";
import rawCatalog from "../data/mission_analysis_scatter.json";

const COLOR_MAP = {
    K2: "#8B89FF",
    Kepler: "#73C6E4",
    TESS: "#FF9F40",
    Yours: "#d1cdc7",
};

const ID_KEY = { k2: "K2", kepler: "Kepler", tess: "TESS" };
const normId = (v) => ID_KEY[String(v).trim().toLowerCase()] ?? String(v).trim();

/** Return [{ id: "K2"|"Kepler"|"TESS", data: [[P,R,depth], ...] }] */
function normalizeCatalog(input) {
    if (!input) return [];
    if (Array.isArray(input)) {
        return input
            .filter((s) => s && s.id && Array.isArray(s.data))
            .map((s) => ({
                id: normId(s.id),
                data: s.data.map((t) => [Number(t[0]), Number(t[1]), t[2] != null ? Number(t[2]) : null]),
            }))
            .filter((s) => s.id === "K2" || s.id === "Kepler" || s.id === "TESS");
    }
    const out = [];
    for (const key of Object.keys(input)) {
        const id = normId(key);
        if (id !== "K2" && id !== "Kepler" && id !== "TESS") continue;
        const rows = input[key];
        if (!Array.isArray(rows) || !rows.length) continue;
        out.push({
            id,
            data: rows.map((r) => [
                Number(r.period),
                Number(r.planet_radius),
                r.transit_depth != null ? Number(r.transit_depth) : null,
            ]),
        });
    }
    return out;
}

function reservoirSample(arr, k) {
    const n = arr.length;
    if (n <= k) return arr;
    const res = arr.slice(0, k);
    for (let i = k; i < n; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        if (j < k) res[j] = arr[i];
    }
    return res;
}

export default function MyScatterPlot({
                                          new_data,
                                          K2Enabled = true,
                                          KeplerEnabled = true,
                                          TESSEnabled = true,
                                          xLabel = "Orbital Period (days)",
                                          yLabel = "Planet Radius (R⊕)",
                                          height = 360,
                                          maxPointsPerSeries = 5,
                                      }) {
    const baseSeries = useMemo(() => normalizeCatalog(rawCatalog), []);

    const enabledSeries = useMemo(() => {
        const allow = new Set([
            ...(K2Enabled ? ["K2"] : []),
            ...(KeplerEnabled ? ["Kepler"] : []),
            ...(TESSEnabled ? ["TESS"] : []),
        ]);
        return baseSeries.filter((s) => allow.has(s.id));
    }, [baseSeries, K2Enabled, KeplerEnabled, TESSEnabled]);

    const series = useMemo(() => {
        const mapped = enabledSeries.map((s) => {
            const sampled = reservoirSample(s.data, maxPointsPerSeries);
            return {
                id: s.id,
                data: sampled.map(([P, R, depth]) => ({ x: P, y: R, depth })),
            };
        });
        if (Array.isArray(new_data) && new_data.length >= 2) {
            const [px, py, pd] = new_data;
            mapped.push({
                id: "Yours",
                data: [{ x: Number(px), y: Number(py), depth: pd != null ? Number(pd) : null, __isNew: true }],
            });
        }
        return mapped;
    }, [enabledSeries, new_data, maxPointsPerSeries]);

    const { xMin, xMax, yMin, yMax } = useMemo(() => {
        const xs = [], ys = [];
        for (const s of series) for (const d of s.data) { xs.push(d.x); ys.push(d.y); }
        if (!xs.length) return { xMin: 0, xMax: 1, yMin: 0, yMax: 1 };
        const pad = (arr) => {
            const min = Math.min(...arr), max = Math.max(...arr);
            const p = Math.max(1e-6, (max - min) * 0.06);
            return [min - p, max + p];
        };
        const [xmin, xmax] = pad(xs);
        const [ymin, ymax] = pad(ys);
        return { xMin: xmin, xMax: xmax, yMin: ymin, yMax: ymax };
    }, [series]);

    // Explicit node renderer: guarantees solid color regardless of CSS
    const renderNode = ({ node }) => {
        const isYours = node.serieId === "Yours";
        const r = isYours ? 6 : 5;
        console.table(node);
        const fill =
            isYours ? COLOR_MAP.Yours : (COLOR_MAP[node.serieId] ?? "#FF00FF"); // visible fallback
        return (
            <g transform={`translate(${node.x},${node.y})`} style={{ mixBlendMode: "normal", opacity: 1 }}>
                <circle r={r} fill={fill} stroke="white" strokeWidth="0.6" />
            </g>
        );
    };

    const yourPointLayer = (ctx) => {
        const yours = series.find((s) => s.id === "Yours");
        if (!yours || !yours.data.length) return null;
        const { xScale, yScale, innerWidth, innerHeight } = ctx;
        const p = yours.data[0];
        const cx = xScale(p.x);
        const cy = yScale(p.y);
        return (
            <g pointerEvents="none" style={{ mixBlendMode: "normal" }}>
                <line x1={cx} y1={0} x2={cx} y2={innerHeight}
                      stroke="rgba(255,198,58,0.6)" strokeDasharray="6 6" strokeWidth="1.5" />
                <line x1={0} y1={cy} x2={innerWidth} y2={cy}
                      stroke="rgba(255,198,58,0.6)" strokeDasharray="6 6" strokeWidth="1.5" />
                <circle cx={cx} cy={cy} r={9} fill="none" stroke="rgba(255,198,58,0.35)" strokeWidth="2" />
                <circle cx={cx} cy={cy} r={6} fill={COLOR_MAP.Yours} stroke="white" strokeWidth="0.6" />
            </g>
        );
    };

    const tooltip = ({ node }) => {
        const d = node.data;
        const fmt = (v) => (typeof v === "number" ? Number(v).toFixed(2) : v);
        return (
            <div style={{
                background: "#0d1028",
                border: "1px solid rgba(139,137,255,0.4)",
                padding: "6px 8px",
                borderRadius: 8,
                fontSize: 12,
                color: "#E9EDF8",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
            }}>
                <strong>{node.serieId}</strong>
                <span>( {fmt(d.x)} days , {fmt(d.y)} R⊕{d.depth != null ? ` , depth=${fmt(d.depth)}` : ""} )</span>
            </div>
        );
    };

    const legendItems = useMemo(
        () => ["K2", "Kepler", "TESS"]
            .filter((id) => series.some((g) => g.id === id))
            .map((id) => ({ id, label: id, color: COLOR_MAP[id] })),
        [series]
    );
    return (
        <div style={{ height, width: "100%", background: "#0D1553", borderRadius: 8 }}>
            <ResponsiveScatterPlot
                data={series}
                margin={{ top: 20, right: 20, bottom: 60, left: 70 }}
                xScale={{ type: "linear", min: xMin, max: xMax }}
                yScale={{ type: "linear", min: yMin, max: yMax }}
                axisBottom={{ legend: xLabel, legendOffset: 42, legendPosition: "end", tickSize: 0, tickPadding: 10 }}
                axisLeft={{ legend: yLabel, legendOffset: -50, legendPosition: "end", tickSize: 0, tickPadding: 10 }}
                // Use a robust color function as well (backup for renderer)
                colors={(serie) => COLOR_MAP[serie.serieId] ?? "#FF00FF"}
                blendMode="normal"
                nodeOpacity={1}
                nodeSize={5}
                useMesh={false}
                tooltip={tooltip}
                renderNode={renderNode}
                layers={["grid", "axes", "nodes", yourPointLayer, "legends"]}
                legends={[
                    {
                        anchor: "bottom",
                        direction: "row",
                        translateY: 44,
                        itemWidth: 90,
                        itemHeight: 16,
                        itemsSpacing: 8,
                        symbolShape: "circle",
                        data: legendItems,
                    },
                ]}
                theme={{
                    background: "#0D1553",
                    text: { fill: "#E9EDF8", fontFamily: "Pretendard, system-ui, sans-serif" },
                    axis: { ticks: { text: { fill: "#E9EDF8" } }, legend: { text: { fill: "#E9EDF8" } } },
                    legends: { text: { fill: "#E9EDF8" } },
                    grid: { line: { stroke: "rgba(233,237,248,0.35)" } },
                }}
            />
        </div>
    );
}
