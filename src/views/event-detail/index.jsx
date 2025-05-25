import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Chip, Link, Button, Divider, Stack } from '@mui/material';
import { ArrowBack, Person, Email, Phone, Home, Work, Description, MonetizationOn, Timelapse, VerifiedUser } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme hook

import { supabase } from '../../service/supabase';
// Function to determine chip color based on status (can reuse from eventRequestsTable)
const getStatusColor = (status) => {
  switch (status) {
    case 'Approved':
      return 'success';
    case 'Rejected':
      return 'error';
    case 'Pending':
    default:
      return 'warning';
  }
};

const EventDetail = () => {
  const { id } = useParams(); // Get the dynamic 'id' from the URL
  const [event, setEvent] = useState(null);
  const theme = useTheme(); // Access the theme object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetail = async () => {
      setLoading(true);
      setError(null); // Clear previous errors

      if (!id) {
        setError(new Error('Event ID is missing.'));
        setLoading(false);
        return;
      }

      console.log(`Fetching details for event ID: ${id}`);
      try {
        const { data, error: supabaseError } = await supabase
          .from('events_table')
          .select('*') // Select all columns for the detail view
          .eq('id', id) // Filter by the event ID from the URL
          .single(); // Expecting a single row

        if (supabaseError) {
          console.error('Error fetching event detail:', supabaseError);
          setError(supabaseError);
          setEvent(null); // Clear data on error
        } else if (data) {
          console.log('event detail fetched successfully:', data);
          setEvent(data);
        } else {
          // If data is null but no error, it means no record was found
          setError(new Error(`event request with ID ${id} not found.`));
          setEvent(null);
        }
      } catch (err) {
        console.error('An unexpected error occurred while fetching event detail:', err);
        setError(err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [id]); // Re-fetch whenever the ID in the URL changes

  const handleAddParticipant = () => {
    
  }
  // --- Render States ---

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading events details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Error loading events details: {error.message}</Alert>
      </Box>
    );
  }

  // If event is null after loading and no error, it means not found
  if (!event) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Events not found.</Alert>
      </Box>
    );
  }

  // --- Render event Details ---

  return (
    <Box sx={{ p: 3 }}>
      <Button startIcon={<ArrowBack />} variant="outlined" sx={{ mb: 3 }} onClick={() => window.history.back()}>
        Back
      </Button>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Stack spacing={3}>
          {/* Main Sections Container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              flexWrap: 'wrap'
            }}
          >
            {/* Personal Details Column */}
            <SectionContainer title="Event Detail" icon={<Person />} color={theme.palette.primary.main}>
              <DetailItem label="Title" value={event?.title} />
              <DetailItem label="Description" value={event?.description} icon={<Email fontSize="small" />} />
              <DetailItem label="Status" value={event?.status} icon={<Phone fontSize="small" />} />
              <DetailItem label="Host" value={event?.created_by} icon={<Home fontSize="small" />} />
              <DocumentLink label="Image" url={event?.image_url} />

            </SectionContainer>

          </Box>

          <Divider />

          {/* Timestamps Row */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="space-between">
            <DetailItem label="Created At" value={new Date(event?.created_at).toLocaleString()} icon={<Timelapse fontSize="small" />} />
            <DetailItem label="Updated At" value={new Date(event?.updated_at).toLocaleString()} icon={<VerifiedUser fontSize="small" />} />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

// Reusable Section Container Component
const SectionContainer = ({ title, icon, color, children }) => (
  <Box
    sx={{
      flex: 1,
      minWidth: 300,
      p: 2,
      borderRadius: 1,
      border: `1px solid ${color}20`,
      backgroundColor: `${color}08`
    }}
  >
    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color }}>
      {React.cloneElement(icon, { sx: { mr: 1 } })}
      {title}
    </Typography>
    <Stack spacing={1.5}>{children}</Stack>
  </Box>
);

// Detail Item Component remains the same
const DetailItem = ({ label, value, children, icon }) => (
  <Stack direction="row" spacing={2} alignItems="center">
    {icon && React.cloneElement(icon, { sx: { color: 'text.secondary' } })}
    <Typography variant="body1" sx={{ minWidth: 120, fontWeight: 500 }}>
      {label}:
    </Typography>
    {children || (
      <Typography variant="body1" color="text.secondary">
        {value || 'N/A'}
      </Typography>
    )}
  </Stack>
);

// Document Link Component remains the same
const DocumentLink = ({ label, url }) => (
  <DetailItem label={label}>
    {url ? (
      <img src={url} rel="noopener noreferrer" sx={{ cursor: 'pointer', }} width={100} />
        
      
    ) : (
      <Typography variant="body1" color="text.secondary">
        Not Available
      </Typography>
    )}
  </DetailItem>
);

// };

export default EventDetail;
