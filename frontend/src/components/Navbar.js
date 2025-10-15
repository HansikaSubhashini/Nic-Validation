// Navbar.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import NavLink
import "./Navbar.css"; // Make sure to import the CSS

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any token-clearing logic here
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* You can use NavLink here to make the brand clickable */}
        <NavLink to="/dashboard">NIC Validator</NavLink>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/upload" className="nav-link">
            Upload Files
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className="nav-link">
            Reports
          </NavLink>
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            LogOut
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;