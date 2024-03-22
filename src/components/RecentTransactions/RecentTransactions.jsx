import React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Paper, Box, ListSubheader, Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
import IncomeIcon from '@mui/icons-material/CallReceived';
import ExpenseIcon from '@mui/icons-material/NorthEast';
import './RecentTransactions.css'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 400,
    width : 500,
    maxHeight: 400,
    overflow: 'auto',
    lineHeight: '60px',
    fontFamily: 'Poppins',
    '& .MuiTypography-root': {
        fontFamily: 'Poppins'
    }
  }));

const lightTheme = createTheme({ palette: { mode: 'light' } });


const dataSet = [
    {
        title: "Shopping",
        isIncome: true,
        amount: 3000,
    },
    {
        title: "Shopping",
        isIncome: false,
        amount: 3000,
    },
    {
        title: "Shopping",
        isIncome: true,
        amount: 3000,
    },
    {
        title: "Shopping",
        isIncome: true,
        amount: 3000,
    },
    {
        title: "Shopping",
        isIncome: false,
        amount: 3000,
    },
    {
        title: "Shopping",
        isIncome: true,
        amount: 3000,
    },
    {
        title: "Shopping",
        isIncome: false,
        amount: 3000,
    },
    {
        title: "Shopping",
        isIncome: false,
        amount: 3000,
    },
    {
        title: "Shopping",
        isIncome: true,
        amount: 3000,
    }
];

const RecentTransactions = () => {
  return (
    <div className='recent-transactions'>
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
                    <ListSubheader>
                        <div className='header'>
                            <div className='heading'>
                                <h5>Recent Transactions</h5>
                            </div>
                        </div>
                    </ListSubheader>
                    <Grid item xs={12} md={6}>
                        <List>
                        {dataSet.map((tran) => (
                            <div>
                                <ListItem
                                    secondaryAction={tran.amount}
                                    >
                                    {tran.isIncome && <IncomeIcon sx={{ paddingRight: '5px', color: '#00c853' }} />}
                                    {!tran.isIncome && <ExpenseIcon sx={{ paddingRight: '5px', color: '#ff1744' }} />}
                                    <ListItemText
                                        primary={tran.title}
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

export default RecentTransactions
