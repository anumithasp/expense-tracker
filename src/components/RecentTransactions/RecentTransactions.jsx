import React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Paper, Box, ListSubheader, Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
import IncomeIcon from '@mui/icons-material/CallReceived';
import ExpenseIcon from '@mui/icons-material/NorthEast';
import { ArrowForwardIosRounded } from '@mui/icons-material'
import './RecentTransactions.css';
import { formatNum } from '../../App';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 400,
    maxHeight: 400,
    overflow: 'auto',
    lineHeight: '60px',
    fontFamily: 'Poppins',
    '& .MuiTypography-root': {
        fontFamily: 'Poppins'
    },
    '& .MuiListItemText-root': {
        paddingLeft: '10px',
        '& .MuiTypography-root': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '95%'
        }
    },
    '& .MuiListItemSecondaryAction-root': {
        color: '#014f86',
        fontWeight: 500
    }
  }));

const lightTheme = createTheme({ palette: { mode: 'light' } });


const RecentTransactions = (props) => {
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
                            <div className='heading d-flex justify-content-between'>
                                <h5>Recent Transactions</h5>
                                <a title='Click to view all transactions' href='/insights'><ArrowForwardIosRounded sx={{ color: '#014f86' }} /></a>
                            </div>
                        </div>
                    </ListSubheader>
                    <Grid item xs={12} md={6}>
                        <List>
                        {props.data.length === 0 && <p>No data available to display</p>} 
                        {props.data.map((tran) => (
                            <div>
                                <ListItem
                                    secondaryAction={formatNum(tran.amount)}
                                    >
                                    {tran.isIncome === 1 && <IncomeIcon sx={{ paddingRight: '5px', color: '#00c853' }} />}
                                    {tran.isIncome === 0 && <ExpenseIcon sx={{ paddingRight: '5px', color: '#ff1744' }} />}
                                    <ListItemText title={tran.title} primary={tran.title} />
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
