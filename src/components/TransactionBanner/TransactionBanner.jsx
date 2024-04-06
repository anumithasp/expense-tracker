import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import './TransactionBanner.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Wallet, TrendingDown, TrendingUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 175,
    lineHeight: '60px'
  }));

const lightTheme = createTheme({ palette: { mode: 'light' } });


const TransactionBanner = (props) => {
  
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
                <h5><b>{props.title}</b></h5>
                {props.title === 'INCOME' && 
                <Link title='Click to view income details' to="/insights" state={{ display: "income" }}>
                  <p>See details</p>
                </Link>}
                {props.title === 'EXPENSE' && 
                <Link title='Click to view expense details' to="/insights" state={{ display: "expense" }}>
                  <p>See details</p>
                </Link>}
              </div>
              <div className='amount px-3'>
                <h3><CurrencyRupeeIcon />{props.amount}</h3>
              </div>
              <div className='symbol px-3'>
                <div className='icon'>
                  {props.title === 'INCOME' && <TrendingDown fontSize='large' sx={{ color: '#00c853' }} />}
                  {props.title === 'EXPENSE' && <TrendingUp fontSize='large' sx={{ color: '#ff1744' }} />}
                  {!(props.title === 'EXPENSE' || props.title === 'INCOME') && <Wallet fontSize='large' sx={{ color: '#014f86' }} />}
                </div>
                <div className='icon' style= {{ backgroundColor: '#dbe2f6' }}>
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

export default TransactionBanner
