import './Result.css'
import exovision from './../assets/EXOVISION.png'
import { useNavigate } from 'react-router-dom'
import gradient_border_400_67 from '../assets/gradient_border_400_67.svg'
import gradient_border_200_53 from '../assets/gradient_border_200_53.svg'
import top_floating_button from '../assets/top_floating_button.svg'
import TransitLightCurveGraph from "./TransitLightCurveGraph";
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
            <div className='ResultPOGraphTitle'>Predicted Orbit Graph</div>
            <div></div>

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

            <div className='ResultHalfGraphForm'>
                <div className='ResultTLCGraph'>
                    <div className='ResultHalfGraphTitle'>Transit Light Curve</div>
                    <TransitLightCurveGraph />
                </div>
            </div>

            <div className='ResultSaveForm2'>
                <div className='ResultSave2'><div className='ResultSaveText2'>+Log This Planet</div></div>
                <div className='ResultDiscovery2' onClick={() => navigate("/history")}>
                    <img src={gradient_border_200_53} alt="gradient_border" />
                    <div className='ResultDiscoveryText2'>Discovery Log</div>
                </div>
            </div>
            <div className='ResultButtonForm'>
                <div className='ResultRefine' onClick={() => navigate("/expert")}>
                    <img src={gradient_border_400_67} alt="gradient_border" />
                    <div className='ResultRefineText'>Refine Input</div>
                </div>
                <div className='ResultRestart' onClick={() => navigate("/")}><div className='ResultRestartText'>Restart Mission</div></div>
            </div>
            <button
                type="button"
                className="ResultTopFloatingButton"
                aria-label="Scroll to top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <img src={top_floating_button} alt="" aria-hidden="true" />
            </button>
        </div>
    );
}

export default Result;