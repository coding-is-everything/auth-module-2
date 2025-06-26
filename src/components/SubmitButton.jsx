import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const SubmitButton = ({ 
  children, 
  loading = false, 
  disabled = false, 
  ...props 
}) => (
  <Button
    component={motion.button}
    type="submit"
    variant="contained"
    fullWidth
    size="large"
    disabled={disabled || loading}
    sx={{
      mt: 3,
      mb: 2,
      py: 1.5,
      borderRadius: 2,
      fontSize: '1rem',
      fontWeight: 700,
      letterSpacing: '0.5px',
      textTransform: 'none',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(90deg, #34d399 0%, #10b981 50%, #059669 100%)',
      backgroundSize: '200% auto',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      color: '#ffffff',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3), 0 4px 6px -2px rgba(5, 150, 105, 0.2)',
        backgroundPosition: 'right center',
      },
      '&:active': {
        transform: 'translateY(0)',
      },
      '&.Mui-disabled': {
        background: '#e2e8f0',
        color: '#94a3b8',
        boxShadow: 'none',
      },
      ...props.sx,
    }}
    whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
    whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
    {...props}
  >
    <motion.span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        opacity: loading ? 0 : 1,
      }}
    >
      {children}
    </motion.span>
    
    {loading && (
      <CircularProgress
        size={24}
        thickness={4}
        sx={{
          position: 'absolute',
          color: 'white',
          opacity: 0.9,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
    )}
  </Button>
);

export default SubmitButton;
