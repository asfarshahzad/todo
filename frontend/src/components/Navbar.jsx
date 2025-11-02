import React from 'react';
import '../style/Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar'>
            <h2 className='logo'>Todo-App</h2>
            <ul className='nav-list'>
                <li>
                    <NavLink
                        className={({ isActive }) => (!isActive ? "nav-link" : "active")}
                        to="/"
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => (!isActive ? "nav-link" : "active")}
                        to="/tasks"
                    >
                        Task List
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => (!isActive ? "nav-link" : "active")}
                        to="/add"
                    >
                        Add Task
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;