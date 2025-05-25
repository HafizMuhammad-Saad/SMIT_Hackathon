// material-ui
import { useForm } from 'react-hook-form';
import React from 'react';
import { Container, Box, Typography, TextField, Button, Grid, CircularProgress, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { color } from 'framer-motion';

// ==============================|| SAMPLE PAGE ||============================== //

export default function ContactPage() {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'all'
  });

  async function formSubmit(data) {
    await new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve();
      }, 5000)
    );
    console.log(data);
    reset();
  }

  return (
    <MainCard title="Contact Us">
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Get in Touch
      </Typography>

      {/* {submitSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Message sent successfully!
          </Alert>
        )} */}

      <form action="" onSubmit={handleSubmit(formSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              {...register('name', {
                required: {
                  value: true,
                  message: 'This field is required'
                },
                minLength: {
                  value: 3,
                  message: 'Min Length should be 3'
                },
                maxLength: {
                  value: 25,
                  message: 'Max Length should be 25'
                }
              })}
              error={errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Phone Number" variant="outlined" {...register('phone')} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              {...register('message', { required: 'Message is required' })}
              error={!!errors.message}
              helperText={errors.message?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={!isSubmitting && <SendIcon />}
              disabled={isSubmitting}
              sx={{
                py: 1.5,
                px: 4,
                fontWeight: 'bold',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2
                }
              }}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Send Message'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
}
