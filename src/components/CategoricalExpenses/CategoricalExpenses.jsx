import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import './CategoricalExpenses.css';
import { LinearProgress, Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
import { ShoppingCart, Fastfood, School, Houseboat, ShoppingBag, 
         MonitorHeart, CardGiftcard, MiscellaneousServices, CreditCard } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 500,
    overflow: 'auto',
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

const iconMapper = [
    {
        name: "Shopping",
        icon: <ShoppingCart fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "Food",
        icon: <Fastfood fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "Education",
        icon: <School fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "Vacation",
        icon: <Houseboat fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "Grocery",
        icon: <ShoppingBag fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "EMI",
        icon: <CreditCard fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "Insurance",
        icon: <MonitorHeart fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "Gifts",
        icon: <CardGiftcard fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "Others",
        icon: <MiscellaneousServices fontSize='small' sx={{ color: "#014f86" }} />
    }
];



const CategoricalExpenses = (props) => {


  return (
    <div className='categ-expenses'>
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
                    <div className='header'>
                        <div className='heading px-3'>
                            <h5>Categorical Expenses</h5>
                        </div>
                    </div>
                    <Grid item xs={12} md={6}>
                        <List>
                        {props.data.map((category) => (
                            <div>
                                <ListItem>
                                    {iconMapper.filter((icon) => icon.name === category.name)[0].icon}
                                    <div style={{ width: '50%' }}>
                                        <ListItemText primary={category.name} />
                                    </div>
                                    <div style={{ width: '50%' }}>
                                        <LinearProgress title={category.expense} variant="determinate" value={category.expense/props.totalExpense*100} />
                                    </div>
                                </ListItem>
                                <Divider variant="middle" component="li" />
                            </div>
                        ))}
                        </List>
                    </Grid>
                </Item>
            </Box>
        </ThemeProvider>
    </div>
  )
}

export default CategoricalExpenses
