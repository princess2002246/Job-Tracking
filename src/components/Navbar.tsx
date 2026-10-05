import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">
          Job<span>Track</span>
        </NavLink>
      </div>

      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/login"
          className="navbar-link"
        >
          Login
        </NavLink>

        <NavLink
          to="/register"
          className="navbar-register"
        >
          Register
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;