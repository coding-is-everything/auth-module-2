import React from 'react';
import { Box, useTheme } from '@mui/material';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import { Outlet, useNavigate } from 'react-router-dom';

const DashboardView = ({ onLogout }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    if (onLogout && onLogout()) {
      navigate('/login');
    }
  };
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Topbar handleDrawerToggle={handleDrawerToggle} onLogout={handleLogout} />
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${theme.drawerWidth}px)` },
          marginTop: '64px',
          backgroundColor: theme.palette.background.default,
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardView;
