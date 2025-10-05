import './Beginner.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EXOVISION from './../assets/EXOVISION.png'
import CustomSlider from "./CustomSlider";
import background from './../assets/background.png'
import axios from 'axios'

import apiClient from './exoplanetApi';

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




     const predictBeginner = async () => {
        const data = {
             koi_prad: test1, dec: test2, koi_smet: test3, planet_star_ratio: test4, planet_density_proxy: test5
        }

        try {
        const response = await apiClient.post('/api/v1/exoplanet/predict/beginner', data);
        
        return response.data;
        } catch (error) {
        throw error;
  }
  
};


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
            <div className='BeginnerDetailFormBox'>
                <div className='BeginnerDetailForm'></div>
                <div className='BeginnerDetailTextForm'><div className='BeginnerDetail'>New to astronomy? Just move the sliders and discover your very own exoplanet!<br/>No complicated calculations—just the fun of exploring the universe.</div></div>
            </div>

            <div className='BeginnerUI'>
                <div><div className='BeginnerUIForm'>
                    <div>
                        <div className='BeginnerInputText'>Orbital Period (days)</div>
                        <div className='BeginnerInputDetail' onMouseOver={() => {setDetail1(1);}}>!</div>
                    </div>
                    <div className='BeginnerInputSliderWrapper'>
                        <span className='BeginnerInputMin1'>0.5</span>
                        <CustomSlider min={0.8} max={200346} step={1} formatter={(v) => `${v} days`} gradient={["#6D32D2", "#A444E5"]} value={test1} setValue={setTest1}/>
                        <span className='BeginnerInputMax'><div className='BeginnerInputMaxText'>500</div></span>
                    </div>
                    </div></div>

                <div><div className='BeginnerUIForm'>
                    <div>
                        <div className='BeginnerInputText'>Transit Duration (hours)</div>
                        <div className='BeginnerInputDetail' onMouseOver={() => setDetail2(1)}>!</div>
                    </div>
                    <div className='BeginnerInputSliderWrapper'>
                        <span className='BeginnerInputMin2'>-89.47</span>
                        <CustomSlider min={-89.47} max={89.08} step={1} formatter={(v) => `${v} hours`} gradient={["#6D32D2", "#A444E5"]} value={test2} setValue={setTest2}/>
                        <span className='BeginnerInputMax'><div className='BeginnerInputMaxText'>89.08</div></span>
                    </div>
                    </div></div>

                <div><div className='BeginnerUIForm'>
                    <div>
                        <div className='BeginnerInputText'>Transit Depth (%)</div>
                        <div className='BeginnerInputDetail' onMouseOver={() => setDetail3(1)}>!</div>
                    </div>
                    <div className='BeginnerInputSliderWrapper'>
                        <span className='BeginnerInputMin3'>-2.5</span>
                        <CustomSlider min={-2.5} max={0.56} step={0.005} formatter={(v) => `${v} %`} gradient={["#6D32D2", "#A444E5"]} value={test3} setValue={setTest3}/>
                        <span className='BeginnerInputMax'><div className='BeginnerInputMaxText'>0.56</div></span>
                    </div>
                    </div></div>

                <div><div className='BeginnerUIForm'>
                    <div>
                        <div className='BeginnerInputText'>Signal-to-Noise Ratio (SNR)</div>
                        <div className='BeginnerInputDetail' onMouseOver={() => setDetail4(1)}>!</div>
                    </div>
                    <div className='BeginnerInputSliderWrapper'>
                        <span className='BeginnerInputMin4'>0.14</span>
                        <CustomSlider min={0.14} max={10905} step={0.5} formatter={(v) => `${v} %`} gradient={["#6D32D2", "#A444E5"]}  value={test4} setValue={setTest4}/>
                        <span className='BeginnerInputMax'><div className='BeginnerInputMaxText'>10905</div></span>
                    </div>
                    </div></div>
                <div><div className='BeginnerUIForm'>
                    <div>
                        <div className='BeginnerInputText'>Planet Radius (radi)</div>
                        <div className='BeginnerInputDetail' onMouseOver={() => setDetail5(1)}>!</div>
                    </div>
                    <div className='BeginnerInputSliderWrapper'>
                        <span className='BeginnerInputMin5'>0.01</span>
                        <CustomSlider min={0.01} max={27886337760646} step={1000} formatter={(v) => `x ${v}`} gradient={["#6D32D2", "#A444E5"]} value={test5} setValue={setTest5}/>
                        <span className='BeginnerInputMax'><div className='BeginnerInputMaxText'>27886337760646</div></span>
                    </div>
                    </div></div>
            </div>
            <div className='Eclipse1'></div>
            <div className='Eclipse2'></div>
            <div className='Eclipse3'></div>
            <div><div className='BeginnerSubmitForm' onClick={() => predictBeginner()}><div className='BeginnerSubmit'>Start the Journey</div></div></div>
            
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
