import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear any stored auth and redirect to login
    try {
      localStorage.removeItem("authToken");
    } catch (e) {
      // ignore
    }
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">NIC Validator</h2>
      <ul className="nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/upload">Upload Files</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;



