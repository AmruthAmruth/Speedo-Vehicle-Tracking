import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { APP_ROUTES } from '../constants/routes';
import LoadingScreen from './shared/LoadingScreen';
const GuestRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return _jsx(LoadingScreen, {});
    }
    if (isAuthenticated) {
        return _jsx(Navigate, { to: APP_ROUTES.DASHBOARD.ROOT, replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default GuestRoute;
