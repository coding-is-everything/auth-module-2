import React from 'react';
import { Box, Container, Paper, Stack, Typography, keyframes } from '@mui/material';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AuthContainer = ({ title, description, children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 40%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.7)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            animation: `${fadeIn} 0.6s ease-out forwards`,
            position: 'relative',
            zIndex: 1,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 3,
              padding: '2px',
              background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.5) 0%, rgba(16, 185, 129, 0.5) 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none',
            },
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
            <Box
              component="svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="url(#paint0_linear_1_2)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_2"
                  x1="12"
                  y1="2"
                  x2="12"
                  y2="21.02"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4F46E5" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </Box>
          </Box>
          <Stack spacing={1} textAlign="center" mb={4}>
            <Typography component="h1" variant="h4" fontWeight={700} color="text.primary">
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '80%', mx: 'auto' }}>
              {description}
            </Typography>
          </Stack>
          
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            {children}
          </Box>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {new Date().getFullYear()} Your Brand
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthContainer;