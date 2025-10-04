import { BrowserRouter, Route, Routes } from "react-router-dom";

import Beginner from './pages/Beginner'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route excat path="/begin" element={<Beginner/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
