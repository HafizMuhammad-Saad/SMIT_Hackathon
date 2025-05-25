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
        <Typography variant="h6">Loan Request Details (ID: {loan.id})</Typography>
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
                Applicant Information
              </Typography>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                <strong>Full Name:</strong> {loan.full_name}
              </Typography>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                <strong>Email:</strong> {loan.email}
              </Typography>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                <strong>Phone:</strong> {loan.phone}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {loan.address}
              </Typography>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Loan Details
              </Typography>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                <strong>Amount:</strong> ${loan.amount ? loan.amount.toLocaleString() : 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                <strong>Purpose:</strong> {loan.purpose}
              </Typography>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                <strong>Term:</strong> {loan.term} months
              </Typography>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                <strong>Status:</strong>
                <Chip label={loan.status} color={getStatusColor(loan.status)} size="small" sx={{ ml: theme.spacing(1) }} />
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: theme.spacing(2) }}>
                <strong>{'Created At:'}</strong> {loan.created_at ? new Date(loan.created_at).toLocaleString() : 'N/A'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>{'Updated At:'}</strong> {loan.updated_at ? new Date(loan.updated_at).toLocaleString() : 'N/A'}
              </Typography>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Employment Information
              </Typography>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                <strong>Employer Name:</strong> {loan.employerName || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                <strong>Employment Status:</strong> {loan.employmentStatus || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                <strong>Monthly Income:</strong> {loan.monthlyIncome ? `$${parseFloat(loan.monthlyIncome).toLocaleString()}` : 'N/A'}
              </Typography>
              <Typography variant="body1">
                <strong>Job Title:</strong> {loan.jobTitle || 'N/A'}
              </Typography>
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <Divider sx={{ my: theme.spacing(3) }} />
              <Typography variant="h6" gutterBottom sx={{ mt: theme.spacing(2) }} color="primary">
                Proof Documents
              </Typography>
              <Grid container spacing={theme.spacing(3)}>
                <Grid item size={{ xs: 12, sm: 4 }}>
                  <Typography variant="body1">
                    <strong>ID Proof:</strong>
                  </Typography>
                  {loan.id_proof_url ? (
                    <Link href={loan.id_proof_url} target="_blank" rel="noopener noreferrer">
                      View Document
                    </Link>
                  ) : (
                    <Typography component="span" variant="body1" color="textSecondary">
                      N/A
                    </Typography>
                  )}
                </Grid>
                <Grid item size={{ xs: 12, sm: 4 }}>
                  <Typography variant="body1">
                    <strong>Income Proof:</strong>
                  </Typography>
                  {loan.income_proof_url ? (
                    <Link href={loan.income_proof_url} target="_blank" rel="noopener noreferrer">
                      View Document
                    </Link>
                  ) : (
                    <Typography component="span" variant="body1" color="textSecondary">
                      N/A
                    </Typography>
                  )}
                </Grid>
                <Grid item size={{ xs: 12, sm: 4 }}>
                  <Typography variant="body1">
                    <strong>Address Proof:</strong>
                  </Typography>
                  {loan.address_proof_url ? (
                    <Link href={loan.address_proof_url} target="_blank" rel="noopener noreferrer">
                      View Document
                    </Link>
                  ) : (
                    <Typography component="span" variant="body1" color="textSecondary">
                      N/A
                    </Typography>
                  )}
                </Grid>
              </Grid>
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
