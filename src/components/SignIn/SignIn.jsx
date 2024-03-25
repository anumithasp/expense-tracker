import React, { useState } from 'react';
import './SignIn.css';
import { Box, Grid, TextField, Button, Alert} from '@mui/material';
import { Copyright} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
   
  const [isEmailFormatValid, setIsEmailFormatValid] = useState(true);
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");

  const[input, setInput] = new useState(
    {
      email: "",
      password: "",
    }
  )

  const inputHandler= (event)=> {
    setInput({...input,[event.target.name]:event.target.value});
    if(event.target.name === "email"){
      if(validateEmail(event.target.value)){
        setIsEmailFormatValid (true);
      } else {
        setIsEmailFormatValid(false);
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

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/login",input).then(
      (response)=>{
          if (response.data.status === "success"){
            sessionStorage.setItem("id", response.data.userId);
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("name", response.data.name);
            sessionStorage.setItem("isAdmin", response.data.isAdmin);
            navigate("/dashboard");
          } else {
            setAlert("Invalid credentials!");
            setTimeout(() => {
              setAlert("");
            }, 3000);
          } 
      }
    ).catch((err)=> {
      console.log(err);
      setAlert(err.message);
            setTimeout(() => {
              setAlert("");
            }, 3000);
    })
  }

    return (
      <div className='sign-in'>
        <div className='sign-in-wrapper'>
        <Grid container component="main" className='wrapper-main'>
        <Grid className='sign-in-input' item xs={12} sm={8} md={6}>
          <Box
            sx={{
              my: 4,
              mx: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start'
            }}
          >
            <div className='signin-title'>
            <h3>Welcome Back !</h3>
            <h6>Please Sign in to continue...</h6>
            </div>
            <Box className='box-login-form' component="form" noValidate sx={{ mt: 1 }}>
              <TextField className="signin-field"
                error={!isEmailFormatValid}
                margin="normal"
                required
                fullWidth
                name="email"
                label="E-mail Id"
                id="email"
                autoComplete="email"
                value = {input.email}
                onChange={inputHandler} 
                helperText = {!isEmailFormatValid ? "Please enter a valid email-id." : ""} 
              />
              <TextField
                type='password'
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="password"
                value = {input.password}
                onChange={inputHandler}
              />
          <div className='forgot m-2' >
              <h6><a href="/forgotpassword">Forgot Password ?</a></h6>
          </div> 
              
              <Button className='signin-button'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, backgroundColor: "#014f86", fontFamily: "Poppins"}}
                onClick={handleLogin}
              >
                Login
              </Button>
              {alert && !alert.includes('success') &&
                <Alert sx={{ padding: '0px 16px' }} variant="outlined" severity="error">
                  {alert}
                </Alert>}
            </Box>
          </Box>
          <div className='signup'>
              <h5>Don't have an account ? <a href="/signup">SignUp</a></h5>
          </div> 
        </Grid>
        <Grid className='sign-in-img'
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
          <div className='sign-in-img-content'>
            <div className='img-size'>
              <img style={{height: '25px'}} src="ayoola_white.png" alt="ayoola_logo"/>
            </div> 
            <div className='img-content'>
              <h5><p className='title'>Resume Your Financial Adventure</p></h5>
              <p className='content'>Step into Your financial journey, where every decision shapes your tomorrow.</p>
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

export default SignIn