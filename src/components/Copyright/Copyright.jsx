import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Copyright.css';

const Copyright = (props) => {
  return (
    <Typography className='copyright' variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link style={{textDecoration: 'none', color: '#014f86'}} color="inherit" target='_blank' to={"/"}>
        <img height={25} src='ayoola_black.png' alt='logo black' />
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
