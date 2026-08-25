import "../index.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-border-top" />
      <Link to="/" className="nav-link">
        <span className="element-icon">🜂</span> Home
      </Link>
      <div className="nav-divider" />
      <Link to="/background" className="nav-link">
        <span className="element-icon">🜃</span> Background
      </Link>
      <div className="nav-divider" />
      <Link to="/projects" className="nav-link">
        <span className="element-icon">🜄</span> Projects
      </Link>
    </nav>
  );
};

export default Navbar;