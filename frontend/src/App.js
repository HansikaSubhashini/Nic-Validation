import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadPage />} />

        {/* Catch-all route for unknown paths */}
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </Router>
  );
}

// ✅ Correct export
export default App;
