import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import LoadingScreen from './components/shared/LoadingScreen';
import { registerServiceWorker } from './services/backgroundTrackingService';
import { APP_ROUTES } from './constants/routes';
// Lazy-loaded pages — each page becomes its own async chunk
const LandingPage = lazy(() => import('./features/landing/pages/LandingPage'));
const Login = lazy(() => import('./features/auth/pages/Login'));
const Register = lazy(() => import('./features/auth/pages/Register'));
const DashboardLayout = lazy(() => import('./features/dashboard/layout/DashboardLayout'));
const DashboardOverview = lazy(() => import('./features/dashboard/pages/DashboardOverview'));
const TripUpload = lazy(() => import('./features/dashboard/pages/TripUpload'));
const TripList = lazy(() => import('./features/dashboard/pages/TripList'));
const TripDetails = lazy(() => import('./features/dashboard/pages/TripDetails'));
const MobileTracker = lazy(() => import('./features/dashboard/pages/MobileTracker'));
const LiveTracking = lazy(() => import('./features/dashboard/pages/LiveTracking'));
const FleetMap = lazy(() => import('./features/dashboard/pages/FleetMap'));
const DriverBehavior = lazy(() => import('./features/dashboard/pages/DriverBehavior'));
const App = () => {
    useEffect(() => {
        registerServiceWorker();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(Suspense, { fallback: _jsx(LoadingScreen, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: APP_ROUTES.HOME, element: _jsx(GuestRoute, { children: _jsx(LandingPage, {}) }) }), _jsx(Route, { path: APP_ROUTES.LOGIN, element: _jsx(GuestRoute, { children: _jsx(Login, {}) }) }), _jsx(Route, { path: APP_ROUTES.REGISTER, element: _jsx(GuestRoute, { children: _jsx(Register, {}) }) }), _jsx(Route, { path: "/dashboard/track/p/:token", element: _jsx(MobileTracker, {}) }), _jsx(Route, { path: "/dashboard/track/:id", element: _jsx(MobileTracker, {}) }), _jsxs(Route, { path: APP_ROUTES.DASHBOARD.ROOT, element: _jsx(ProtectedRoute, { children: _jsx(DashboardLayout, {}) }), children: [_jsx(Route, { index: true, element: _jsx(DashboardOverview, {}) }), _jsx(Route, { path: APP_ROUTES.DASHBOARD.UPLOAD, element: _jsx(TripUpload, {}) }), _jsx(Route, { path: APP_ROUTES.DASHBOARD.TRIPS, element: _jsx(TripList, {}) }), _jsx(Route, { path: APP_ROUTES.DASHBOARD.TRIP_DETAILS, element: _jsx(TripDetails, {}) }), _jsx(Route, { path: APP_ROUTES.DASHBOARD.LIVE_TRACKING, element: _jsx(LiveTracking, {}) }), _jsx(Route, { path: APP_ROUTES.DASHBOARD.FLEET, element: _jsx(FleetMap, {}) }), _jsx(Route, { path: APP_ROUTES.DASHBOARD.DRIVERS, element: _jsx(DriverBehavior, {}) })] })] }) }), _jsx(ToastContainer, { position: "top-right", autoClose: 3000, hideProgressBar: false, newestOnTop: true, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, draggable: true, pauseOnHover: true, theme: "colored" })] }));
};
export default App;
