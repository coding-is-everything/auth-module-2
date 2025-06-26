import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Badge, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem, 
  Divider, 
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  ListItemAvatar,
  useTheme,
  Paper,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton as MuiIconButton
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  NotificationsActive as NotificationsActiveIcon,
  ArrowForward as ArrowForwardIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

// Mock data for messages
const messages = [
  {
    id: 1,
    sender: 'John Doe',
    content: 'Meeting at 3 PM tomorrow',
    time: '2 hours ago',
    read: false,
    avatar: 'JD'
  },
  {
    id: 2,
    sender: 'Jane Smith',
    content: 'Project update: All tasks completed',
    time: '5 hours ago',
    read: true,
    avatar: 'JS'
  },
  {
    id: 3,
    sender: 'Team Standup',
    content: 'Daily standup in 15 minutes',
    time: '1 day ago',
    read: true,
    avatar: 'TS'
  }
];

// Mock data for notifications
const notifications = [
  {
    id: 1,
    title: 'New order received',
    description: 'Order #1234 has been placed',
    time: '10 min ago',
    read: false,
    type: 'order'
  },
  {
    id: 2,
    title: 'New user registered',
    description: 'Jane Smith has registered',
    time: '2 hours ago',
    read: false,
    type: 'user'
  },
  {
    id: 3,
    title: 'Server Alert',
    description: 'Server load is high',
    time: '1 day ago',
    read: true,
    type: 'alert'
  }
];

