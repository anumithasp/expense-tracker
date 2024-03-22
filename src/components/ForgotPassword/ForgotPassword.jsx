import React, { useState } from 'react';
import { TextField, Button, IconButton, Paper, styled, Grid } from '@mui/material';
import axios from 'axios';
import './ForgotPassword.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const ForgotPassword = () => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 500,
    width : 700,
    lineHeight: '60px',
    fontFamily: 'Poppins',
    borderRadius: '10px'
  }));

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/resetpassword?'+ email);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to reset password. Please try again later.');
    }
  };

  const handleGoBack = () => {
    window.location.href = '/login'; // Navigate to the login page when clicking the back button
  };

  return (
        <div className='d-flex justify-content-center align-items-center forgot-password'>
          <Item key={1} elevation={1}> 
            <div className='text-start'>
              <IconButton title='Click to go back to login page' onClick={handleGoBack}>
                  <ArrowBackIcon />
              </IconButton>
            </div>
            <div className='paper'>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={12} sx={12} md={12} >
              <h3>Forgot Password</h3>
            </Grid>
            <Grid item xs={12} sx={12} md={12} >
              <h6 className='text-dark'>Please enter the email id associated with your account</h6>
            </Grid>
            <Grid item xs={12} sx={12} md={12} >
                <TextField
                  required
                  fullWidth
                  label="E-mail Id"
                  variant="outlined"
                  className="w-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={12} md={12} >
                <Button onClick={handleSubmit} type="submit" variant="contained" id="button">
                  Reset Password
                </Button>
              </Grid>
              <Grid item xs={12} sx={12} md={12} >
                <a href="/login"><h6 className=''><ArrowBackIcon /> Go back to Sign In</h6></a>
              </Grid>
              {message && <p>{message}</p>}
              </Grid>
              </div>
          </Item>
        </div>
  );
};

export default ForgotPassword;





