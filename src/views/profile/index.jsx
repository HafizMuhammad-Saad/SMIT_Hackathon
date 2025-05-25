// material-ui
import { Grid, Typography, TextField, Box, Button } from '@mui/material';

import { useCallback, useEffect, useState, useRef } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';

import { supabase } from '../../service/supabase'; // Make sure this path is correct
import { useAuth } from '../../contexts/AuthContext';

// ==============================|| PROFILE PAGE ||============================== //

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState(''); // Corrected state variable name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (error) {
        throw error;
      }
      if (user) {
        // Assuming user_metadata exists and contains these fields
        setName(user.user_metadata?.first_name || '');
        // It seems you were using last_name for address, let's keep that for now
        // but ideally you might want a separate address field in metadata
        setAddress(user.user_metadata?.last_name || '');
        setEmail(user.email || user.user.user_metadata?.email || ''); // Fallback to user.email
      } else {
        // Handle case where no user is logged in or data structure is unexpected
        setError('Could not retrieve user data.');
      }
    } catch (e) {
      console.error('Error fetching profile:', e.message);
      setError('Failed to load profile data.');
    } finally {
      setLoading(false);
    }
  }, []); // Added useCallback for good practice

  // const updateProfile = useCallback(async () => {
  //   try {
  //     const {data, error} = await supabase.from('profiles').select()
  //     console.log(data);

  //   } catch (error) {
  //     console.log(error);

  //   }
  // }, [])
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]); // Added fetchProfile to the dependency array

  // Display loading or error state
  if (loading) {
    return (
      <MainCard title="Profile">
        <Typography>Loading profile...</Typography>
      </MainCard>
    );
  }

  if (error) {
    return (
      <MainCard title="Profile">
        <Typography color="error">{error}</Typography>
      </MainCard>
    );
  }

  return (
    <MainCard title="User Profile">
      <Typography variant="h4" gutterBottom>
        Profile Information
      </Typography>

      <Box sx={{ mt: 3 }}>
        {' '}
        {/* Add some top margin */}
        <Grid container spacing={3}>
          {' '}
          {/* Use Grid for layout */}
          {/* Name Field */}
          <Grid item xs={12} sm={6}>
            {' '}
            {/* Takes full width on small screens, half on medium+ */}
            <TextField
              label="First Name"
              value={name}
              fullWidth
              InputProps={{
                readOnly: true // Make the field read-only for display
              }}
              variant="outlined" // Use outlined variant for a professional look
            />
          </Grid>
          {/* Address Field (using last_name for now) */}
          <Grid item xs={12} sm={6}>
            {' '}
            {/* Takes full width on small screens, half on medium+ */}
            <TextField
              label="Last Name / Address" // Updated label based on current data mapping
              value={address}
              fullWidth
              InputProps={{
                readOnly: true
              }}
              variant="outlined"
            />
          </Grid>
          {/* Email Field */}
          <Grid item xs={12}>
            {' '}
            {/* Takes full width always */}
            <TextField
              label="Email Address"
              value={email}
              fullWidth
              InputProps={{
                readOnly: true
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
        {/* <Button onClick={updateProfile}>
          Edit Profile
        </Button> */}
      </Box>
    </MainCard>
  );
}
