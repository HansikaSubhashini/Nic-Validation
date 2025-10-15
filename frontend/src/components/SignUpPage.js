// SignUpPage.js
import React, { useState } from "react";
import "./SignUpPage.css"; // Create this CSS file for styling

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3500/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message}`);
      } else {
        setMessage(`✅ ${data.message}`);
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error("Sign Up error:", err);
      setMessage("❌ Network error. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Create Account</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSignUp} className="signup-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
