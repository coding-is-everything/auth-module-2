import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Snackbar, Alert } from '@mui/material';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
} from 'react-router-dom';

// Import theme
import theme from './theme';

// Import Views
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import OtpView from './views/OtpView';
import DashboardView from './views/DashboardView';
import DashboardHome from './components/dashboard/DashboardHome';
import AuthContainer from './components/AuthContainer';

// --- MAIN APP COMPONENT ---
// Wrapper component to handle navigation and notifications
// Main App component that wraps everything with ThemeProvider and Router
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
};

// Handles all the routing logic
const AppRoutes = () => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotification(prev => ({ ...prev, open: false }));
  };

  // Auth handlers
  const handleLogin = (credentials) => {
    console.log('Login with:', credentials);
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('isAuthenticated', 'true');
    showNotification('Login successful!', 'success');
    return true;
  };

  const handleRegister = (credentials) => {
    console.log('Register with:', credentials);
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('isAuthenticated', 'true');
    showNotification('Registration successful!', 'success');
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    showNotification('Logged out successfully!', 'success');
    return true;
  };

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Public Route Wrapper
  const PublicRoute = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <PublicRoute>
            <Navigate to="/login" replace />
          </PublicRoute>
        } />
        
        <Route path="/login" element={
          <PublicRoute>
            <AuthContainer 
              title="Welcome Back!"
              description="Sign in to access your account and continue your journey with us."
            >
              <LoginView onLogin={handleLogin} />
            </AuthContainer>
          </PublicRoute>
        } />
        
        <Route path="/register" element={
          <PublicRoute>
            <AuthContainer
              title="Create an Account"
              description="Join us today and start your journey with our platform."
            >
              <RegisterView onRegister={handleRegister} />
            </AuthContainer>
          </PublicRoute>
        } />
        
        <Route path="/otp-verification" element={
          <PublicRoute>
            <AuthContainer
              title="Verify Your Account"
              description="We've sent a verification code to your email. Please enter it below."
            >
              <OtpView onVerifyOtp={(otp) => {
                console.log('Verify OTP:', otp);
                showNotification('OTP verified successfully!', 'success');
                return true;
              }} />
            </AuthContainer>
          </PublicRoute>
        } />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardView onLogout={handleLogout} />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardHome />} />
        </Route>
        
        {/* Catch all other routes */}
        <Route path="*" element={
          isAuthenticated 
            ? <Navigate to="/dashboard" replace /> 
            : <Navigate to="/login" replace />
        } />
      </Routes>
      
      {/* Global Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default App;
