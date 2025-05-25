import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Link,
  Button,
  Divider,
  Dialog, // Use Dialog for the modal
  DialogTitle,
  DialogContent,
  IconButton // For the close button
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close'; // Import a close icon

// Function to determine chip color based on status (can reuse)
const getStatusColor = (status) => {
  switch (status) {
    case 'approved':
      return 'success';
    case 'rejected':
      return 'error';
    case 'pending':
    default:
      return 'warning';
  }
};

// LoanDetailModal component now receives loan data and close handler as props
const LoanDetailModal = ({ open, loan, onClose }) => {
  const theme = useTheme();

  // If loan data is not provided or modal is not open, don't render
  if (!loan || !open) {
    return null;
  }

  // --- Render Loan Details within a Dialog ---

  return (
    <Dialog
      open={open} // Controlled by the parent component's state
      onClose={onClose} // Close handler from the parent
      maxWidth="md" // Set max width (e.g., 'sm', 'md', 'lg')
      fullWidth // Make it take full width up to maxWidth
    >
      <DialogTitle>
        <Typography variant="h6">Events Request Details (ID: {loan.id})</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: theme.spacing(1),
              top: theme.spacing(1),
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>
        {' '}
        {/* Add dividers between title, content, and actions */}
        <Box sx={{ p: theme.spacing(2) }}>
          {' '}
          {/* Add padding inside content */}
          <Grid container spacing={theme.spacing(4)}>
            {' '}
            {/* Use theme spacing for grid gaps */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Event Information
              </Typography>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                <strong>Title:</strong> {loan.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                <strong>Description:</strong> {loan.description}
              </Typography>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                <strong>Location:</strong> {loan.location}
              </Typography>
              <Typography variant="body1">
                <strong>Image:</strong> {loan.image_url}
              </Typography>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Event Details
              </Typography>
              
              
            </Grid>
            
          </Grid>
        </Box>
      </DialogContent>
      {/* Optional Dialog Actions */}
      {/* <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default LoanDetailModal;
