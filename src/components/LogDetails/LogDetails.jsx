import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import './LogDetails.css';
import { LinearProgress, Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
import { ShoppingCart, Fastfood, School, Houseboat, ShoppingBag, 
        EmojiTransportation, MonitorHeart, CardGiftcard, MiscellaneousServices } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 500,
    width : 425,
    lineHeight: '60px',
    fontFamily: 'Poppins',
    '& .MuiTypography-root': {
        fontFamily: 'Poppins'
    },
    '& .MuiListItemText-root': {
        paddingLeft: '10px'
    },
    '& .MuiLinearProgress-root': {
        width: '200px',
        height: '10px',
        borderRadius: 5
    }
  }));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const dataSet = [
    {
        name: "Shopping",
        amount: 3000,
        icon: <ShoppingCart fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "Food",
        amount: 1500,
        icon: <Fastfood fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "Education",
        amount: 4000,
        icon: <School fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "Vacation",
        amount: 10000,
        icon: <Houseboat fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "Grocery",
        amount: 3000,
        icon: <ShoppingBag fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "Transportation",
        amount: 1000,
        icon: <EmojiTransportation fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "Insurance",
        amount: 2250,
        icon: <MonitorHeart fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "Gifts",
        amount: 500,
        icon: <CardGiftcard fontSize='small' sx={{ color: "#014f86" }} />
    },
    {
        name: "Others",
        amount: 750,
        icon: <MiscellaneousServices fontSize='small' sx={{ color: "#014f86" }} />
    }
];



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
                    <div className='header'>
                        <div className='heading px-3'>
                            <h5>Categorical Expenses</h5>
                        </div>
                    </div>
                    <Grid item xs={12} md={6}>
                        <List>
                        {dataSet.map((category) => (
                            <div>
                                <ListItem>
                                    {category.icon}
                                    <ListItemText
                                        primary={category.name}
                                    />
                                    <LinearProgress title={category.amount} variant="determinate" value={category.amount/15000*100} />
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

export default LogDetails
