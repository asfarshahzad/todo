import React from "react";
import "../style/LandingPage.css";
import { FaCheckCircle, FaRocket, FaCloud } from "react-icons/fa"; // ✅ Clean, rounded icons
import { NavLink } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="landing-container">
            <div className="landing-wrapper">
                {/* Hero Section */}
                <section className="hero-section">
                    <h1 className="hero-title">Organize Your Life, Effortlessly.</h1>
                    <p className="hero-subtitle">The smarter way to manage your tasks, stay productive, and never miss a deadline.</p>

                    <ul className="hero-features">
                        <li>📌 Track all your tasks in one place</li>
                        <li>⏰ Set reminders and deadlines easily</li>
                        <li>📊 Visualize your progress and goals</li>
                    </ul>

                    <NavLink to={'/add'} className="cta-btn">Get Started - It's Free!</NavLink>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <div className="feature-card">
                        <div className="icon-wrapper">
                            <FaCheckCircle size={40} />
                        </div>
                        <h3>Stay Organized</h3>
                        <p>Create lists, set due dates, and prioritize tasks with ease.</p>
                    </div>

                    <div className="feature-card">
                        <div className="icon-wrapper">
                            <FaRocket size={40} />
                        </div>
                        <h3>Boost Productivity</h3>
                        <p>Focus on what matters. Track progress and reach goals faster.</p>
                    </div>

                    <div className="feature-card">
                        <div className="icon-wrapper">
                            <FaCloud size={40} />
                        </div>
                        <h3>Access Anywhere</h3>
                        <p>Sync across your devices. Your tasks, always with you.</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LandingPage;