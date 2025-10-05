import './Result.css'
import exovision from './../assets/EXOVISION.png'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import PRDGraph from '../graph/ResponsiveBar';
import POGraph from './../graph/POGraph'
import ScatterPlot from '../graph/ScatterPlot';
import TransitDurationBar from '../graph/TransitDurationBar';

import gradient_border_400_67 from '../assets/gradient_border_400_67.svg'
import gradient_border_200_53 from '../assets/gradient_border_200_53.svg'
import top_floating_button from '../assets/top_floating_button.svg'
import TransitLightCurveGraph from "./TransitLightCurveGraph";
import apiClient from './exoplanetApi';

function Result() {
    const navigate = useNavigate();
    const location = useLocation();
    const { prediction, mode } = location.state || {};
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        // Fetch combined statistics from API
        const fetchStatistics = async () => {
            try {
                const response = await apiClient.get('/api/v1/statistics/combined');
                setStatistics(response.data);
            } catch (error) {
                console.error('Failed to fetch statistics:', error);
            }
        };
        fetchStatistics();
    }, []);

    return (
        <div className='ResultBody'>
            <div className='ResultHeader'><img src={exovision} onClick={() => navigate('/')}></img></div>
            <div className='ResultSaveForm'>
                <div className='ResultSave'><div className='ResultSaveText'>+Log This Planet</div></div>
                <div className='ResultDiscovery'><div className='ResultDiscoveryText'>Discovery Log</div></div>
            </div>
            <div className='ResultMissionForm'>
                <div className='ResultMissionTitle'>- Mission Log -</div>
                <div className='ResultMissionDetail'>
                    Mode: {mode === 'beginner' ? 'Beginner' : 'Expert'}<br/>
                    Classification Method: {prediction?.classification_details?.classification_method || 'N/A'}
                </div>
            </div>
            <div className='ResultForm1'>
                <div className='ResultClassifyForm'>
                    <div className='ResultClassifyTitle'>Classification</div>
                    <div className='ResultClassifyDetail'>{prediction?.prediction || 'Unknown'}</div>
                </div>
                <div className='ResultProbableForm'>
                    <div className='ResultProbableTitle'>Probability</div>
                    <div className='ResultProbableDetail'>{prediction?.probability?.toFixed(2) || '0.00'}%</div>
                </div>
            </div>
            <div className='ResultPOGraphTitle'>Predicted Orbit Graph</div>
            <div className='ResultPOGraph'><POGraph/></div>
            <div className='ResultPRDGraphForm'>
                <div className='ResultExpertGraphTitle'>Planet Radius Distribution</div>
                <div className='ResultPRDGraph'><PRDGraph/></div>
            </div>
            <div className='ResultExpertGraphForm'>
                <div className='ResultExpertGraphTitle'>Mission Statistics</div>
                <div style={{padding: '20px', color: '#fff', fontSize: '14px'}}>
                    {statistics ? (
                        <>
                            <p>Total Planets:</p>
                            <ul>
                                <li>TESS: {statistics.total_planets_by_mission?.TESS || 0}</li>
                                <li>K2: {statistics.total_planets_by_mission?.K2 || 0}</li>
                                <li>Kepler: {statistics.total_planets_by_mission?.Kepler || 0}</li>
                            </ul>
                            <p>Transit Duration Medians:</p>
                            <ul>
                                <li>TESS: {statistics.transit_duration_medians?.TESS?.toFixed(2) || 'N/A'} hours</li>
                                <li>K2: {statistics.transit_duration_medians?.K2?.toFixed(2) || 'N/A'} hours</li>
                                <li>Kepler: {statistics.transit_duration_medians?.Kepler?.toFixed(2) || 'N/A'} hours</li>
                            </ul>
                        </>
                    ) : (
                        <p>Loading statistics...</p>
                    )}
                </div>
            </div>

            <div className='ResultExpertGraphForm'>
                <div className='ResultExpertGraphTitle'>Classification Details</div>
                <div style={{padding: '20px', color: '#fff', fontSize: '14px'}}>
                    <p>Model 1 Prediction: {prediction?.classification_details?.model1_prediction || 'N/A'}</p>
                    <p>Model 1 Probability: {prediction?.classification_details?.model1_probability?.toFixed(2) || '0.00'}%</p>
                    <p>Model 2 Prediction: {prediction?.classification_details?.model2_prediction || 'N/A'}</p>
                    <p>Threshold Used: {prediction?.classification_details?.threshold_used || 'N/A'}</p>
                    <p>Confidence: {(prediction?.confidence * 100)?.toFixed(2) || '0.00'}%</p>
                </div>
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