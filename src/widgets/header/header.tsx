import "./header.css";
import logoSvg from "../../shared/assets/logo.svg";

export default function Header() {
    return(
        <header className="page-header">
            <h1>React Product</h1>
            <img src={logoSvg} alt="logo" width={42} height={42}/>
        </header>
    )
}