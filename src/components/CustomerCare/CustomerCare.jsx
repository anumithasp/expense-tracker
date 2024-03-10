import React from 'react';
import './CustomerCare.css';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const CustomerCare = () => {
    const style = {
        color: '#014f86'
    }

    return (
        <div className='customer-care' id='customer-care'>
            <div className='row justify-content-center align-items-center feature-title'>
                <div className='col col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>  
                    <h2>Customer Care</h2>
                </div>
            </div>
            <div className='customer-banner'>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2'></div>
                    <div className='col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8'>
                        <h4>At Ayoola, your satisfaction is our priority. We're here to <b >support & care</b> you every step of the way.</h4>
                    </div>
                    <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2'></div>
                </div>
                <div className='row justify-content-center align-items-center contact'>
                    <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2'></div>
                    <div className='col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 d-flex justify-content-center'>
                        <span><PhoneIcon style={style}/> +91  98765 43210&emsp;|&emsp;<AlternateEmailIcon style={style} />&nbsp;<a href='mailto:customercare@ayoola.in'>customercare@ayoola.in</a> </span>
                    </div>
                    <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2'></div>
                </div>
            </div>
        </div>
    )
}

export default CustomerCare
