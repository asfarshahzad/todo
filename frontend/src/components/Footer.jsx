import React from "react";
import "../style/Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer-copy">
                © {new Date().getFullYear()} Todo-App — All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;