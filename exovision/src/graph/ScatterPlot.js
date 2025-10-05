import { ResponsiveScatterPlot } from '@nivo/scatterplot';

function ScatterPlot({ data, xLabel, yLabel }) {
    return (
        <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveScatterPlot
                data={data}
                margin={{ top: 20, right: 30, bottom: 60, left: 80 }}
                xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: xLabel,
                    legendPosition: 'middle',
                    legendOffset: 46
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: yLabel,
                    legendPosition: 'middle',
                    legendOffset: -60
                }}
                colors={{ scheme: 'nivo' }}
                nodeSize={8}
                enableGridX={true}
                enableGridY={true}
                theme={{
                    background: "#0D1553",
                    text: { fill: "#E9EDF8", fontFamily: "Pretendard, system-ui, sans-serif" },
                    axis: {
                        ticks: { text: { fill: "#E9EDF8" } },
                        legend: { text: { fill: "#E9EDF8" } },
                    },
                    grid: { line: { stroke: "rgba(233,237,248,0.35)" } },
                }}
            />
        </div>
    );
}

export default ScatterPlot;
