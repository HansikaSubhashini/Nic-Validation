import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Pages wrapped in MainLayout */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/upload"
          element={
            <MainLayout>
              <UploadPage />
            </MainLayout>
          }
        />

        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
