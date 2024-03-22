import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import './LogDetails.css';
import { CircularProgress, Divider, Grid, List, ListItem, ListItemText } from '@mui/material';

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
    }
  }));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const dataSet = [
    {
        name: "Shopping",
        amount: 3000,
    },
    {
        name: "Food",
        amount: 1500,
    },
    {
        name: "Education",
        amount: 4000,
    },
    {
        name: "Vacation",
        amount: 10000,
    },
    {
        name: "Grocery",
        amount: 3000,
    },
    {
        name: "Transportation",
        amount: 1000,
    },
    {
        name: "Insurance",
        amount: 2250,
    },
    {
        name: "Gifts",
        amount: 500,
    },
    {
        name: "Others",
        amount: 750,
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
                                <ListItem
                                    secondaryAction={category.amount}
                                    >
                                    <CircularProgress sx={{ padding: '5px' }} size="2rem" variant="determinate" value={100} />
                                    <ListItemText
                                        primary={category.name}
                                    />
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
