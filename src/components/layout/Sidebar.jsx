import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  Toolbar,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
  Receipt as ReceiptIcon,
  Assessment as AssessmentIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Users', icon: <PeopleIcon />, path: '/dashboard/users' },
  { text: 'Products', icon: <ShoppingCartIcon />, path: '/dashboard/products' },
  { text: 'Categories', icon: <CategoryIcon />, path: '/dashboard/categories' },
  { text: 'Orders', icon: <ReceiptIcon />, path: '/dashboard/orders' },
  { text: 'Inventory', icon: <InventoryIcon />, path: '/dashboard/inventory' },
  { text: 'Reports', icon: <AssessmentIcon />, path: '/dashboard/reports' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings' },
];

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const drawer = (
    <div>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', p: 2 }}>
          <AccountCircleIcon sx={{ fontSize: 40, mr: 1, color: theme.palette.primary.main }} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Admin User</Typography>
            <Typography variant="caption" color="text.secondary">Administrator</Typography>
          </Box>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.selected,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                borderRadius: 1,
                mx: 1,
                my: 0.5,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {React.cloneElement(item.icon, {
                  color: location.pathname === item.path ? 'primary' : 'inherit',
                })}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {}}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              borderRadius: 1,
              mx: 1,
              my: 0.5,
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogoutIcon color="error" />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{
                color: 'error.main',
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: 'none',
            boxShadow: theme.shadows[8],
          },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: 'none',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
