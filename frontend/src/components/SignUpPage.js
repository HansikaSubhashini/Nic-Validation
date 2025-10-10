// SignUpPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";

function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");

  // ✅ API URL from .env
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  console.log("API URL:", apiUrl); // <-- check if this is defined correctly

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignupError("");
    setSignupSuccess("");

    try {
      const res = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Sign Up failed");
      }

      setSignupSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error("Sign Up failed:", err);
      setSignupError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignUp}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>

        {signupError && <p style={{ color: "red", marginTop: 8 }}>{signupError}</p>}
        {signupSuccess && <p style={{ color: "green", marginTop: 8 }}>{signupSuccess}</p>}
      </form>
    </div>
  );
}

export default SignUpPage;
