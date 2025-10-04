import './Beginner.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EXOVISION from './../assets/EXOVISION.png'

function UserPage() {
const navigate = useNavigate();

    const [detail1, setDetail1] = useState(0);
    const [detail2, setDetail2] = useState(0);
    const [detail3, setDetail3] = useState(0);
    const [detail4, setDetail4] = useState(0);

    const [test1, setTest1] = useState(0);
    const [test2, setTest2] = useState(0);
    const [test3, setTest3] = useState(0);
    const [test4, setTest4] = useState(0);

    return (
        <div className='BeginnerBody'>
            <div className="BeginnerHeader">
                <img src={EXOVISION}></img>
            </div>
            <div><div className='BeginnerTitle'>EXPLORE EXOPLANETS</div></div>
            <div>
                <div className='BeginnerTextForm'>
                    <div className='BeginnerTextFormBeginner'><div className='BeginnerTextBeginner'>Beginner</div></div>
                    <div className='BeginnerTextFormExpert'><div className='BeginnerTextExpert'>Expert</div></div>
                </div>
            </div>
            <div className='BeginnerDetailFormBox'><div className='BeginnerDetailForm'></div></div>
            <div className='BeginnerDetail'>New to astronomy? Just move the sliders and discover your very own exoplanet!<br/>No complicated calculations—just the fun of exploring the universe.</div>
            <div className='BeginnerUI'>
                <div><div className='BeginnerUIForm'>
                    <div>
                        <div className='BeginnerInputText'>Orbital Period (days)</div>
                        <div className='BeginnerInputDetail' onMouseOver={() => {setDetail1(1);}}>!</div>
                    </div>
                    <div>
                        <div className='BeginnerInputMin'>0.5</div>
                        <input type='range' className='BeginnerInput' value='0.5' min="0.5" max="100" onChange={(e) => setTest1(e.target.value)}></input>
                        <div className='BeginnerInputMax'>100</div>
                    </div>
                    </div></div>
                
                <div><div className='BeginnerUIForm'>
                    <div>
                        <div className='BeginnerInputText'>Transit Duration (hours)</div>
                        <div className='BeginnerInputDetail' onMouseOver={() => setDetail2(1)}>!</div>
                    </div>
                    <div>
                        <div className='BeginnerInputMin'>0.5</div>
                        <input type='range' className='BeginnerInput' value='0.5' min="0.5" max="100" onChange={(e) => setTest2(e.target.value)}></input>
                        <div className='BeginnerInputMax'>100</div>
                    </div>
                    </div></div>

                <div><div className='BeginnerUIForm'>
                    <div>
                        <div className='BeginnerInputText'>Transit Depth (%)</div>
                        <div className='BeginnerInputDetail' onMouseOver={() => setDetail3(1)}>!</div>
                    </div>
                    <div>
                        <div className='BeginnerInputMin'>0.5</div>
                        <input type='range' className='BeginnerInput' value='0.5' min="0.5" max="100" onChange={(e) => setTest3(e.target.value)}></input>
                        <div className='BeginnerInputMax'>100</div>
                    </div>
                    </div></div>

                <div><div className='BeginnerUIForm'>
                    <div>
                        <div className='BeginnerInputText'>Signal-to-Noise Ratio (SNR)</div>
                        <div className='BeginnerInputDetail' onMouseOver={() => setDetail4(1)}>!</div>
                    </div>
                    <div>
                        <div className='BeginnerInputMin'>0.5</div>
                        <input type='range' className='BeginnerInput' value='0.5' min="0.5" max="100" onChange={(e) => setTest4(e.target.value)}></input>
                        <div className='BeginnerInputMax'>100</div>
                    </div>
                    </div></div>
            </div>

            <div><div className='BeginnerSubmitForm' onClick={() => console.log(test1, test2, test3, test4)}><div className='BeginnerSubmit'>Start the Journey</div></div></div>
            <div className='Eclipse1'></div>
            <div className='Eclipse2'></div>
            <div className='Eclipse3'></div>
            <div className='BeginnerSwitchExpert' onClick={() => navigate("/expert")}></div>
            {(detail1 === 1) && (<div className='BeginnerInputDetailBox1' onMouseOut={() => setDetail1(0)}><div className='BeginnerInputDetailAdd'>The time it takes for a planet to complete<br/>one full orbit around its host star.</div></div>)}
            {(detail2 === 1) && (<div className='BeginnerInputDetailBox2' onMouseOut={() => setDetail2(0)}><div className='BeginnerInputDetailAdd'>The total time the planet takes to cross<br/>in front of its star, as observed in a<br/>transit event.</div></div>)}
            {(detail3 === 1) && (<div className='BeginnerInputDetailBox3' onMouseOut={() => setDetail3(0)}><div className='BeginnerInputDetailAdd'>The fractional decrease in the star’s<br/>brightness during a transit, indicating the <br/>relative size of the planet compared to <br/>the star.</div></div>)}
            {(detail4 === 1) && (<div className='BeginnerInputDetailBox4' onMouseOut={() => setDetail4(0)}><div className='BeginnerInputDetailAdd'>A measure of how strong the transit<br/>signal is compared to background noise.<br/>A higher SNR means a more reliable<br/>detection.</div></div>)}
        </div>
    );
}

export default UserPage;
