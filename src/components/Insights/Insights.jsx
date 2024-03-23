import React, { useEffect, useState } from 'react'
import './Insights.css'
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const Insights = () => {


    const [onselect, setOnselect] = useState(false);
    const [rows, setRows] = useState([]);

    const onSelection = () => {
        setOnselect(true);
    }

    const styles = {
        color: onselect ? '#014f86' : 'rgb(112, 112, 112)'

    }

   

    useEffect(() => {
        // Fetch data from the backend API
        axios.get('http://localhost:8080/expenses')
            .then(response => {
                // Update the state with the fetched data
                setRows(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <div className="container ms-5 mt-5">
                <div className='' id='head'>
                    <h4 className='text-start' id="h4text">Insights of your ayoola account</h4>
                    <h6 className="text-start" id="h6text">Welcome to Ayoola Finanace Managment and Budget Tracker.</h6>
                </div>

                <div className="text-start container ms-5 mt-5" id="nav">

                    <a onClick={onSelection} style={styles} href="" className='pr-5'>Income</a>
                    <a onClick={onSelection} style={styles} href="" className='ps-5'>Expenses</a>
                    <a onClick={onSelection} style={styles} href="" className='ps-5'>Transaction History</a>

                </div>


            </div>


      <div className="ms-5 p-3">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="p-3">Catogery </TableCell>
                            <TableCell className="p-3">Date </TableCell>
                            <TableCell className="p-3">Description </TableCell>
                            <TableCell className="p-3">Amount </TableCell>
                            <TableCell className="p-3">Currency </TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.catogery}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.currency}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
      </div>      


        </div>
    )
}

export default Insights