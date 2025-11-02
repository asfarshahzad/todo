import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import UpdateTask from "../components/UpdateTask";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LandingPage from "../pages/LandingPage";
import Loader from "../components/Loader"; // existing loader
import "../style/Router.css";
import PageNotFound from "../pages/PageNotFound"

const Router = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // simulate page load delay
        const timer = setTimeout(() => setLoading(false), 800); // 0.8s delay
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="app-container">
            <BrowserRouter>
                {loading && <Loader />}  {/* 👈 full page overlay */}
                <Navbar />
                <div className="page-content">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/tasks" element={<TaskList />} />
                        <Route path="/update/:id" element={<UpdateTask />} />
                        <Route path="/add" element={<AddTask />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Router;