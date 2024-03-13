import React, { useEffect, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { Box, Grid, Paper, TextField, Typography, Button, FormControlLabel } from '@mui/material';
import Form from 'react-bootstrap/Form'
import { Copyright } from '@mui/icons-material';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const [showButton, setShowButton] = useState(false);

    const handleCheck = (e) => {
      setShowButton((showButton) => e.target.checked);
    }
  
    const handleRegister = (e) => {
      e.preventDefault();
      // Add your registration logic here
      if (agreeTerms) {
        // Perform registration
        console.log('Registration successful');
      } else {
        alert('Please agree to the terms and conditions');
      }
    };
  
    return (
      <div className='sign-up'>
        <div className='sign-up-wrapper'>
        <Grid container component="main">
        <Grid item xs={12} sm={8} md={6}>
          <Box
            sx={{
              my: 4,
              mx: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start'
            }}
          >
            <h3 style={{ textAlign: 'left', color: '#014f86'}}>Welcome!</h3>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField className='signup-field'
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="E-mail Id"
                id="email"
                autoComplete="email"  
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="password"
              />
              {!showButton && <TextField
                margin="normal"
                required
                fullWidth
                name="uniqueCode"
                label="Enter Family Unique Code"
                id="uniqueCode"
                type='text'
                autoComplete="uniqueCode"
              />}
              {!showButton && <div className="input-group">
                  <Form.Check className='checkbox'
                    type={'checkbox'}
                    id={`default-checkbox`}
                    label={`I do not have family unique code`}
                    onClick={handleCheck}
                  />
              </div>}
              {showButton && <TextField
                margin="normal"
                required
                fullWidth
                name="familyName"
                label="Family Name"
                id="familyName"
                type='text'
                autoComplete="familyName"
              /> }
              {showButton && <Button className='code-button'
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, backgroundColor: "#014f86", fontFamily: "Poppins"}}
              >
                Generate your Unique Family Code
              </Button>}
              <Button className='signup-button'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, backgroundColor: "#014f86", fontFamily: "Poppins"}}
                onClick={handleRegister}
              >
                Register
              </Button>
            </Box>
          </Box>
          <div className='login'>
              <h5>Already have an account? <a href="/login">Login</a></h5>
          </div> 
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: 'url("sign.png")',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            borderRadius: 3
          }}  
        >
          <div className='sign-up-img-content'>
            <div className='img-size'>
              <img style={{height: '25px'}} src="ayoola_white.png" alt="ayoola_logo"/>
            </div> 
            <div className='img-content'>
              <h5><p className='title'>Get Started By Creating Account</p></h5>
              <p className='content'>Empowering you to track expenses and achieve financial goals seamlessly.</p>
            </div>
            <div className='copyright'>
              <p><Copyright /> Ayoola</p>
            </div>
          </div>
          
        </Grid>
      </Grid>
      </div>
      </div>
      
    );
}

export default SignUp