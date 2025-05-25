import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { supabase } from '../../../service/supabase';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert } from '@mui/material';

// ===========================|| JWT - REGISTER ||=========================== //

export default function AuthRegister() {
  const theme = useTheme();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // For loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setError(null);
    setSuccessMessage('');

    if (!checked) {
      setError('You must agree to the Terms & Conditions.');
      return;
    }

    if (!firstName || !lastName || !email || !password) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
            // You can add other metadata here if needed
          }
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      const { data: usersData, error: usersError } = await supabase
        .from("user_table")
        .insert({
          id: data.user.id, // Use the user ID from the sign-up response
          first_name: firstName,
          last_name: lastName,
          email: email,
        })
        .select();

      if (usersError) {
        console.log('Error inserting user data:', usersError);
        // await supabase.auth.admin.deleteUser(data.user.id); // Rollback user creation
        setError('Error inserting user data. Please try again.');

        return;

      }
      console.log('User data inserted successfully:', usersData);


      // data.user will contain the user object if signup needs confirmation
      // data.session will be null if email confirmation is required
      // data.user will contain the user object and data.session the session if auto-confirm is on
      console.log('Sign up successful, user:', data.user);

      setSuccessMessage('Registration successful! Please check your email to confirm your account.');

      setTimeout(() => {
        navigate('/login');
      }, 4000);
    } catch (err) {
      console.error('Error signing up:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container direction="column" spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }} size={12}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <form action="" onSubmit={handleRegister}>
        <Grid container spacing={{ xs: 0, sm: 2 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} // Handle change
              sx={{ ...theme.typography.customInput }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} // Handle change
              sx={{ ...theme.typography.customInput }}
            />
          </Grid>
        </Grid>
        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email-register"
            type="email"
            value={email}
            name="email"
            inputProps={{}}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-register"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            label="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            inputProps={{}}
          />
        </FormControl>

        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Grid>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
              label={
                <Typography variant="subtitle1">
                  Agree with &nbsp;
                  <Typography variant="subtitle1" component={Link} to="#">
                    Terms & Condition.
                  </Typography>
                </Typography>
              }
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          <AnimateButton>
            <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary" sx={{background: '#bbc45a'}} disabled={loading}>
              {loading ? 'signing up....' : 'Sign Up'}
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
}
