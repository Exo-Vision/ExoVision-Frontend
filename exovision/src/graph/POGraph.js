import './POGraph.css';


function POGraph() {
    const tem = 20
    const orbit = 40
    return(
        <div className='POGraph'>
            {(orbit >= 40) && (<div className={(tem > 40)? 'POGHotCircle' : 'POGColdCircle'}></div>)}
            {(orbit < 40) && (<div className={(tem > 40)? 'POGHotCircleSlow' : 'POGColdCircleSlow'}></div>)}
            <div className="POGcircle2"></div>
            <div className='POGraphLine'></div>
        </div>
    )
}

export default POGraph;