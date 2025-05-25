import React from 'react';
import { Snackbar, Alert } from '@mui/material';

// This is a reusable Snackbar component
const CustomSnackbar = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000} // Snackbar will automatically close after 6 seconds
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position of the snackbar
    >
      <Alert
        onClose={onClose}
        severity={severity} // Can be 'success', 'error', 'warning', 'info'
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
