import { useEffect, useState } from 'react';
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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { supabase } from '../../../service/supabase';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';

// ===============================|| JWT - LOGIN ||=============================== //

export default function AuthLogin() {
  const navigate = useNavigate();

  const {admin, setAdmin} = useAuth();
  const [email, setEmail] = useState('abc@mailinator.com');
  const [adminEmail, setAdminEmail] = useState('admin@gmail.com');
  const [adminPass, setAdminPass] = useState('123456');
  const [password, setPass] = useState('654321');
  const [session, setSession] = useState(null);
  const [error, setError] = useState('');

  const ADMIN_CREDENTIALS = {
  email: import.meta.env.VITE_ADMIN_EMAIL,
password: import.meta.env.VITE_ADMIN_PASSWORD
};
  async function loginFunc() {
    try {
       setError(''); // Clear previous errors
      
      // Check if it's admin login
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        setAdmin(true); // Set admin state to true
        navigate('/dashboard/admin');
        return;
      }

      let { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (authError) throw authError;

      
        // setAdmin(false);
        navigate('/dashboard/default');

    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      console.log(error);
    }
  }



  const theme = useTheme();

  const [checked, setChecked] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-login"
          type="email"
          value={email}
          name="email"
          inputProps={{}}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
          type={showPassword ? 'text' : 'password'}
          value={password}
          name="password"
          onChange={(e) => setPass(e.target.value)}
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
          label="Password"
        />
      </FormControl>

      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label="Keep me logged in"
          />
        </Grid>
        <Grid>
          <Typography variant="subtitle1" component={Link} to="/forgot-password" color="secondary" sx={{ textDecoration: 'none' }}>
            Forgot Password?
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button color="light" sx={{color: 'white', background: '#bbc45a'}} fullWidth size="large" type="submit" variant="contained" onClick={loginFunc}>
            Sign In
          </Button>
        </AnimateButton>
      </Box>
    </>
  );
}
