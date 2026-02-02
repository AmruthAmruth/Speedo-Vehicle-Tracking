import { Routes, Route } from 'react-router-dom';
import LandingPage from './features/landing/pages/LandingPage';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './features/dashboard/layout/DashboardLayout';
import DashboardOverview from './features/dashboard/pages/DashboardOverview';
import TripUpload from './features/dashboard/pages/TripUpload';
import TripList from './features/dashboard/pages/TripList';
import TripDetails from './features/dashboard/pages/TripDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="upload" element={<TripUpload />} />
        <Route path="trips" element={<TripList />} />
        <Route path="trips/:id" element={<TripDetails />} />
      </Route>
    </Routes>
  );
};

export default App;