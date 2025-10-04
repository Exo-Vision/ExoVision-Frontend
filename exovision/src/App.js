import { BrowserRouter, Route, Routes } from "react-router-dom";

import Expert from './pages/Expert'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route excat path="/expert" element={<Expert/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
