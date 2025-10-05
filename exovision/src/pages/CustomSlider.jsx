import { Slider, ConfigProvider } from "antd";
import React from "react";
import "./CustomSlider.css";

const defaultPalette = ["#6D32D2", "#A444E5"];

export default function CustomSlider({
                                         min = 0,
                                         max = 100,
                                         step = 1,
                                         gradient = defaultPalette,
                                         formatter = (v) => `${v}`,
                                         styles = {},
                                         value,
                                         setValue,
                                     }) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: "Pretendard",
                }
            }}
        >
            <Slider
                className="no-hover-handle"
                min={min}
                max={max}
                value={value}
                onChange={setValue}
                defaultValue={min}
                step={step}
                styles={{
                    ...styles,
                    root: { width: 702.8, height: 12.33, borderRadius: 100, paddingRight: 0, marginRight: 0, paddingLeft: 0, marginLeft: -100, marginTop: 50.5 },
                    track: { background: segmentGradient(0, value/max, gradient) }, // for single-thumb
                    rail: {background: "rgba(135,135,135,0.3)"},
                }}
                tooltip={{ open: true, placement: "bottom", formatter: formatter,  }}

            />
        </ConfigProvider>
    );
}


function lerp(a, b, t) { return a + (b - a) * t; }

function hexToRgb(hex) {
    if (hex.length === 4) { hex = hex.replace(/([a-f\d])([a-f\d])([a-f\d])/i, '$1$1$2$2$3$3'); }
    let m = hex.replace('#','').match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return null;
    return [parseInt(m[1],16), parseInt(m[2],16), parseInt(m[3],16)];
}

function rgbToCss([r,g,b]) {
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

// interpolate between two colors at t ∈ [0,1]
function lerpColor(c1, c2, t) {
    const a = hexToRgb(c1), b = hexToRgb(c2);
    return rgbToCss([ lerp(a[0],b[0],t), lerp(a[1],b[1],t), lerp(a[2],b[2],t) ]);
}

/**
 * Build a gradient for a segment [p0, p1] (0..1) across a palette.
 * For a simple two-color palette, pass e.g. ["#87D068", "#FFCCC7"].
 */
function segmentGradient(p0, p1, palette = ["#87D068", "#FFCCC7"]) {
    const start = lerpColor(palette[0], palette[palette.length-1], p0);
    const end   = lerpColor(palette[0], palette[palette.length-1], p1);
    return `linear-gradient(to right, ${start} 0%, ${end} 100%)`;
}