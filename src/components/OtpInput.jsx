import React from 'react';
import { Stack, TextField, Typography } from '@mui/material';

const OtpInput = ({ onComplete }) => {
    const handleInputChange = (e, index) => {
        const { value } = e.target;
        if (value.length === 1 && index < 5) {
            const nextSibling = document.querySelector(`input[name='otp-${index + 1}']`);
            if (nextSibling) {
                nextSibling.focus();
            }
        }
        
        const inputs = document.querySelectorAll('input[name^="otp-"]');
        const otp = Array.from(inputs).map(input => input.value).join('');
        if (otp.length === 6) {
            onComplete(otp);
        }
    };

    return (
        <Stack spacing={2} alignItems="center">
            <Typography>Enter Verification Code</Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
                {[...Array(6)].map((_, index) => (
                    <TextField
                        key={index}
                        name={`otp-${index}`}
                        inputProps={{
                            maxLength: 1,
                            style: { textAlign: 'center', fontSize: '1.2rem' },
                        }}
                        sx={{ width: '45px' }}
                        onChange={(e) => handleInputChange(e, index)}
                    />
                ))}
            </Stack>
        </Stack>
    );
};

export default OtpInput;
