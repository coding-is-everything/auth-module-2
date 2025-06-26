import React, { useState } from 'react';
import { Box, Button, Checkbox, Divider, FormControlLabel, IconButton, InputAdornment, Link as MuiLink, Stack, TextField, Typography } from '@mui/material';
import { Google as GoogleIcon, GitHub as GitHubIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import AuthContainer from '../components/AuthContainer';
import SubmitButton from '../components/SubmitButton';

const MotionButton = motion(Button);

const RegisterView = ({ onNavigate, showNotification }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      showNotification('Passwords do not match', 'error');
      return;
    }
    
    if (!formData.terms) {
      showNotification('You must accept the terms and conditions', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      showNotification('Creating your account...', 'info');
      await new Promise(resolve => setTimeout(resolve, 1500));
      showNotification('Account created! Please verify your email.', 'success');
      onNavigate('/otp');
    } catch (error) {
      showNotification('Failed to create account. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    showNotification(`Registering with ${provider}...`, 'info');
    // Handle social registration logic here
  };

  return (
    <AuthContainer 
      title="Create an Account" 
      description="Join our community and unlock amazing features"
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <Stack spacing={3}>
          <TextField
            name="name"
            label="Full Name"
            type="text"
            autoComplete="name"
            variant="outlined"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          
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
            autoComplete="new-password"
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
          
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            variant="outlined"
            fullWidth
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            error={formData.password !== formData.confirmPassword && formData.confirmPassword !== ''}
            helperText={formData.password !== formData.confirmPassword && formData.confirmPassword !== '' ? 'Passwords do not match' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
          
          <FormControlLabel
            control={
              <Checkbox 
                name="terms"
                checked={formData.terms} 
                onChange={handleChange}
                color="primary"
                required
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{' '}
                <MuiLink href="#" color="primary">Terms of Service</MuiLink> and{' '}
                <MuiLink href="#" color="primary">Privacy Policy</MuiLink>
              </Typography>
            }
            sx={{ mt: 1, alignItems: 'flex-start' }}
          />
          
          <SubmitButton 
            type="submit" 
            fullWidth 
            loading={isLoading}
            disabled={!formData.terms}
            sx={{ 
              mt: 1,
              py: 1.5,
              fontSize: '1rem',
              borderRadius: 2,
            }}
          >
            Create Account
          </SubmitButton>
          
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">OR</Typography>
          </Divider>
          
          <Stack direction="row" spacing={2} justifyContent="center">
            <MotionButton
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => handleSocialRegister('Google')}
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
              onClick={() => handleSocialRegister('GitHub')}
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
          
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <MuiLink 
              component="button" 
              type="button" 
              variant="body2" 
              onClick={() => onNavigate('/login')}
              sx={{ fontWeight: 600, textDecoration: 'none' }}
            >
              Sign in
            </MuiLink>
          </Typography>
        </Stack>
      </Box>
    </AuthContainer>
  );
};

export default RegisterView;
