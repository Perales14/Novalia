// src/app/routes.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import OAuthCallback from './auth/Callback';
import Dashboard from './dashboard/Dashboard';
import PublishWizard from './properties/PublishWizard';
import AuthGuard from './guards/AuthGuard';

const withAuth = (el: React.ReactNode) => <AuthGuard>{el}</AuthGuard>;

export const router = createBrowserRouter([
  // raíz pública - manda al login
  { path: '/', element: <Navigate to="/auth/login" replace /> },

  // privadas
  { path: '/dashboard', element: withAuth(<Dashboard />) },
  { path: '/properties/new', element: withAuth(<PublishWizard />) },

  // públicas
  { path: '/auth/login', element: <Login /> },
  { path: '/auth/register', element: <Register /> },
  { path: '/auth/forgot-password', element: <ForgotPassword /> },
  { path: '/auth/reset-password', element: <ResetPassword /> },
  { path: '/auth/callback', element: <OAuthCallback /> },

  // fallback
  { path: '*', element: <Navigate to="/auth/login" replace /> },
]);
