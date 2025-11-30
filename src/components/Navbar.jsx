import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";

function NavBar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-logo">Ancient Soft Tissue Atlas</div>

            {/* Toggle button for mobile */}
            <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
                ☰
            </div>

            <div className={`navbar-links ${isOpen ? "open" : ""}`}>
                <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
                <Link to="/explore" className={location.pathname === "/explore" ? "active" : ""}>Explore</Link>
                <Link to="/materials" className={location.pathname === "/materials" ? "active" : ""}>Materials</Link>
            </div>
        </nav>
    );
}

export default NavBar;
