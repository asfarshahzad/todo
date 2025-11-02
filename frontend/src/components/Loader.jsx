import React from "react";
import "../style/Loader.css";

const Loader = ({ size = 50, color = "#177274" }) => {
    return (
        <div className="loader-overlay">
            <div
                className="loader-spinner"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderTopColor: color,
                }}
            ></div>
        </div>
    );
};

export default Loader;