import React from 'react';
import { Stack, Typography, Link as MuiLink } from '@mui/material';
import AuthContainer from '../components/AuthContainer';
import OtpInput from '../components/OtpInput';

const OtpView = ({ onNavigate, showNotification }) => {
  const handleOtpComplete = (otp) => {
    console.log("Entered OTP:", otp);
    showNotification('Your account has been verified. Redirecting...', 'success');
    setTimeout(() => onNavigate('login'), 3000);
  };

  return (
    <AuthContainer title="Verify Your Account" description="A 6-digit code was sent to your email.">
      <Stack spacing={3} sx={{ width: '100%', alignItems: 'center' }}>
        <OtpInput onComplete={handleOtpComplete} />
        <Typography variant="body2" align="center">
          Didn't receive a code?{' '}
          <MuiLink component="button" variant="body2">
            Resend
          </MuiLink>
        </Typography>
      </Stack>
    </AuthContainer>
  );
};

export default OtpView;