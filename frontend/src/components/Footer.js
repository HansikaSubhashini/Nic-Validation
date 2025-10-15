import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">© {new Date().getFullYear()} NIC Validation. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
