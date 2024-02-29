import "./app.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "../pages/main/main.tsx";


export default function App() {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </BrowserRouter>
    )
}