import React, { useEffect, useState } from 'react'
import './Insights.css'
import { Box, Grid, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import LoginNav from '../LoginNav/LoginNav';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import IncomeIcon from '@mui/icons-material/CallReceived';
import ExpenseIcon from '@mui/icons-material/NorthEast';
import { useLocation } from 'react-router-dom';
import { Delete } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 666,
    overflow: 'auto',
    lineHeight: '60px',
    fontFamily: 'Poppins',
    '& .MuiTypography-root, .MuiDataGrid-cell': {
        fontFamily: 'Poppins'
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: 'medium',
        color: '#014f86'
    },
    '& .MuiListItemText-root': {
        paddingLeft: '10px'
    },
    '& .MuiLinearProgress-root': {
        width: '100%',
        height: '10px',
        borderRadius: 5
    },
    '& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
        marginBottom: '0px'
    },
    '& .MuiDataGrid-toolbarContainer': {
        justifyContent: 'flex-end',
        '& button': {
            color: '#014f86',
            fontFamily: 'Poppins'
        }
    }
  }));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const customToolBar = () => {
    return (
        <GridToolbarContainer>
          <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const Insights = () => {
    const [expenseData, setExpenseData] = useState([]);
    const [incomeData, setIncomeData] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [alignment, setAlignment] = useState('income');
    const location = useLocation();

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    
    const [headers, setHeaders] = useState(
        {
          "Authorization" : "Bearer " + sessionStorage.getItem("token")
        }
      )

    const fetchData = (alignment) =>{
        axios.get('http://localhost:8080/insights?userId=' + sessionStorage.getItem("id") + "&display=" + alignment, {headers: headers})
        .then(response => {
            if(response.data.code === 200) {
                if(alignment === 'expense') {
                    setExpenseData(response.data.expense);
                } else if (alignment === 'transactions') {
                    setTransactions(response.data.transactions);
                } else {
                    setIncomeData(response.data.income);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    const deleteExpense = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                axios.delete('http://localhost:8080/expense/delete?id=' + id, {headers: headers})
                .then(response => {
                    if(response.data.code === 200) {
                        setExpenseData((prevRows) => prevRows.filter((row) => row.id !== id));
                    }
                })
                .catch(error => {
                    console.error('Error deleting expense:', error);
                });
            });
    },[],);

    const deleteIncome = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                axios.delete('http://localhost:8080/income/delete?id=' + id, {headers: headers})
                .then(response => {
                    if(response.data.code === 200) {
                        setIncomeData((prevRows) => prevRows.filter((row) => row.id !== id));
                    }
                })
                .catch(error => {
                    console.error('Error deleting income:', error);
                });
            });
    },[],);

    useEffect(() => {
        if(location.state != null) {
            setAlignment(location.state.display);
            location.state = null;
        }
        fetchData(alignment);
    }, [alignment]);

    const expenseColumns = [
        { field: 'title', headerName: 'Title', width: 350 },
        { field: 'amount', headerName: 'Amount', width: 130 },
        { field: 'date', headerName: 'Date', type: 'date', width: 200, valueFormatter: (value, row) => dayjs(row.date).format('DD/MM/YYYY') },
        { field: 'description', headerName: 'Description', sortable: false, width: 300 },
        { field: 'category', headerName: 'Category', sortable: false, width: 200 },
        { field: 'actions', type: 'actions', width: 80,
          getActions: (params) => [
            <GridActionsCellItem
              icon={<Delete />}
              label="Delete"
              onClick={deleteExpense(params.id)}
              showInMenu
            />
          ]
        }
    ];
    
    const incomeColumns = [
        { field: 'title', headerName: 'Title', width: 350 },
        { field: 'amount', headerName: 'Amount', width: 130 },
        { field: 'date', headerName: 'Date', type: 'date', width: 200, valueFormatter: (value, row) => dayjs(row.date).format('DD/MM/YYYY') },
        { field: 'description', headerName: 'Description', sortable: false, width: 300 },
        { field: 'payer', headerName: 'Payer', width: 200 },
        { field: 'actions', type: 'actions', width: 80,
          getActions: (params) => [
            <GridActionsCellItem
              icon={<Delete />}
              label="Delete"
              onClick={deleteIncome(params.id)}
              showInMenu
            />
          ]
        }
    ];
    
    const transactionColumns = [
        { field: 'isIncome', headerName: 'Income/Expense', sortable: false, width: 200, 
                renderCell: (params) => params.row.isIncome === 1 ? <IncomeIcon sx={{ paddingRight: '5px', color: '#00c853' }} /> :
                <ExpenseIcon sx={{ paddingRight: '5px', color: '#ff1744' }} />
        },
        { field: 'title', headerName: 'Title', width: 400 },
        { field: 'amount', headerName: 'Amount', width: 130 },
        { field: 'date', headerName: 'Date', type: 'date', width: 200, valueFormatter: (value, row) => dayjs(row.date).format('DD/MM/YYYY') },
        { field: 'description', headerName: 'Description', sortable: false, width: 300 }
    ];

    return (
        <div>
            <LoginNav />
            <div className="container mt-3"> 
                <div id='head'>
                    <h4 className='text-start' id="h4text">Insights of your ayoola account</h4>
                    <h6 className="text-start" id="h6text">Welcome to Ayoola Finanace Management and Budget Tracker.</h6>
                </div>
                <div className="mt-3" id="nav">
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        className='toggle-btn-group'
                        >
                        <ToggleButton value="income">Income</ToggleButton>
                        <ToggleButton value="expense">Expenses</ToggleButton>
                        <ToggleButton value="transactions">Transaction History</ToggleButton>
                    </ToggleButtonGroup>
                </div>
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
                            <Grid xs={12} md={12} sm={12} xl={12}>
                            <div style={{ height: 666, width: '100%' }}>
                                {alignment === 'expense' && expenseData.length > 0 &&
                                    <DataGrid
                                        rows={expenseData}
                                        columns={expenseColumns}
                                        getRowId={(row) => row.id}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 10 },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10]}
                                        slots={{
                                            toolbar: customToolBar,
                                        }}
                                />}
                                {alignment === 'expense' && expenseData.length === 0 &&
                                    <p fontFamily="Poppins">No data available to display</p>
                                }
                                {alignment === 'income' && incomeData.length > 0 &&
                                    <DataGrid
                                        rows={incomeData}
                                        columns={incomeColumns}
                                        getRowId={(row) => row.id}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 10 },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10]}
                                        slots={{
                                            toolbar: customToolBar,
                                        }}
                                />}
                                {alignment === 'income' && incomeData.length === 0 &&
                                    <p fontFamily="Poppins">No data available to display</p>
                                }
                                {alignment === 'transactions' && transactions.length > 0 &&
                                    <DataGrid
                                        rows={transactions}
                                        columns={transactionColumns}
                                        getRowId={(row) => row.id}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 10 },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10]}
                                        slots={{
                                            toolbar: customToolBar,
                                        }}
                                />}
                                {alignment === 'transactions' && transactions.length === 0 &&
                                    <p fontFamily="Poppins">No data available to display</p>
                                }
                            </div>
                            </Grid>
                        </Item>
                    </Box>
                </ThemeProvider>   
            </div>
        </div>
    )
}
export default Insights