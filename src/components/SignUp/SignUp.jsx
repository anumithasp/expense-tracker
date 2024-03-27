import React, { useState } from 'react';
import './SignUp.css';
import { Box, Grid, TextField, Button, FormHelperText, Alert } from '@mui/material';
import Form from 'react-bootstrap/Form'
import { Copyright, ContentCopy } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as bootstrap from 'bootstrap';
import Toast from '../Toast/Toast';

const SignUp = () => {
    const [showCode, setShowCode] = useState(false);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isUniqueCodeValid, setIsUniqueCodeValid] = useState(true);
    const [isEmailFormatValid, setIsEmailFormatValid] = useState(true);
    const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(true);
    const [isEmailExist, setIsEmailExist] = useState(false);
    const [isCodeExist, setIsCodeExist] = useState(true);
    const [alert, setAlert] = useState("");
    const navigate = useNavigate();

    const[input, setInput] = new useState(
      {
        name: "",
        email: "",
        password: "",
        uniqueCode: "",
        checkedCode: false
      }
    )

    const inputHandler= (event)=> {
      setInput({...input,[event.target.name]:event.target.value});
      if(event.target.name === "name") {
        if(event.target.value === "") {
          setIsNameValid(false);
        } else {
          setIsNameValid(true);
        }
      }
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
      if(event.target.name === "uniqueCode") {
        if(event.target.value === "") {
          setIsUniqueCodeValid(false);
        } else {
            axios.get("http://localhost:8080/codeexists?code=" + event.target.value).then(
              (response) => {
                if(response.data.code === 200){
                  setIsCodeExist(true);
                  setIsUniqueCodeValid(true);
                } else if (response.data.code === 404){
                  setIsCodeExist(false);
                  setIsUniqueCodeValid(false);
                } else {
                  setIsUniqueCodeValid(false);
                }
              }
            )
        }
      }
    }

    const [showButton, setShowButton] = useState(false);

    const handleCheck = (e) => {
      setInput({...input,[e.target.name]:e.target.checked});
      setInput({...input,["uniqueCode"]:""});
      setShowButton((showButton) => e.target.checked);
      setShowCode(false);
    }
  
    const generateUniqueCode = () => {
      let charset = "";
      let newCode = "";
      charset += "0123456789";
      charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      for (let i = 0; i < 8; i++) {
          newCode += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      setInput({...input,["uniqueCode"]:newCode});
      setShowCode(true);
  };

    const copyToClipboard = () => {
      navigator.clipboard.writeText(input.uniqueCode).then(
        function(){
          setAlert("Code copied to clipboard!");
            setTimeout(() => {
              setAlert("");
            }, 3000);
        })
      .catch(
         function(err) {
            console.log(err);
            setAlert(err.message);
            setTimeout(() => {
              setAlert("");
            }, 3000);
      });
    };

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
      if(input.name === "" || input.email === "" || input.password === "" || (!input.checkedCode && input.uniqueCode === "")) {
        input.name === "" && setIsNameValid(false);
        input.email === "" && setIsEmailValid(false);
        input.password === "" && setIsPasswordValid(false);
        (!input.checkedCode && input.uniqueCode === "") && setIsUniqueCodeValid(false);
      } else {
        if (isNameValid && isEmailValid && !isEmailExist && isPasswordValid){
          if ((!input.checkedCode && isUniqueCodeValid)) {
            axios.post("http://localhost:8080/signup",input).then(
              (response)=>{
                  console.log(response.data);
                  if (response.data.status === "success"){
                    sessionStorage.setItem("id", response.data.id);
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("name", response.data.name);
                    sessionStorage.setItem("isAdmin", response.data.isAdmin);
                    navigate("/dashboard");
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
              mx: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start'
            }}
          >
            <h3 style={{ textAlign: 'left', color: '#014f86'}}>Welcome!</h3>
            <Box className='box-signup-form' component="form" noValidate sx={{ mt: 1 }}>
              <TextField className='signup-field'
                error={!isNameValid}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value = {input.name}
                onChange={inputHandler}
              />
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
              {!showButton && <TextField
                error={!isUniqueCodeValid}
                margin="normal"
                required
                fullWidth
                name="uniqueCode"
                label="Enter Family Unique Code"
                id="uniqueCode"
                type='text'
                autoComplete="uniqueCode"
                value = {input.uniqueCode}
                onChange={inputHandler}
                helperText = {!isCodeExist ? "Please enter a valid code." : ""}
              />}
              {(showButton && !showCode) && <Button className='code-button'
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, backgroundColor: "#014f86", fontFamily: "Poppins"}}
                onClick={generateUniqueCode}
              >
                Generate your Unique Family Code
              </Button>}
              {showCode && <Button
                type="button"
                fullWidth
                variant="outlined"
                sx={{ mt: 1, mb: 2, color: "#014f86", fontFamily: "Poppins"}}
                onClick={copyToClipboard}
                endIcon={<ContentCopy />}
              >
                {input.uniqueCode}
              </Button>}
              {showCode && <FormHelperText>Click to copy and share the code with family members when they sign-up.</FormHelperText>}
              {alert.includes('copied') &&
                <Alert sx={{ padding: '0px 16px', margin: '10px 0px' }} variant="outlined" severity="success">
                {alert}
              </Alert>}
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
                Register
              </Button>
              <div className='login'>
                <h5>Already have an account? <a href="/login">Login</a></h5>
              </div> 
            </Box>
          </Box>
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

export default SignUp