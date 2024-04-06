import React, { useState } from 'react';
import { TextField, Button, IconButton, Paper, styled, Grid, Alert } from '@mui/material';
import axios from 'axios';
import './ForgotPassword.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 500,
  width : 700,
  lineHeight: '60px',
  fontFamily: 'Poppins',
  borderRadius: '10px',
  '& .MuiPaper-root, & .MuiButtonBase-root, & .MuiFormLabel-root, & .MuiInputBase-inputMultiline': {
    fontFamily: 'Poppins'
  }
}));

const ForgotPassword = () => {
  const[input, setInput] = new useState(
    {
      email: ""
    }
  )
  const [alert, setAlert] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailFormatValid, setIsEmailFormatValid] = useState(true);
  const [isEmailExist, setIsEmailExist] = useState(true);

  const inputHandler = (event)=> {
    setInput({...input,[event.target.name]:event.target.value});
    if(event.target.name === "email") {
      if(event.target.value === "") {
        setIsEmailValid(false);
        setIsEmailFormatValid(false);
      } else {
        if(validateEmail(event.target.value)){
          setIsEmailFormatValid(true);
          axios.get("http://localhost:8080/emailexists?email=" + event.target.value).then(
            (response) => {
              if(response.data.code === 200) {
                setIsEmailExist(true);
                setIsEmailValid(true);
              } else if (response.data.code === 404) {
                setIsEmailExist(false);
                setIsEmailValid(false);
              } else {
                setIsEmailExist(false);
                setIsEmailValid(false);
              }
            }
          );
        } else {
          setIsEmailValid(false);
          setIsEmailFormatValid(false);
        }  
      }
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/forgotpassword?email='+ input.email);
      if(response.data.code === 200) {
        setAlert("Password reset link sent successfully. Please check your inbox.");
        setTimeout(() => {
          setAlert("");
          setInput({
            email: ""
          });
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setAlert('Failed to reset reset password link!');
      setTimeout(() => {
        setAlert("");
      }, 3000);
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
                  error={!isEmailValid}
                  required
                  fullWidth
                  label="E-mail Id"
                  variant="outlined"
                  className="w-50"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={input.email}
                  onChange={inputHandler}
                  helperText = {isEmailFormatValid ? (!isEmailExist ? "Email is not registered in system." : "") : "Please enter a valid email-id."}
                />
              </Grid>
              <Grid item xs={12} sx={12} md={12} >
                <Button onClick={handleSubmit} type="submit" variant="contained" id="button">
                  Send reset password link
                </Button>
              </Grid>
              <Grid item xs={12} sx={12} md={12} >
                <a href="/login"><h6 className=''><ArrowBackIcon /> Go back to Sign In</h6></a>
              </Grid>
              {alert && !alert.includes('success') && 
              <Grid item xs={12} sx={12} md={12} className='alert-grid' >
                <Alert className='alert' sx={{ padding: '0px 16px' }} variant="outlined" severity="error">
                  {alert}
                </Alert>
              </Grid>}
              </Grid>
              </div>
          </Item>
        </div>
  );
};

export default ForgotPassword;





