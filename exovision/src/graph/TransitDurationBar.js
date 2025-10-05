import { ResponsiveBar } from '@nivo/bar';

function TransitDurationBar({ data }) {
    return (
        <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveBar
                data={data}
                keys={['count']}
                indexBy="range"
                margin={{ top: 20, right: 30, bottom: 60, left: 80 }}
                padding={0.3}
                colors={{ scheme: 'paired' }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legend: 'Transit Duration (hours)',
                    legendPosition: 'middle',
                    legendOffset: 50
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Count',
                    legendPosition: 'middle',
                    legendOffset: -60
                }}
                enableLabel={false}
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

export default TransitDurationBar;
