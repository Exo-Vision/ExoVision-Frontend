import './Expert.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import exovision from './../assets/EXOVISION.png'

import apiClient from './exoplanetApi';

function Expert() {
    const navigate = useNavigate();

    const [test1, setTest1] = useState(0);
    const [test2, setTest2] = useState(0);
    const [test3, setTest3] = useState(0);
    const [test4, setTest4] = useState(0);
    const [test5, setTest5] = useState(0);
    const [test6, setTest6] = useState(0);
    const [test7, setTest7] = useState(0);
    const [test8, setTest8] = useState(0);
    const [test9, setTest9] = useState(0);
    const [test10, setTest10] = useState(0);
    const [test11, setTest11] = useState(0);
    const [test12, setTest12] = useState(0);
    const [test13, setTest13] = useState(0);
    const [test14, setTest14] = useState(0);
    const [test15, setTest15] = useState(0);
    const [test16, setTest16] = useState(0);
    const [test17, setTest17] = useState(0);
    const [test18, setTest18] = useState(0);
    const [test19, setTest19] = useState(0);
    const [test20, setTest20] = useState(0);
    const [test21, setTest21] = useState(0);
    const [test22, setTest22] = useState(0);
    const [test23, setTest23] = useState(0);
    const [test24, setTest24] = useState(0);
    const [test25, setTest25] = useState(0);
    const [test26, setTest26] = useState(0);
    const [test27, setTest27] = useState(0);
    const [test28, setTest28] = useState(0);
    const [test29, setTest29] = useState(0);


    const predictExpert = async () => {
        const data = { 
            "ra": test1,
    "dec": test2,
    "koi_period": test3,
    "koi_eccen": test4,
    "koi_longp": test5,
    "koi_incl": test6,
    "koi_impact": test7,
    "koi_sma": test8,
    "koi_duration": test9,
    "koi_depth": test10,
    "koi_prad": test11,
    "koi_insol": test12,
    "koi_teq": test13,
    "koi_srad": test14,
    "koi_smass": test15,
    "koi_sage": test16,
    "koi_steff": test17,
    "koi_slogg": test18,
    "koi_smet": test19,
    "planet_star_ratio": test20,
    "orbital_energy": test21,
    "transit_signal": test22,
    "stellar_density": test23,
    "planet_density_proxy": test24,
    "log_period": test25,
    "log_depth": test26,
    "log_insol": test27,
    "orbit_stability": test28,
    "transit_snr": test29
         }
    try {
    const response = await apiClient.post('/api/v1/exoplanet/predict/expert', data);
    console.log(response)
    return response.data;
        } catch (error) {
        throw error;
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
                        <div className='ExpertInputTitle'>RA</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest1(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>DEC</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest2(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_PERIOD</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest3(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_ECCEN</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest4(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_LONGP</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest5(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_INCL</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest6(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_IMPACT</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest7(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_SMA</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest8(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_DURATION</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest9(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_DEPTH</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest10(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_PRAD</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest11(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_INSOL</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest12(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_TEQ</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest13(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_SRAD</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest14(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_SMASS</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest15(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_SAGE</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest16(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_STEFF</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest17(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_SLOGG</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest18(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>KOI_SMET</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest19(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>PLANET_STAR_RATIO</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest20(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>ORBITAL_ENERGY</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest21(e.target.value)}></input>
                            <div className='ExpertInputSub'>days</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>TRANSIT_SIGNAL</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest22(e.target.value)}></input>
                            <div className='ExpertInputSub'>hours</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>STELLAR_DENSITY</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest23(e.target.value)}></input>
                            <div className='ExpertInputSub'>days</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>PLANET_STAR_RATIO</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest24(e.target.value)}></input>
                            <div className='ExpertInputSub'>hours</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>LOG_PERIOD</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest5(e.target.value)}></input>
                            <div className='ExpertInputSub'>days</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>LOG_DEPTH</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest26(e.target.value)}></input>
                            <div className='ExpertInputSub'>hours</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>LOG_INSOL</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest27(e.target.value)}></input>
                            <div className='ExpertInputSub'>days</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>ORBIT_STABILITY</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest28(e.target.value)}></input>
                            <div className='ExpertInputSub'>hours</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>TRANSIT_SNR</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest29(e.target.value)}></input>
                            <div className='ExpertInputSub'>days</div>
                        </div>
                    </div>
                </div>
            </div>

            <div><div className='ExpertSubmitForm' onClick={() => predictExpert()}><div className='ExpertSubmit'>Start the Journey</div></div></div>
            <div className='Eclipse1'></div>
            <div className='Eclipse2'></div>
            <div className='Eclipse3'></div>
            <div className='ExpertSwitchBeginner' onClick={() => navigate("/begin")}></div>
        </div>
    );
}

export default Expert;