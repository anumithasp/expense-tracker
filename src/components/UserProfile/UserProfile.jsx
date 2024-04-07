import React, { useEffect, useState } from 'react';
import LoginNav from '../LoginNav/LoginNav';
import './UserProfile.css';
import { Grid, Box, Paper, TextField, IconButton, InputAdornment, Button, Alert, 
        FormHelperText, List, ListItem, Divider, ListItemText } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Edit from '@mui/icons-material/Edit';
import axios from 'axios';
import { Security, ContentCopy, InfoOutlined, PersonOutline, RemoveRedEye, VisibilityOff } from '@mui/icons-material';
import { Link, NavLink } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'start',
  color: theme.palette.text.secondary,
  height: 500,
  lineHeight: '60px',
  fontFamily: 'Poppins',
  '& .MuiTypography-root': {
      fontFamily: 'Poppins'
  },
  '& .MuiListItemText-root': {
      paddingLeft: '10px'
  },
  '& .MuiLinearProgress-root': {
      width: '100%',
      height: '10px',
      borderRadius: 5
  }
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const UserProfile = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [existingData, setExistingData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [family, setFamily] = useState([]);
  const [canEditName, setCanEditName] = useState(false);
  const [canEditPassword, setCanEditPassword] = useState(false);
  const [canEditEmail, setCanEditEmail] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailFormatValid, setIsEmailFormatValid] = useState(true);
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(true);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [alert, setAlert] = useState("");
  const [showCode, setShowCode] = useState(true);
  const [showNoChangeWarning, setShowNoChangeWarning] = useState(false);

  const [headers, setHeaders] = useState(
    {
      "Authorization" : "Bearer " + sessionStorage.getItem("token")
    }
  )

  const reload = () => {
    //nothing to reload, just added to handle error as we have this functionality in dashboard
  }

  useEffect(() => {
    getProfileDetails();
  }, [])

  const getProfileDetails = () => {
    axios.get("http://localhost:8080/profile?userId=" + sessionStorage.getItem("id"), {headers: headers}).then(
      (response) => {
        if(response.data.code === 200){
          console.log(response.data);
          setInput({
            name: response.data.profile.name,
            email: response.data.profile.email,
            password: response.data.profile.password,
          })
          setExistingData({
            name: response.data.profile.name,
            email: response.data.profile.email,
            password: response.data.profile.password,
          })
          sessionStorage.setItem("name", response.data.profile.name);
          setFamily(response.data.family);
        }
      }
    ).catch((err)=> {
      console.log(err);
    })
  }

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
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(family[0].code).then(
      function(){
        setAlert("Code copied to clipboard!");
        setShowCode(false);
          setTimeout(() => {
            setShowCode(true);
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

  const handleUpdate = () => {
    if(input.name === "" || input.email === "" || input.password === "") {
      input.name === "" && setIsNameValid(false);
      input.email === "" && setIsEmailValid(false);
      input.password === "" && setIsPasswordValid(false);
    } else {
      if (isNameValid && isEmailValid && !isEmailExist && isPasswordValid){
        if(input.name === existingData.name && input.password === existingData.password && input.email === existingData.email) {
          setShowNoChangeWarning(true);
          setTimeout(() => {
            setShowNoChangeWarning(false);
          },3000);
        } else {
          axios.post("http://localhost:8080/profile/update?id=" + sessionStorage.getItem("id"), input, {headers: headers}).then(
            (response)=>{
                console.log(response.data);
                if (response.data.code === 200){
                  setAlert("Profile updated successfully!");
                    setTimeout(() => {
                      setAlert("");
                      getProfileDetails();
                    }, 3000);
                }
            }
          ).catch((err)=> {
            console.log(err);
            setAlert("Profile update failed!");
            setTimeout(() => {
              setAlert("");
            }, 3000);
          })
        }
      }
    }
  }

  return (
    <div className='user-profile-settings'>
      <LoginNav reload={reload} />
      <div className="container mb-3">
      <Grid item xs={12} sm={12} md={12} className='d-flex flex-column flex-start my-3 title' >
        <h3>Profile & General Settings</h3>
        <span>Update your profile details and settings for personalized experience.</span>
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <ThemeProvider theme={lightTheme}>
          <Grid item xs={12} sm={12} md={6} xl={6} >
            <Box
              sx={{
                  borderRadius: 2,
                  bgcolor: 'background.default',
                  display: 'grid',
              }}
              >
              <Item key={1} elevation={1}>
                <Grid item xs={12} sm={12} md={12} xl={12} className='p-3'>
                  <h5>Profile Details</h5>
                </Grid>
                <Grid item xs={12} sm={12} md={12} xl={12} className='profile-details'>
                  <TextField className='profile-name'
                    error={!isNameValid}
                    margin="normal"
                    required
                    fullWidth
                    disabled = {!canEditName}
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value = {input.name}
                    onChange={inputHandler}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {<IconButton onClick={() => setCanEditName(!canEditName)}>
                              <Edit />
                            </IconButton>}
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    error={!isPasswordValid}
                    type='password'
                    margin="normal"
                    required
                    fullWidth
                    disabled = {!canEditPassword}
                    name="password"
                    label="Password"
                    id="password"
                    autoComplete="password"
                    value = {input.password}
                    onChange={inputHandler}
                    helperText = {isPasswordLengthValid ? "" : "Password must have atleast 8 characters."}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {<IconButton onClick={() => setCanEditPassword(!canEditPassword)}>
                              <Edit />
                            </IconButton>}
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    error={!isEmailValid}
                    margin="normal"
                    required
                    fullWidth
                    disabled = {!canEditEmail}
                    name="email"
                    label="E-mail Id"
                    id="email"
                    autoComplete="email"
                    value = {input.email}
                    onChange={inputHandler}  
                    helperText = {isEmailFormatValid ? (isEmailExist ? "Email already exists." : "") : "Please enter a valid email-id."}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {<IconButton onClick={() => setCanEditEmail(!canEditEmail)}>
                              <Edit />
                            </IconButton>}
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2, backgroundColor: "#014f86", fontFamily: "Poppins"}}
                    onClick={handleUpdate}
                    >
                    Update
                  </Button>
                  {showNoChangeWarning &&
                    <Alert sx={{ padding: '0px 16px', margin: '10px 0px' }} variant="outlined" severity="warning">
                    No changes made to the fields.
                  </Alert>}
                  {alert.includes("success") &&
                    <Alert sx={{ padding: '0px 16px', margin: '10px 0px' }} variant="outlined" severity="success">
                    {alert}
                  </Alert>}
                </Grid>
              </Item>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={6} >
            <Box
              sx={{
                  borderRadius: 2,
                  bgcolor: 'background.default',
                  display: 'grid',
              }}
              >
              <Item key={1} elevation={1}>
                <Grid item xs={12} sm={12} md={12} xl={12} className='p-3 d-flex justify-content-between'>
                  <h5>Family Details</h5>
                </Grid>
                <Grid item xs={12} sm={12} md={12} xl={12} className='family-details'>
                  {showCode && <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 1, mb: 2, color: "#014f86", fontFamily: "Poppins"}}
                    onClick={copyToClipboard}
                    endIcon={<ContentCopy />}
                    >
                    {family.length > 0 && family[0].code}
                  </Button>}
                  {!showCode &&
                    <Alert sx={{ padding: '0px 16px', margin: '10px 0px' }} variant="outlined" severity="success">
                    {alert}
                  </Alert>}
                  <div className='d-flex'>
                    <InfoOutlined /><FormHelperText>Click to copy and share the code with family members when they sign-up.</FormHelperText>
                  </div>
                  <List sx={{ overflow: 'auto', width: '100%', height: '320px' }}>
                      {family.map((fam) => (
                          <div>
                              <ListItem>
                                  {fam.isAdmin ? <Security fontSize='large'/> : <PersonOutline fontSize='large' />}
                                  <div style={{ width: '90%' }}>
                                      <ListItemText secondary={fam.email} className='member-name' primary={fam.name} />
                                  </div>
                                  <div style={{ width: '10%' }}>
                                    {!(sessionStorage.getItem("isAdmin") === 'true' || sessionStorage.getItem("id") == fam.userId) && 
                                      <VisibilityOff />
                                    }
                                    {(sessionStorage.getItem("isAdmin") === 'true' || sessionStorage.getItem("id") == fam.userId) && 
                                      <Link title={`Click to view ${fam.name}'s dashboard`} className='eye-link' to='/dashboard' state= {{ id: fam.userId, name: fam.name }}>
                                        <RemoveRedEye />
                                      </Link>
                                    }
                                  </div>
                              </ListItem>
                              <Divider variant="middle" component="li" />
                          </div>
                      ))}
                    </List>
                </Grid>
              </Item>
            </Box>
          </Grid>
        </ThemeProvider>
      </Grid>
      </div>
    </div>
  )
}

export default UserProfile
