import React from 'react';
import { useState } from 'react';
import { Box, Button, Divider, IconButton, InputAdornment, Link as MuiLink, Stack, TextField, Typography } from '@mui/material';
import { Google as GoogleIcon, GitHub as GitHubIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SubmitButton from '../components/SubmitButton';
import AuthContainer from '../components/AuthContainer';

const MotionButton = motion(Button);

const LoginView = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    setIsLoading(true);
    try {
      const success = await onLogin(formData);
      if (!success) {
        // Error will be shown by the parent component
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider}`);
    // In a real app, this would redirect to the provider's OAuth flow
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Stack spacing={3}>
          <TextField
            name="email"
            label="Email Address"
            type="email"
            autoComplete="email"
            variant="outlined"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            variant="outlined"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <MuiLink 
              component="button" 
              type="button" 
              variant="body2"
              onClick={() => console.log('Forgot password clicked')}
              sx={{ textDecoration: 'none' }}
            >
              Forgot password?
            </MuiLink>
          </Box>
          
          <SubmitButton 
            type="submit" 
            fullWidth 
            loading={isLoading}
            sx={{ 
              mt: 2,
              py: 1.5,
              fontSize: '1rem',
              borderRadius: 2,
            }}
          >
            Sign In
          </SubmitButton>
          
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">OR</Typography>
          </Divider>
          
          <Stack direction="row" spacing={2} justifyContent="center">
            <MotionButton
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => handleSocialLogin('Google')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: 'none',
                py: 1.5,
              }}
            >
              Google
            </MotionButton>
            <MotionButton
              variant="outlined"
              startIcon={<GitHubIcon />}
              onClick={() => handleSocialLogin('GitHub')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: 'none',
                py: 1.5,
              }}
            >
              GitHub
            </MotionButton>
          </Stack>
          
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don't have an account?{' '}
            <MuiLink 
              component="button" 
              type="button" 
              variant="body2" 
              href="/register"
              sx={{ fontWeight: 600, textDecoration: 'none' }}
            >
              Create an account
            </MuiLink>
          </Typography>
        </Stack>
      </Box>
  );
};

export default LoginView;