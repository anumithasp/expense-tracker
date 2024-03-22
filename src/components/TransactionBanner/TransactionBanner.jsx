import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import './TransactionBanner.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 175,
    width : 400,
    lineHeight: '60px'
  }));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const IncomeExpenseBanner = () => {
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
              <div className='amount px-3'>
                <h3><CurrencyRupeeIcon />500.0k</h3>
              </div>
              <div className='symbol px-3'>
                <div className='currency'>
                  <CurrencyRupeeIcon fontSize='large' sx={{ color: '#014f86' }} />
                </div>
              </div>
            </div>
          </Item>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default IncomeExpenseBanner
