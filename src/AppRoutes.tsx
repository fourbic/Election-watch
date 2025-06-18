import { FC, PropsWithChildren } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import pages
import Layout from './components/layouts/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NarrativesPage from './pages/NarrativesPage';
import ActorsPage from './pages/ActorsPage';
import TimelinePage from './pages/TimelinePage';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import SignUp from './pages/SignUp';
import SignUpComponent from './components/signUp';
import SignInComponent from './components/signIn/signIn';

// Protected route component
const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Main routes component
const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignInComponent />} />
       <Route path="/sign-up" element={<SignUp />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="narratives" element={<NarrativesPage />} />
        <Route path="actors" element={<ActorsPage />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
