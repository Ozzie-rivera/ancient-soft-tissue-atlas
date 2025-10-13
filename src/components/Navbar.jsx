import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-logo">ASTA</div>

            <div className="navbar-links">
                <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
                <Link to="/explore" className={location.pathname === "/explore" ? "active" : ""}>Explore</Link>
                <Link to="/materials" className={location.pathname === "/materials" ? "active" : ""}>Materials</Link>

            
            </div>
        
        </nav>
    );

};

export default NavBar;