import { Box } from '@mui/material'
import React from 'react'
import './Services.css'

const Services = () => {
    return (
        <div className='container services' id='services'>
            <div className='row justify-content-center align-items-center feature-title'>
                <h2>Our Services</h2>
            </div>
            <div className='boxes row justify-content-between'>
                <div className='col col-12 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
                    <Box className='service-box'
                        height={200}
                        width={400}
                        my={4}
                        borderRadius={2}
                        display="flex"
                        alignItems="center"
                        gap={4}
                        p={2}
                        sx={{ marginTop: '0', background: 'linear-gradient(0.75turn, #972732, 50%, #e08c95)', color: 'white'}}
                        >
                        <div>
                            <h2>Budgeting</h2>
                            <h5 style={{lineHeight: '1.5', fontWeight: '300', fontSize: 'large'}}>Say goodbye to guesswork and hello to precision with our intuitive budgeting tools.</h5>
                        </div>   
                    </Box>
                </div>
                <div className='col col-12 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
                    <Box className='service-box'
                        height={200}
                        width={400}
                        my={4}
                        borderRadius={2}
                        display="flex"
                        alignItems="center"
                        gap={4}
                        p={2}
                        sx={{ marginTop: '0', background: 'linear-gradient(0.25turn, #006647, 50%, #00b57e)', color: 'white' }}
                        >
                        <div>
                            <h2>Setting Goals</h2>
                            <h5 style={{lineHeight: '1.5', fontWeight: '300', fontSize: 'large'}}>With our goal-setting feature, setting and achieving financial goals is at the heart of what we do.</h5>
                        </div>
                    </Box>
                </div>
                <div className='col col-12 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4'>
                    <Box className='service-box'
                        height={200}
                        width={400}
                        my={4}
                        borderRadius={2}
                        display="flex"
                        alignItems="center"
                        gap={4}
                        p={2}
                        sx={{ marginTop: '0', background: 'linear-gradient(0.75turn, #014983, 50%, #558eba)', color: 'white' }}
                        >
                        <div>
                            <h2>Compare & Grow</h2>
                            <h5 style={{lineHeight: '1.5', fontWeight: '300', fontSize: 'large'}}>With our intuitive comparision feature, you can easily visualize and analyze your financial inflows and outflows.</h5>
                        </div>
                    </Box>
                </div> 
            </div>
        </div>
    )
}

export default Services
