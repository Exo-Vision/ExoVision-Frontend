import './Beginner.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EXOVISION from './../assets/EXOVISION.png'
import CustomSlider from "./CustomSlider";
import background from './../assets/background.png'

function UserPage() {
const navigate = useNavigate();

    const [detail1, setDetail1] = useState(0);
    const [detail2, setDetail2] = useState(0);
    const [detail3, setDetail3] = useState(0);
    const [detail4, setDetail4] = useState(0);
    const [detail5, setDetail5] = useState(0);

    const [test1, setTest1] = useState(0.1);
    const [test2, setTest2] = useState(0.1);
    const [test3, setTest3] = useState(0.001);
    const [test4, setTest4] = useState(1);
    const [test5, setTest5] = useState(0.1);

    return (
        <div className='BeginnerBody'>
            <div className="BeginnerHeader">
                <img src={EXOVISION} onClick={() => navigate('/')}></img>
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
                    <div className='BeginnerInputSliderWrapper'>
                        <span className='BeginnerInputMin1'>0.5</span>
                        <CustomSlider min={0.5} max={500} step={0.5} formatter={(v) => `${v} days`} gradient={["#6D32D2", "#A444E5"]} value={test1} setValue={setTest1}/>
                        <span className='BeginnerInputMax'><div className='BeginnerInputMaxText'>500</div></span>
                    </div>
                    </div></div>

                <div><div className='BeginnerUIForm'>
                    <div>
                        <div className='BeginnerInputText'>Transit Duration (hours)</div>
                        <div className='BeginnerInputDetail' onMouseOver={() => setDetail2(1)}>!</div>
                    </div>
                    <div className='BeginnerInputSliderWrapper'>
                        <span className='BeginnerInputMin2'>0.1</span>
                        <CustomSlider min={0.1} max={24} step={0.3} formatter={(v) => `${v} hours`} gradient={["#6D32D2", "#A444E5"]} value={test2} setValue={setTest2}/>
                        <span className='BeginnerInputMax'><div className='BeginnerInputMaxText'>24</div></span>
                    </div>
                    </div></div>

                <div><div className='BeginnerUIForm'>
                    <div>
                        <div className='BeginnerInputText'>Transit Depth (%)</div>
                        <div className='BeginnerInputDetail' onMouseOver={() => setDetail3(1)}>!</div>
                    </div>
                    <div className='BeginnerInputSliderWrapper'>
                        <span className='BeginnerInputMin3'>0.001</span>
                        <CustomSlider min={0.001} max={10} step={0.005} formatter={(v) => `${v} %`} gradient={["#6D32D2", "#A444E5"]} value={test3} setValue={setTest3}/>
                        <span className='BeginnerInputMax'><div className='BeginnerInputMaxText'>10</div></span>
                    </div>
                    </div></div>

                <div><div className='BeginnerUIForm'>
                    <div>
                        <div className='BeginnerInputText'>Signal-to-Noise Ratio (SNR)</div>
                        <div className='BeginnerInputDetail' onMouseOver={() => setDetail4(1)}>!</div>
                    </div>
                    <div className='BeginnerInputSliderWrapper'>
                        <span className='BeginnerInputMin4'>1</span>
                        <CustomSlider min={1} max={100} step={0.1} formatter={(v) => `${v} %`} gradient={["#6D32D2", "#A444E5"]}  value={test4} setValue={setTest4}/>
                        <span className='BeginnerInputMax'><div className='BeginnerInputMaxText'>100</div></span>
                    </div>
                    </div></div>
                <div><div className='BeginnerUIForm'>
                    <div>
                        <div className='BeginnerInputText'>Planet Radius (radi)</div>
                        <div className='BeginnerInputDetail' onMouseOver={() => setDetail5(1)}>!</div>
                    </div>
                    <div className='BeginnerInputSliderWrapper'>
                        <span className='BeginnerInputMin5'>0.5</span>
                        <CustomSlider min={0.1} max={30} step={0.1} formatter={(v) => `x ${v}`} gradient={["#6D32D2", "#A444E5"]} value={test5} setValue={setTest5}/>
                        <span className='BeginnerInputMax'><div className='BeginnerInputMaxText'>500</div></span>
                    </div>
                    </div></div>
            </div>

            <div><div className='BeginnerSubmitForm' onClick={() => console.log(test1, test2, test3, test4, test5)}><div className='BeginnerSubmit'>Start the Journey</div></div></div>
            
            <div className='BeginnerSwitchExpert' onClick={() => navigate("/expert")}></div>
            {(detail1 === 1) && (<div className='BeginnerInputDetailBox1' onMouseOut={() => setDetail1(0)}><div className='BeginnerInputDetailAdd'>The time it takes for a planet to complete<br/>one full orbit around its host star.</div></div>)}
            {(detail2 === 1) && (<div className='BeginnerInputDetailBox2' onMouseOut={() => setDetail2(0)}><div className='BeginnerInputDetailAdd'>The total time the planet takes to cross<br/>in front of its star, as observed in a<br/>transit event.</div></div>)}
            {(detail3 === 1) && (<div className='BeginnerInputDetailBox3' onMouseOut={() => setDetail3(0)}><div className='BeginnerInputDetailAdd'>The fractional decrease in the star’s<br/>brightness during a transit, indicating the <br/>relative size of the planet compared to <br/>the star.</div></div>)}
            {(detail4 === 1) && (<div className='BeginnerInputDetailBox4' onMouseOut={() => setDetail4(0)}><div className='BeginnerInputDetailAdd'>A measure of how strong the transit<br/>signal is compared to background noise.<br/>A higher SNR means a more reliable<br/>detection.</div></div>)}
            {(detail5 === 1) && (<div className='BeginnerInputDetailBox5' onMouseOut={() => setDetail5(0)}><div className='BeginnerInputDetailAdd'>The planet’s size compared to Earth.<br/>Measured in Earth radii.</div></div>)}
        </div>
    );
}

export default UserPage;
