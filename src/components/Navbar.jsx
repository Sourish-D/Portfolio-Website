import "../index.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div class="navbar">
      <Link to="/">Home</Link>
      <Link to="/background">Background</Link>
      <Link to="/projects">Projects</Link>
    </div>
  );
};

export default Navbar;
