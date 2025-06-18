import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NarrativesPage from './pages/NarrativesPage';
import ActorsPage from './pages/ActorsPage';
import TimelinePage from './pages/TimelinePage';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import { useAuth } from './context/AuthContext';
import { FC, PropsWithChildren } from 'react';
import SignUp from './pages/SignUp';

// Protected route wrapper component
const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Router configuration
const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
    {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/narratives',
        element: <NarrativesPage />,
      },
      {
        path: '/actors',
        element: <ActorsPage />,
      },
      {
        path: '/timeline',
        element: <TimelinePage />,
      },
      {
        path: '/alerts',
        element: <AlertsPage />,
      },
      {
        path: '/reports',
        element: <ReportsPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
] satisfies RouteObject[]);

export default router;
