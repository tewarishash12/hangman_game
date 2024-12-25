import React from 'react';
import { FaHome, FaGamepad, FaTrophy, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';  // Import NavLink instead of Link

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {

    return (
        <aside
            className={`h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} bg-gray-800 text-white flex flex-col border-r border-gray-700 shadow-sm`}
        >
            <div className="flex justify-between items-center">
                <button
                    className="p-4 text-gray-300 hover:text-white"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? <FaChevronRight size={24} /> : <FaChevronLeft size={24} />}
                </button>
            </div>

            <nav className="flex flex-col gap-4 mt-4">
                <NavItem
                    to='/'
                    icon={<FaHome size={24} />}
                    label="Home"
                    isCollapsed={isCollapsed}
                />
                <NavItem
                    to='/playgame'
                    icon={<FaGamepad size={24} />}
                    label="PlayGame"
                    isCollapsed={isCollapsed}
                />
                <NavItem
                    to='/highscore'
                    icon={<FaTrophy size={24} />}
                    label="HighScore"
                    isCollapsed={isCollapsed}
                />
            </nav>
        </aside>
    );
};

const NavItem = ({ to, icon, label, isCollapsed }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => `flex items-center gap-4 p-4 hover:bg-gray-700 transition-all duration-300 ${isActive ? 'bg-gray-600' : ''}`} 
        >
            <div>{icon}</div>
            {!isCollapsed && <span className="text-gray-200">{label}</span>}
        </NavLink>
    );
};

export default Sidebar;
