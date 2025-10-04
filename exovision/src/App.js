import { BrowserRouter, Route, Routes } from "react-router-dom";

import Result from './pages/Result'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route excat path="/result" element={<Result/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
