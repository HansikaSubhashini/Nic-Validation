import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./MainLayout.css";

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Navbar />

      {/* Middle content area - only this area scrolls */}
      <div className="main-content">{children}</div>

      <Footer />
    </div>
  );
}

export default MainLayout;
