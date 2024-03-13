import React from 'react'
import Copyright from '../Copyright/Copyright'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './Footer.css';

const Footer = () => {
    const iconStyle = {
        color: '#014f86',
        padding: '0 20px 0px 20px',
        fontSize: 'large' 
    }

    return (
        <div className='footer'>
            <div className='footer-banner'>
                <div className='row justify-content-center align-items-center icons'>
                    <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2'></div>
                    <div className='col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8'>
                        <span style={iconStyle}><InstagramIcon fontSize='large'/></span>
                        <span style={iconStyle}><FacebookIcon fontSize='large'/></span>
                        <span style={iconStyle}><LinkedInIcon fontSize='large'/></span>
                    </div>
                    <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2'></div>
                </div>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2'></div>
                    <div className='col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 d-flex justify-content-center'>
                        <Copyright sx={{ mt: 5 }} />
                    </div>
                    <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2'></div>
                </div>
            </div>
        </div>
    )
}

export default Footer
