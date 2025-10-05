import './Expert.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import exovision from './../assets/EXOVISION.png'
import apiClient from './exoplanetApi';

function Expert() {
    const navigate = useNavigate();

    // 19 basic parameters for expert mode with example values
    const [ra, setRa] = useState(291.93);
    const [dec, setDec] = useState(48.14);
    const [koi_period, setKoi_period] = useState(9.9);
    const [koi_eccen, setKoi_eccen] = useState(0.0);
    const [koi_longp, setKoi_longp] = useState(90.0);
    const [koi_incl, setKoi_incl] = useState(89.5);
    const [koi_impact, setKoi_impact] = useState(0.1);
    const [koi_sma, setKoi_sma] = useState(0.09);
    const [koi_duration, setKoi_duration] = useState(2.5);
    const [koi_depth, setKoi_depth] = useState(500);
    const [koi_prad, setKoi_prad] = useState(1.8);
    const [koi_insol, setKoi_insol] = useState(50);
    const [koi_teq, setKoi_teq] = useState(450);
    const [koi_srad, setKoi_srad] = useState(1.0);
    const [koi_smass, setKoi_smass] = useState(1.0);
    const [koi_sage, setKoi_sage] = useState(4.5);
    const [koi_steff, setKoi_steff] = useState(5800);
    const [koi_slogg, setKoi_slogg] = useState(4.5);
    const [koi_smet, setKoi_smet] = useState(0.0);

    const predictExpert = async () => {
        // Only 19 basic parameters - backend will calculate the rest
        const data = {
            ra: parseFloat(ra) || 0,
            dec: parseFloat(dec) || 0,
            koi_period: parseFloat(koi_period) || 0,
            koi_eccen: parseFloat(koi_eccen) || 0,
            koi_longp: parseFloat(koi_longp) || 0,
            koi_incl: parseFloat(koi_incl) || 0,
            koi_impact: parseFloat(koi_impact) || 0,
            koi_sma: parseFloat(koi_sma) || 0,
            koi_duration: parseFloat(koi_duration) || 0,
            koi_depth: parseFloat(koi_depth) || 0,
            koi_prad: parseFloat(koi_prad) || 0,
            koi_insol: parseFloat(koi_insol) || 0,
            koi_teq: parseFloat(koi_teq) || 0,
            koi_srad: parseFloat(koi_srad) || 0,
            koi_smass: parseFloat(koi_smass) || 0,
            koi_sage: parseFloat(koi_sage) || 0,
            koi_steff: parseFloat(koi_steff) || 0,
            koi_slogg: parseFloat(koi_slogg) || 0,
            koi_smet: parseFloat(koi_smet) || 0
        };

        try {
            const response = await apiClient.post('/api/v1/exoplanet/predict/expert', data);

            // Navigate to result page with prediction data
            navigate('/result', { state: { prediction: response.data, mode: 'expert' } });
        } catch (error) {
            console.error('Prediction failed:', error);
            alert('Prediction failed. Please check your input values and ensure all required fields are filled.');
        }
    };

    return (
        <div className='ExpertBody'>
            <div className="ExpertHeader">
                <img src={exovision} onClick={() => navigate('/')}></img>
            </div>
            <div><div className='ExpertTitle'>EXPLORE EXOPLANETS</div></div>
            <div>
                <div className='ExpertTextForm'>
                    <div className='ExpertTextFormBeginner'><div className='ExpertTextBeginner'>Beginner</div></div>
                    <div className='ExpertTextFormExpert'><div className='ExpertTextExpert'>Expert</div></div>
                </div>
            </div>
            <div className='ExpertDetailFormBox'>
                <div className='ExpertDetailForm'></div>
                <div className='ExpertDetailTextForm'><div className='ExpertDetail'>Want to explore space with real data?<br/>Enter the numbers yourself and determine the likelihood of an exoplanet.<br/>Experience the thrill of discovery like a true astronomer.</div></div>
            </div>
            
            
            <div className='ExpertUI'>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>RA (Right Ascension)</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={ra} onChange={(e) => setRa(e.target.value)} placeholder="0-360"></input>
                            <div className='ExpertInputSub'>degrees</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Dec (Declination)</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={dec} onChange={(e) => setDec(e.target.value)} placeholder="-90 to 90"></input>
                            <div className='ExpertInputSub'>degrees</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Orbital Period</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_period} onChange={(e) => setKoi_period(e.target.value)} placeholder="days"></input>
                            <div className='ExpertInputSub'>days</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Eccentricity</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_eccen} onChange={(e) => setKoi_eccen(e.target.value)} placeholder="0-1" step="0.01"></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Longitude of Periastron</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_longp} onChange={(e) => setKoi_longp(e.target.value)} placeholder="degrees"></input>
                            <div className='ExpertInputSub'>degrees</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Inclination</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_incl} onChange={(e) => setKoi_incl(e.target.value)} placeholder="degrees"></input>
                            <div className='ExpertInputSub'>degrees</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Impact Parameter</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_impact} onChange={(e) => setKoi_impact(e.target.value)} step="0.1"></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Semi-major Axis</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_sma} onChange={(e) => setKoi_sma(e.target.value)} placeholder="AU" step="0.01"></input>
                            <div className='ExpertInputSub'>AU</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Transit Duration</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_duration} onChange={(e) => setKoi_duration(e.target.value)} placeholder="hours" step="0.1"></input>
                            <div className='ExpertInputSub'>hours</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Transit Depth</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_depth} onChange={(e) => setKoi_depth(e.target.value)} placeholder="ppm"></input>
                            <div className='ExpertInputSub'>ppm</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Planet Radius</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_prad} onChange={(e) => setKoi_prad(e.target.value)} placeholder="Earth radii" step="0.1"></input>
                            <div className='ExpertInputSub'>R⊕</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Insolation Flux</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_insol} onChange={(e) => setKoi_insol(e.target.value)} step="1"></input>
                            <div className='ExpertInputSub'>Earth flux</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Equilibrium Temperature</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_teq} onChange={(e) => setKoi_teq(e.target.value)} placeholder="K"></input>
                            <div className='ExpertInputSub'>K</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Stellar Radius</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_srad} onChange={(e) => setKoi_srad(e.target.value)} placeholder="Solar radii" step="0.1"></input>
                            <div className='ExpertInputSub'>R☉</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Stellar Mass</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_smass} onChange={(e) => setKoi_smass(e.target.value)} placeholder="Solar masses" step="0.1"></input>
                            <div className='ExpertInputSub'>M☉</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Stellar Age</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_sage} onChange={(e) => setKoi_sage(e.target.value)} placeholder="Gyr" step="0.1"></input>
                            <div className='ExpertInputSub'>Gyr</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Stellar Effective Temperature</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_steff} onChange={(e) => setKoi_steff(e.target.value)} placeholder="K"></input>
                            <div className='ExpertInputSub'>K</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Stellar Surface Gravity (log g)</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_slogg} onChange={(e) => setKoi_slogg(e.target.value)} step="0.1"></input>
                            <div className='ExpertInputSub'>cgs</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Stellar Metallicity [Fe/H]</div>
                        <div className='test'>
                            <input type='number' className='ExpertInput' value={koi_smet} onChange={(e) => setKoi_smet(e.target.value)} step="0.1"></input>
                            <div className='ExpertInputSub'>dex</div>
                        </div>
                    </div>
                </div>
            </div>

            <div><div className='ExpertSubmitForm' onClick={predictExpert}><div className='ExpertSubmit'>Start the Journey</div></div></div>
            <div className='Eclipse1'></div>
            <div className='Eclipse2'></div>
            <div className='Eclipse3'></div>
            <div className='ExpertSwitchBeginner' onClick={() => navigate("/begin")}></div>
        </div>
    );
}

export default Expert;