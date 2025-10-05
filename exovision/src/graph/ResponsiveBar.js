import { ResponsiveBar } from '@nivo/bar'
import './ResponsiveBar.css'

function PRDGraph() {
    const data = [
  {
    "PRD": "1",
    "value": 30,
  },
  {
    "PRD": "2",
    "value": 57,
  },
  {
    "PRD": "3",
    "value": 130,
  },
  {
    "PRD": "4",
    "value": 101,
  },
  {
    "PRD": "5",
    "value": 18,
  },
  {
    "PRD": "6",
    "value": 192,
  },
  {
    "PRD": "7",
    "value": 17,
  },
  {
    "PRD": "8",
    "value": 54
  }
]

    const MyBar = ({ data /* see data tab */ }) => (
    <ResponsiveBar /* or Bar for fixed dimensions */
         
        data={data}
        indexBy="PRD"
        enableGridX={true}
        enableLabel={false}
        colors={{ scheme: 'paired' }}
        margin={{ top: 20, right: 0, bottom: 30, left: 79 }}
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
    )
    return(
        <div className='ResponiveBarBack'>
            <MyBar data={data}/>
        </div>
    )
}

export default PRDGraph