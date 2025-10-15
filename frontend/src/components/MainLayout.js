import React from "react";
import Navbar from "./Navbar";
import "../pages/UploadPage.css"; // reuse your styles

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
