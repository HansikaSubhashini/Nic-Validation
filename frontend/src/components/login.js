// LoginPage.js
import React, { useState } from "react";
import logo from "../logo.svg";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Temporary success simulation
    if (email === "admin@example.com" && password === "123456") {
      localStorage.setItem("authToken", "exampletoken123"); // Save fake token
      navigate("/dashboard"); // Go to Dashboard
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
  <img src={logo} alt="NIC Validator" style={{ width: 80, marginBottom: 12 }} />
  <h2>NIC Validator Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p className="forgot-text">
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#007bff',
              textDecoration: 'none',
              cursor: 'pointer',
              padding: 0,
              fontSize: '14px'
            }}
          >
            Forgot Email?
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
