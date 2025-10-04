import './Result.css'
import exovision from './../assets/EXOVISION.png'

function Result() {
    return (
        <div className='ResultBody'>
            <div className='ResultHeader'><img src={exovision}></img></div>
            <div className='ResultSaveForm'>
                <div className='ResultSave'><div className='ResultSaveText'>+Log This Planet</div></div>
                <div className='ResultDiscovery'><div className='ResultDiscoveryText'>Discovery Log</div></div>
            </div>
            <div className='ResultMissionForm'>
                <div className='ResultMissionTitle'>- Mission Log -</div>
                <div className='ResultMissionDetail'>Obital Period:<br/>Transit Duration:<br/>Transit Depth:<br/>Signal-to-Noise Ratio (SNR):</div>
            </div>
            <div className='ResultForm1'>
                <div className='ResultClassifyForm'>
                    <div className='ResultClassifyTitle'>Classification</div>
                    <div className='ResultClassifyDetail'>Planetary Candidate</div>
                </div>
                <div className='ResultProbableForm'>
                    <div className='ResultProbableTitle'>Probability</div>
                    <div className='ResultProbableDetail'>56.2%</div>
                </div>
            </div>
            <div className='ResultForm2'>
                <div className='Result2Box'>
                    <div className='Result2Title'>Accuracy</div>
                    <div className='Result2Detail'>0.948</div>
                </div>
                <div className='Result2Box'>
                    <div className='Result2Title'>F1 Score</div>
                    <div className='Result2Detail'>0.957</div>
                </div>
                <div className='Result2Box'>
                    <div className='Result2Title'>False Positive Rate</div>
                    <div className='Result2Detail'>0.136</div>
                </div>
                <div className='ResultConfidenceForm'>
                    <div className='ResultProbableTitle'>Confidence Score</div>
                    <div className='ResultProbableDetail'>78%</div>
                </div>
            </div>
            <div className='ResultForm3'>
                <div className='Result3Title'>-</div>
                <div className='Result3DetailForm'>
                    <div className='Result3Detail'>Discovered by:<br/>Orbital Period:<br/>Planet Radius:<br/>Semi-major Axis:<br/>Estimated Temperature: </div>
                    <div className='Result3DetailValue'>-<br/>-<br/>-<br/>-<br/>-</div>
                </div>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default Result;