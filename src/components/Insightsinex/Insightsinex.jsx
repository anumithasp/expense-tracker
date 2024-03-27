import React from 'react'
import { useEffect, useState } from 'react'
import './Insightsinex.css';
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlightIcon from '@mui/icons-material/Flight';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SchoolIcon from '@mui/icons-material/School';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LoginNav from '../LoginNav/LoginNav';
import { Link } from 'react-router-dom';



const Insightsinex = () => {




    const [rows, setRows] = useState([]);
    const [rowsIn, setRowsIn] = useState([]);

    const fetchIncomeData= ()=>{
        axios.get('http://localhost:8080/insightsin?userId=2')
            .then(response => {
                
                console.log("response.data")
                setRowsIn(response.data.insightsin);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {fetchIncomeData()}, []);
    



    const [onselect, setOnselect] = useState(false);
    const onSelection = () => {
        setOnselect(true);
    }

    

    const renderIcon = (title) => {
        switch (title) {
            case 'shopping':
                return <ShoppingBagIcon style={{ color: "#014f86" }} />;
            case 'trip':
                return <FlightIcon style={{ color: "#014f86" }} />;
            case 'food':
                return <FastfoodIcon style={{ color: "#014f86" }} />;
            case 'education' :
                return <SchoolIcon style={{ color: "#014f86" }} />;
            case 'gifts':
                return <CardGiftcardIcon style={{ color: "#014f86" }} />;
            case 'insurance':
                return < AccountBalanceIcon style={{ color: "#014f86" }} />;
            case 'transportation':
                return <DirectionsBusFilledIcon style={{ color: "#014f86" }} />;       
            case 'grocery':
                return <LocalGroceryStoreIcon style={{ color: "#014f86" }} />;
            case 'salary':
                return <CurrencyRupeeIcon style={{ color: "#014f86" }} />

          default:
            return null; // Return null if no matching title
        }}

    const styles = {
        color: onselect ? '#014f86' : 'rgb(112, 112, 112)'

    }
    const fetchExpenseData= ()=>{
        axios.get('http://localhost:8080/insights?userId=2')
            .then(response => {
                // Update the state with the fetched data
                console.log("response.data")
                setRows(response.data.insights);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }


    
    

    useEffect(() => {fetchExpenseData()}, []);



  return (
    <div>
        <div>
            <LoginNav />
            <Link to="/dashboard" id="back">
                    <ArrowBackTwoToneIcon style={{ color: "#014f86" }} />
             </Link>
            <div className="container ms-5 mt-5">

                <div className='' id='head'>
                    <h4 className='text-start' id="h4text">Insights of your ayoola account</h4>
                    <h6 className="text-start" id="h6text">Welcome to Ayoola Finanace Managment and Budget Tracker.</h6>
                </div>

                <div className="text-start container ms-5 mt-5" id="nav">

                    <Link onClick={onSelection} style={styles} to="/insightsincome" className='pr-5'>Income</Link>
                    <Link onClick={onSelection} style={styles} to="/insights" className='ps-5'>Expenses</Link>
                    <Link onClick={onSelection} style={styles} to="/transactionscmp" className='ps-5'>Transaction History</Link>

                </div>


            </div>

           <div className="ms-5 p-3">
            <TableContainer component={Paper} className=' d-flex justify-content-cente'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <h6 className='text-start ms-3 mt-3' style={{ color: "#a3a0a0"}}>Expenses</h6>
                        <TableRow>
                            <TableCell className="p-3" style={{ color: "#014f86" , fontWeight:"bold", fontFamily:"Poppins" }}>Catogery </TableCell>
                            <TableCell className="p-3" style={{ color: "#014f86" , fontWeight:"bold" }}>Date </TableCell>
                            <TableCell className="p-3" style={{ color: "#014f86" , fontWeight:"bold" }}>Description </TableCell>
                            <TableCell className="p-3" style={{ color: "#014f86" , fontWeight:"bold" }}>Amount </TableCell>
                            <TableCell className="p-3" style={{ color: "#014f86" , fontWeight:"bold" }}>Currency </TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell className="p-3">{renderIcon(row.title)}{row.title}</TableCell>
                                <TableCell className="p-3">{row.date}</TableCell>
                                <TableCell className="p-3">{row.description ? row.description : "N/A"}</TableCell>
                                <TableCell className="p-3">{row.amount}</TableCell>
                                <TableCell className="p-3">{"INR"}</TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
      </div>   


      
        <div className="ms-5 p-3">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <h6 className='text-start ms-3 mt-3' >Income</h6>
                        <TableRow>
                            <TableCell className="p-3" style={{ color: "#014f86" , fontWeight:"bold", fontFamily:"Poppins" }}>Catogery </TableCell>
                            <TableCell className="p-3" style={{ color: "#014f86" , fontWeight:"bold", fontFamily:"Poppins" }}>Date </TableCell>
                            <TableCell className="p-3" style={{ color: "#014f86" , fontWeight:"bold", fontFamily:"Poppins" }}>Description </TableCell>
                            <TableCell className="p-3" style={{ color: "#014f86" , fontWeight:"bold", fontFamily:"Poppins" }}>Amount </TableCell>
                            <TableCell className="p-3" style={{ color: "#014f86" , fontWeight:"bold", fontFamily:"Poppins" }}>Currency </TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsIn.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell className="p-3">{renderIcon(row.title)}{row.title}</TableCell>
                                <TableCell className="p-3">{row.created_date}</TableCell>
                                <TableCell className="p-3">{row.description ? row.description : "N/A"}</TableCell>
                                <TableCell className="p-3">{row.amount}</TableCell>
                                <TableCell className="p-3">{"INR"}</TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
      </div>   

      </div>
    </div>
  )
}

export default Insightsinex