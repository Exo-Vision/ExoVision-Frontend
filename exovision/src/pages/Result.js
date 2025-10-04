import './Result.css'
import exovision from './../assets/EXOVISION.png'
import { useNavigate } from 'react-router-dom'

function Result() {
    const navigate = useNavigate();

    return (
        <div className='ResultBody'>
            <div className='ResultHeader'><img src={exovision} onClick={() => navigate('/')}></img></div>
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
            <div className='ResultPOGraphTitle'>Predicted Orbit Graph</div>
            <div></div>
            <div className='ResultHalfGraphForm'>
                <div className='ResultROCGraph'>
                    <div className='ResultHalfGraphTitle'>ROC Curve</div>
                    <div></div>
                </div>
                <div className='ResultTLCGraph'>
                    <div className='ResultHalfGraphTitle'>Transit Light Curve</div>
                    <div></div>
                </div>
            </div>
            <div className='ResultFPRGraphForm'>
                <div className='ResultFPRGraphBox'>
                    <div className='ResultFPRGraphTitle'>F1 Score</div>
                    <div></div>
                </div>
                <div className='ResultFPRGraphBox'>
                    <div className='ResultFPRGraphTitle'>Precision</div>
                    <div></div>
                </div>
                <div className='ResultFPRGraphBox'>
                    <div className='ResultFPRGraphTitle'>Recall</div>
                    <div></div>
                </div>
            </div>
            <div className='ResultSelectForm'>
                <div className='ResultSelectTitle'>Select Missions</div>
                <div className='ResultSelectBox'>
                    <input type='checkbox' className='ResultSelectInput'></input>
                    <div className='ResultSelectInputText'>K2</div>
                    <div className='ResultSelectInputK2'>7</div>
                    <input type='checkbox' className='ResultSelectInput'></input>
                    <div className='ResultSelectInputText'>Kepler</div>
                    <div className='ResultSelectInputKepler'>7</div>
                    <input type='checkbox' className='ResultSelectInput'>
                    </input><div className='ResultSelectInputText'>TESS</div>
                    <div className='ResultSelectInputTESS'>6</div>
                </div>
            </div>
            <div className='ResultPRDGraphForm'>
                <div className='ResultExpertGraphTitle'>Planet Radius Distribution</div>
                <div></div>
            </div>
            <div className='ResultExpertGraphForm'>
                <div className='ResultExpertGraphTitle'>Orbital Period vs Planet Radius</div>
                <div></div>
            </div>
            <div className='ResultExpertGraphForm'>
                <div className='ResultExpertGraphTitle'>Orbital Period vs Transit Depth</div>
                <div></div>
            </div>
            <div className='ResultExpertGraphForm'>
                <div className='ResultExpertGraphTitle'>Transit Duration Distribution</div>
                <div></div>
            </div>
            <div className='ResultTDDRowGraphForm'>
                <div className='ResultExpertGraphTitle'>Transit Duration Distribution</div>
                <div></div>
            </div>
            <div className='ResultTTDSquareGraphForm'>
                <div className='ResultExpertGraphTitle'>Transit Duration Distribution</div>
                <div></div>
            </div>
            <div className='ResultSaveForm2'>
                <div className='ResultSave2'><div className='ResultSaveText2'>+Log This Planet</div></div>
                <div className='ResultDiscovery2'><div className='ResultDiscoveryText2'>Discovery Log</div></div>
            </div>
            <div className='ResultButtonForm'>
                <div className='ResultRefine'><div className='ResultRefineText'>Refine Input</div></div>
                <div className='ResultRestart' onClick={() => navigate("/")}><div className='ResultRestartText2'>Restart Mission</div></div>
            </div>
        </div>
    );
}

export default Result;