import React, { useState } from 'react';
import './SignIn.css';
import { Box, Grid, TextField, Button, FormHelperText } from '@mui/material';
import Form from 'react-bootstrap/Form'
import { Copyright, ContentCopy } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as bootstrap from 'bootstrap';
import Toast from '../Toast/Toast';

const SignIn = () => {
    const [showCode, setShowCode] = useState(false);

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const [isEmailFormatValid, setIsEmailFormatValid] = useState(true);
    const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(true);
    const [isEmailExist, setIsEmailExist] = useState(false);
    const [isCodeExist, setIsCodeExist] = useState(true);
    const navigate = useNavigate();

    const[input, setInput] = new useState(
      {
        email: "",
        password: "",
 
        checkedCode: false
      }
    )

    const inputHandler= (event)=> {
      setInput({...input,[event.target.name]:event.target.value});
      
      if(event.target.name === "email") {
        if(event.target.value === "") {
          setIsEmailValid(false);
          setIsEmailFormatValid(false);
        } else {
          if(validateEmail(event.target.value)){
            setIsEmailFormatValid(true);
            axios.get("http://localhost:8080/emailExists?email=" + event.target.value).then(
              (response) => {
                if(response.data.code === 200) {
                  setIsEmailExist(true);
                  setIsEmailValid(false);
                } else if (response.data.code === 404) {
                  setIsEmailExist(false);
                  setIsEmailValid(true);
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
      if(event.target.name === "password") {
        if(event.target.value === "") {
          setIsPasswordValid(false);
        } else {
          if((event.target.value.length) >= 8){
            setIsPasswordValid(true);
            setIsPasswordLengthValid(true);
          } else {
            setIsPasswordLengthValid(false);
            setIsPasswordValid(false);
          }    
        }
      }
      
    }


    const [showButton, setShowButton] = useState(false);

    const handleCheck = (e) => {
      setInput({...input,[e.target.name]:e.target.checked});
      
      setShowButton((showButton) => e.target.checked);
      setShowCode(false);
    }
  
   

    

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleRegister = (e) => {
      console.log(input);
      e.preventDefault();
      if(input.email === "" || input.password === ""){
        
        input.email === "" && setIsEmailValid(false);
        input.password === "" && setIsPasswordValid(false);
        
      } else {
        if (isEmailValid && !isEmailExist && isPasswordValid){
          
            axios.post("http://localhost:8080/login",input).then(
              (response)=>{
                  console.log(response.data);
                  if (response.data.status === "success"){
                    sessionStorage.setItem("id", response.data.id);
                    sessionStorage.setItem("token", response.data.token);
                    navigate("/dashboard");
                  } else {
                    alert("Invalid credentials");
                  } 
              }
            ).catch((err)=> {
              console.log(err);
            })
          
        }
      }
    };

    return (
      <div className='sign-up'>
        <div className='sign-up-wrapper'>
        <Toast message="Copied to clipboard!" />
        <Grid container component="main" className='wrapper-main'>
        <Grid className='sign-up-input' item xs={12} sm={8} md={6}>
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
              
              <TextField
                error={!isEmailValid}
                margin="normal"
                required
                fullWidth
                name="email"
                label="E-mail Id"
                id="email"
                autoComplete="email"
                value = {input.email}
                onChange={inputHandler}  
                helperText = {isEmailFormatValid ? (isEmailExist ? "Email already exists." : "") : "Please enter a valid email-id."}
              />
              <TextField
                error={!isPasswordValid}
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
                helperText = {isPasswordLengthValid ? "" : "Password must have atleast 8 characters."}
              />

          <div className='forgot text-end' >
              <h6> <a href="/forgot">Forgot Password</a></h6>
          </div> 
              
              
              {showCode && <FormHelperText>Click to copy and share the code with family members when they sign-up.</FormHelperText>}
              <div className="input-group">
                  <Form.Check className='checkbox'
                    name='checkedCode'
                    type={'checkbox'}
                    id={`default-checkbox`}
                    label={`I do not have family unique code`}
                    onClick={handleCheck}
                  />
              </div>
              <Button className='signup-button'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, backgroundColor: "#014f86", fontFamily: "Poppins"}}
                onClick={handleRegister}
              >
                Log In
              </Button>
            </Box>
          </Box>
          <div className='login'>
              <h5>Don't have an account? <a href="/signup">SignUp</a></h5>
          </div> 
        </Grid>
        <Grid className='sign-up-img'
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

export default SignIn