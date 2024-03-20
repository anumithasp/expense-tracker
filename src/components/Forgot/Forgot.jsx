import React, { useState } from 'react';
import { TextField, Button, Box, IconButton } from '@mui/material';
import axios from 'axios';
import './Forgot.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Forgot = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/reset-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to reset password. Please try again later.');
    }
  };

  const handleGoBack = () => {
    window.location.href = '/login'; // Navigate to the login page when clicking the back button
  };

  return (

    <div className='container'>
        <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-5 mt-5" id="col1">
            
            <br/><br/>
            <div className='text-start'>
            <IconButton onClick={handleGoBack}>
                 <ArrowBackIcon />
            </IconButton>
            </div>
            
            
                   <h2>Password Reset</h2>
                      <br/>
                   <h6 className='text-dark'>Please enter your email Id</h6>

     <form onSubmit={handleSubmit}>
       <TextField
         label="Email Address"
         variant="outlined"
         className="w-50"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
       />
       <br/><br/><br/>
       <Button type="submit" variant="contained" id="button">
         Reset Password
       </Button>

       <br/><br/><br/>
       <a href="/login"><h6 className=''>Go back to Sign In</h6></a>
     </form>
     {message && <p>{message}</p>}

    
            </div>
        </div>
    </div>

    
  );
};

export default Forgot;





