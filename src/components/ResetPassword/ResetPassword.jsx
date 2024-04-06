import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper, styled, Grid, Alert } from '@mui/material';
import axios from 'axios';
import './ResetPassword.css';
import { useSearchParams } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';

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

const ResetPassword = () => {

    const[input, setInput] = new useState(
        {
          newpassword: "",
          confirmpassword: ""
        }
      )
    const [alert, setAlert] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(true);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
    const params = useSearchParams();
    const [key, setKey] = useState("");

    useEffect(() => {
        if(params[0].size > 0) {
            setKey(params[0].get("key"));
        }
    }, [])

    const inputHandler = (event) => {
        setInput({...input,[event.target.name]:event.target.value});
        if(event.target.name === "newpassword") {
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
        if(event.target.name === "confirmpassword") {
            if(event.target.value === input.newpassword) {
                setIsConfirmPasswordValid(true);
            } else {
                setIsConfirmPasswordValid(false);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/resetpassword?key='+ encodeURIComponent(key), input);
            if(response.data.code === 200) {
                setAlert("Password reset completed successfully. Please login.");
                setTimeout(() => {
                    setAlert("");
                    setInput({
                        newpassword: "",
                        confirmpassword: ""
                      });
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            setAlert('Failed to reset password!');
            setTimeout(() => {
                setAlert("");
            }, 3000);
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center reset-password'>
          <Item key={1} elevation={1}> 
            <div className='text-start'>
            </div>
            <div className='paper'>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={12} sx={12} md={12} >
              <h3>Reset Password</h3>
            </Grid>
            <Grid item xs={12} sx={12} md={12} >
                <TextField
                    error={!isPasswordValid}
                    type='password'
                    margin="normal"
                    required
                    fullWidth
                    variant="outlined"
                    className="w-50"
                    name="newpassword"
                    label="New Password"
                    id="newpassword"
                    autoComplete="newpassword"
                    value = {input.newpassword}
                    onChange={inputHandler}
                    helperText = {isPasswordLengthValid ? "" : "Password must have atleast 8 characters."}
                />
            </Grid>
            <Grid item xs={12} sx={12} md={12} className='confirm-password'>
                <TextField
                    error={!isConfirmPasswordValid}
                    type='password'
                    margin="normal"
                    required
                    fullWidth
                    variant="outlined"
                    className="w-50"
                    name="confirmpassword"
                    label="Confirm Password"
                    id="confirmpassword"
                    autoComplete="confirmpassword"
                    value = {input.confirmpassword}
                    onChange={inputHandler}
                    helperText = {isConfirmPasswordValid ? "" : "Confirm password must be similar to new password."}
                />
              </Grid>
              <Grid item xs={12} sx={12} md={12} >
                <Button onClick={handleSubmit} type="submit" variant="contained" id="button">
                  Update Password
                </Button>
              </Grid>
              <Grid item xs={12} sx={12} md={12} >
                <a href="/login"><h6 className=''>Go to Sign In <ArrowForward /></h6></a>
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
    )
}

export default ResetPassword
