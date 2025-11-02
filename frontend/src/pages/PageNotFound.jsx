import React from "react";
import { NavLink } from "react-router-dom";
import "../style/PageNotFound.css";

const PageNotFound = () => {
    return (
        <div className="pagenotfound-container">
            <div className="pagenotfound-content">
                <h1 className="error-code">404</h1>
                <h2 className="error-text">Oops! Page Not Found</h2>
                <p className="error-subtext">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <NavLink to="/tasks" className="back-home-btn">
                    Go Back Tasks
                </NavLink>
            </div>
        </div>
    );
};

export default PageNotFound;