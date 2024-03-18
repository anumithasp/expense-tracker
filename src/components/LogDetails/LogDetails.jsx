import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 175,
    width : 450,
    lineHeight: '60px'
  }));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const LogDetails = () => {
  return (
    <div>
        <ThemeProvider theme={lightTheme}>
            <Box
            sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default',
                display: 'grid',
            }}
            >
                <Item key={1} elevation={1}>
                    <div className='transaction'>
                        <div className='header px-3'>
                            <h5><b>REMAINING BALANCE</b></h5>
                            <a href='#'>
                            See details
                            </a>
                        </div>
                    </div>
                </Item>
            </Box>
        </ThemeProvider>
    </div>
  )
}

export default LogDetails
