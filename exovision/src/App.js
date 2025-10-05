import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from './pages/MainPage'
import Beginner from './pages/Beginner'
import Result from './pages/Result'
import Expert from './pages/Expert'

import POGraph from "./graph/POGraph";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route excat path="/" element={<MainPage/>} />
                    <Route excat path="/begin" element={<Beginner/>} />
                    <Route excat path="/result" element={<Result/>} />
                    <Route excat path="/expert" element={<Expert/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
