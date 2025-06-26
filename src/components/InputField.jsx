import React from 'react';
import { TextField } from '@mui/material';

const InputField = ({ label, ...props }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      required
      {...props}
    />
  );
};

export default InputField;