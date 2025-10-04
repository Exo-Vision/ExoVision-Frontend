import './Expert.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import exovision from './../assets/EXOVISION.png'

function Expert() {
    const navigate = useNavigate();

    const [test1, setTest1] = useState(0);
    const [test2, setTest2] = useState(0);
    const [test3, setTest3] = useState(0);
    const [test4, setTest4] = useState(0);

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
            <div className='ExpertDetailFormBox'><div className='ExpertDetailForm'></div></div>
            <div className='ExpertDetail'>Want to explore space with real data?<br/>Enter the numbers yourself and determine the likelihood of an exoplanet.<br/>Experience the thrill of discovery like a true astronomer.</div>
            
            <div className='ExpertUI'>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Orbital Period</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest1(e.target.value)}></input>
                            <div className='ExpertInputSub'>days</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Transit Duration</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest2(e.target.value)}></input>
                            <div className='ExpertInputSub'>hours</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Transit Depth</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest3(e.target.value)}></input>
                            <div className='ExpertInputSub'>%</div>
                        </div>
                    </div>
                    <div className='ExpertUIBox'>
                        <div className='ExpertInputTitle'>Signal-to-Noise Ratio (SNR)</div>
                        <div className='test'>
                            <input type='text' className='ExpertInput' onChange={(e) => setTest4(e.target.value)}></input>
                            <div className='ExpertInputSub'></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>  
                <div className='ExpertProbable'>

                </div>
            </div>

            <div><div className='ExpertSubmitForm' onClick={() => console.log(test1, test2, test3, test4)}><div className='ExpertSubmit'>Start the Journey</div></div></div>
            <div className='Eclipse1'></div>
            <div className='Eclipse2'></div>
            <div className='Eclipse3'></div>
            <div className='ExpertSwitchBeginner' onClick={() => navigate("/begin")}></div>
        </div>
    );
}

export default Expert;