const Topbar = ({ handleDrawerToggle, onLogout }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [messageAnchorEl, setMessageAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  
  const open = Boolean(anchorEl);
  const messageOpen = Boolean(messageAnchorEl);
  const notificationOpen = Boolean(notificationAnchorEl);
  
  // Unread counts
  const unreadMessages = messages.filter(msg => !msg.read).length;
  const unreadNotifications = notifications.filter(notif => !notif.read).length;

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setMessageModalOpen(true);
    // Mark as read when opened
    if (!message.read) {
      message.read = true;
    }
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setNotificationModalOpen(true);
    // Mark as read when opened
    if (!notification.read) {
      notification.read = true;
    }
  };

  const handleCloseMessageModal = () => {
    setMessageModalOpen(false);
    setSelectedMessage(null);
  };

  const handleCloseNotificationModal = () => {
    setNotificationModalOpen(false);
    setSelectedNotification(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMessageMenuOpen = (event) => {
    setMessageAnchorEl(event.currentTarget);
  };
  
  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMessageAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${theme.drawerWidth}px)` },
        ml: { sm: `${theme.drawerWidth}px` },
        boxShadow: 'none',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Messages Dropdown */}
          <Tooltip title="Messages">
            <IconButton 
              color="inherit"
              onClick={handleMessageMenuOpen}
              aria-controls={messageOpen ? 'messages-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={messageOpen ? 'true' : undefined}
            >
              <Badge badgeContent={unreadMessages} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          {/* Notifications Dropdown */}
          <Tooltip title="Notifications">
            <IconButton 
              color="inherit"
              onClick={handleNotificationMenuOpen}
              aria-controls={notificationOpen ? 'notifications-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={notificationOpen ? 'true' : undefined}
            >
              <Badge badgeContent={unreadNotifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          {/* Profile Menu */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleProfileMenuOpen}
              size="small"
              sx={{ ml: 1 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  bgcolor: theme.palette.primary.main,
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              >
                U
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      
      {/* Messages Menu */}
      <Menu
        anchorEl={messageAnchorEl}
        id="messages-menu"
        open={messageOpen}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          sx: {
            width: 360,
            maxWidth: '100%',
            mt: 1.5,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            '&:before': {
              content: '\"\"',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 80,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Paper sx={{ p: 2, width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>Messages</Typography>
            <Button size="small" color="primary" endIcon={<ArrowForwardIcon fontSize="small" />}>
              View All
            </Button>
          </Box>
          <List sx={{ width: '100%', maxHeight: 400, overflow: 'auto', p: 0 }}>
            {messages.map((message) => (
              <React.Fragment key={message.id}>
                <ListItem 
                  alignItems="flex-start" 
                  onClick={() => handleMessageClick(message)}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    bgcolor: !message.read ? 'action.hover' : 'transparent',
                    '&:hover': { 
                      bgcolor: 'action.hover',
                      transform: 'translateX(2px)',
                    },
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}>
                      {message.avatar}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: message.read ? 400 : 600 }}>
                          {message.sender}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {message.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {message.content}
                      </Typography>
                    }
                    primaryTypographyProps={{ noWrap: true }}
                    secondaryTypographyProps={{ component: 'div' }}
                  />
                </ListItem>
                <Divider component="li" sx={{ my: 1 }} />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        id="notifications-menu"
        open={notificationOpen}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          sx: {
            width: 360,
            maxWidth: '100%',
            mt: 1.5,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            '&:before': {
              content: '\"\"',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 50,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Paper sx={{ p: 2, width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>Notifications</Typography>
            <Button size="small" color="primary" endIcon={<ArrowForwardIcon fontSize="small" />}>
              View All
            </Button>
          </Box>
          <List sx={{ width: '100%', maxHeight: 400, overflow: 'auto', p: 0 }}>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem 
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  alignItems="flex-start"
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    bgcolor: !notification.read ? 'action.hover' : 'transparent',
                    '&:hover': { 
                      bgcolor: 'action.hover',
                      transform: 'translateX(2px)',
                    },
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {notification.type === 'order' && <ShoppingCartIcon color="primary" />}
                    {notification.type === 'user' && <PersonIcon color="info" />}
                    {notification.type === 'alert' && <NotificationsActiveIcon color="warning" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: notification.read ? 400 : 600 }}>
                          {notification.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notification.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {notification.description}
                      </Typography>
                    }
                    primaryTypographyProps={{ noWrap: true }}
                    secondaryTypographyProps={{ component: 'div' }}
                  />
                </ListItem>
                <Divider component="li" sx={{ my: 1 }} />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Menu>

      {/* Notification Details Modal */}
      <Dialog
        open={notificationModalOpen}
        onClose={handleCloseNotificationModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 24,
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 2,
          mb: 0
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {selectedNotification?.type === 'order' && (
              <ShoppingCartIcon color="primary" sx={{ mr: 1 }} />
            )}
            {selectedNotification?.type === 'user' && (
              <PersonIcon color="primary" sx={{ mr: 1 }} />
            )}
            {selectedNotification?.type === 'alert' && (
              <NotificationsActiveIcon color="warning" sx={{ mr: 1 }} />
            )}
            <Typography variant="h6" fontWeight={600}>
              {selectedNotification?.title}
            </Typography>
          </Box>
          <MuiIconButton 
            onClick={handleCloseNotificationModal}
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </MuiIconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                mr: 2, 
                bgcolor: 
                  selectedNotification?.type === 'order' ? 'primary.main' :
                  selectedNotification?.type === 'user' ? 'success.main' :
                  'warning.main'
              }}
            >
              {selectedNotification?.title?.charAt(0) || '!'}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {selectedNotification?.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {selectedNotification?.time}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            {selectedNotification?.description}
          </Typography>
          {selectedNotification?.action && (
            <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Next Steps:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedNotification.action}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Button 
            onClick={handleCloseNotificationModal}
            variant="outlined"
            size="small"
            sx={{ textTransform: 'none' }}
          >
            Close
          </Button>
          <Button 
            variant="contained"
            size="small"
            sx={{ textTransform: 'none' }}
            onClick={() => {
              // Handle action button click
              console.log('Action clicked for:', selectedNotification?.title);
              handleCloseNotificationModal();
            }}
          >
            {selectedNotification?.buttonText || 'View Details'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Message Details Modal */}
      <Dialog
        open={messageModalOpen}
        onClose={handleCloseMessageModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 24,
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 2,
          mb: 0
        }}>
          <Typography variant="h6" fontWeight={600}>
            {selectedMessage?.sender}
          </Typography>
          <MuiIconButton 
            onClick={handleCloseMessageModal}
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </MuiIconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: theme.palette.primary.main }}>
              {selectedMessage?.avatar}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {selectedMessage?.sender}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {selectedMessage?.time}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6 }}>
            {selectedMessage?.content}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Button 
            onClick={handleCloseMessageModal}
            variant="outlined"
            size="small"
            sx={{ textTransform: 'none' }}
          >
            Close
          </Button>
          <Button 
            variant="contained"
            size="small"
            sx={{ textTransform: 'none' }}
            onClick={() => {
              // Handle reply action
              console.log('Reply to:', selectedMessage?.sender);
              handleCloseMessageModal();
            }}
          >
            Reply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '\"\"',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {
          handleMenuClose();
          if (onLogout) onLogout();
        }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Topbar;
