import React from 'react';
import { NavLink } from 'react-router-dom';
import { COLORS } from '../../../constants/constants';
import { APP_ROUTES } from '../../../constants/routes';
import SpeedIcon from '@mui/icons-material/Speed';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const menuItems = [
        { path: APP_ROUTES.DASHBOARD.ROOT, icon: <DashboardIcon />, label: 'Overview' },
        { path: `${APP_ROUTES.DASHBOARD.ROOT}/${APP_ROUTES.DASHBOARD.UPLOAD}`, icon: <UploadFileIcon />, label: 'Upload Trip' },
        { path: `${APP_ROUTES.DASHBOARD.ROOT}/${APP_ROUTES.DASHBOARD.TRIPS}`, icon: <HistoryIcon />, label: 'Trip History' },
        { path: `${APP_ROUTES.DASHBOARD.ROOT}/${APP_ROUTES.DASHBOARD.ANALYTICS}`, icon: <BarChartIcon />, label: 'Analytics' },
        { path: `${APP_ROUTES.DASHBOARD.ROOT}/${APP_ROUTES.DASHBOARD.SETTINGS}`, icon: <SettingsIcon />, label: 'Settings' },
    ];

    return (
        <aside className={`dashboard-sidebar ${isOpen ? 'open' : 'closed'}`}>
            {/* Logo */}
            <div className="sidebar-logo">
                <SpeedIcon style={{ fontSize: 32, color: COLORS.primary }} />
                {isOpen && <span className="logo-text">Speedo</span>}
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === APP_ROUTES.DASHBOARD.ROOT}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <span className="link-icon">{item.icon}</span>
                        {isOpen && <span className="link-label">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            {isOpen && (
                <div className="sidebar-footer">
                    <p className="footer-text">© 2026 Speedo</p>
                    <p className="footer-version">v1.0.0</p>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
