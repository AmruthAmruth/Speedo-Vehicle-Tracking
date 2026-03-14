import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';

const DashboardLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="dashboard-container">
            <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

            <div className={`dashboard-main ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                {/* Top Header */}
                <header className="dashboard-header">
                    <div className="header-left">
                        <button className="menu-toggle" onClick={toggleSidebar}>
                            <span className="material-icons">menu</span>
                        </button>
                        <h1 className="page-title">
                            {location.pathname === '/dashboard' && 'Dashboard'}
                            {location.pathname === '/dashboard/upload' && 'Upload Trip'}
                            {location.pathname === '/dashboard/trips' && 'Trip History'}
                            {location.pathname.startsWith('/dashboard/trips/') && 'Trip Details'}
                        </h1>
                    </div>

                    <div className="header-right">
                        <div className="user-info">
                            <div className="user-avatar">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="user-details">
                                <span className="user-name">{user?.name}</span>
                                <span className="user-email">{user?.email}</span>
                            </div>
                        </div>
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="dashboard-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
