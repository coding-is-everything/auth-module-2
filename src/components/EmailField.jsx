import React from 'react';
import InputField from './InputField';

const EmailField = (props) => (
  <InputField
    label="Email Address"
    type="email"
    autoComplete="email"
    {...props}
  />
);

export default EmailField;