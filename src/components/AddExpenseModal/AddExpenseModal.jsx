import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { styled, Alert } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './AddExpenseModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    maxWidth: '800px',
    borderRadius: '10px'
  },
  '& .MuiFormLabel-root, & .MuiInputBase-inputMultiline': {
    fontFamily: 'Poppins'
  }
}));

const AddExpenseModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [alert, setAlert] = useState("");

    const [input, setInput] = useState({
      title: '',
      amount: '',
      gst: '',
      date: new Date(),
      payee: sessionStorage.getItem("name"),
      category: 1,
      payment_type: 1,
      description: '',
      user_id: sessionStorage.getItem("id")
    });

    const [isTitleValid, setIsTitleValid] = useState(true);
    const [isAmountValid, setIsAmountValid] = useState(true);
    const [isGstValid, setIsGstValid] = useState(true);
    const [isPayeeValid, setIsPayeeValid] = useState(true);

    const inputHandler= (event)=> {
      setInput({...input,[event.target.name]:event.target.value});
      if(event.target.name === "title"){
        if(event.target.value === ""){
          setIsTitleValid(false);
        } else {
          setIsTitleValid(true);
        }
      }
      if(event.target.name === "amount"){
        if(event.target.value === ""){
          setIsAmountValid(false);
        } else {
          setIsAmountValid(true);
        }
      }
      if(event.target.name === "gst"){
        if(event.target.value === ""){
          setIsGstValid(false);
        } else {
          setIsGstValid(true);
        }
      }
      if(event.target.name === "payee"){
        if(event.target.value === ""){
          setIsPayeeValid(false);
        } else {
          setIsPayeeValid(true);
        }
      }
    }

    const dateHandler = (event) => {
      if (event.$isDayjsObject) {
        console.log(new Date(event.$d));
        setInput({...input,['date']:new Date(event.$d)});
      }
    }

    const [headers, setHeaders] = useState(
      {
        "Authorization" : "Bearer " + sessionStorage.getItem("token")
      }
    )
    const addExpense = (e) =>{
      console.log(input);
      e.preventDefault();
      if(input.title === "" || input.amount === "" || input.gst === "" || input.payee === ""){
        input.title === "" && setIsTitleValid(false);
        input.amount === "" && setIsAmountValid(false);
        input.gst === "" && setIsGstValid(false);
        input.payee === "" && setIsPayeeValid(false);
      } else {
          axios.post("http://localhost:8080/addExpense",input,{headers:headers}).then(
            (response)=>{
              if(response.status === 201){
                setAlert("Expense added successfully!");
                setTimeout(() => {
                  setAlert("");
                  setInput({
                    title: '',
                    amount: '',
                    gst: '',
                    date: new Date(),
                    payee: sessionStorage.getItem("name"),
                    category: 1,
                    payment_type: 1,
                    description: '',
                    user_id: sessionStorage.getItem("id")
                  });
                }, 3000);
              }
            }
          ).catch((err)=> {
            setAlert("Something went wrong!");
            setTimeout(() => {
              setAlert("");
            }, 3000);
          })
        }  
    }

    
    const [categories, setCategories] = useState([]);
    const [paymentTypes, setPaymentTypes] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:8080/categories").then(
              (response)=>{
                  setCategories(response.data.categories);
              }
            ).catch((err)=> {
              console.log(err);
            })
      axios.get("http://localhost:8080/paymentTypes").then(
        (response)=>{
            setPaymentTypes(response.data.paymentTypes);
        }
      ).catch((err)=> {
        console.log(err);
      })
    },[])
   
    return (
      <div >
        <a className="nav-link" href="#">
            <button onClick={handleOpen} className='btn btn-primary exp-btn-primary'>Add Expense</button>
        </a>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
          }}
        >
            <React.Fragment> 
            <Box sx={style}>
              <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              >
                <DialogTitle 
                sx={{ m: 0, p: 2, 
                  backgroundColor: "#014f86",
                  color: 'white',
                  fontSize: 'medium',
                  fontFamily: 'Poppins'
                }} 
                id="customized-dialog-title">
                  Add New Expense
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon/>
                </IconButton>
                <DialogContent sx={{fontSize:'small'}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={12} sm={12} md={12}>
                      <TextField
                      error = {!isTitleValid}
                      label="Title"
                      required
                      fullWidth
                      size="medium"
                      id="title"
                      name='title'
                      value={input.title}
                      onChange={inputHandler}
                      sx={{ fontFamily: 'Poppins' }}
                      />
                  </Grid>
                  <Grid item xs={3} sm={4} md={4}>
                    <TextField
                    error = {!isAmountValid}
                    label="Amount"
                    fullWidth
                    required
                    size="medium"
                    id="amount"
                    name='amount'
                    type='number'
                    value={input.amount}
                    onChange={inputHandler}
                    placeholder="0.0"  
                    InputProps={ input.amount != '' &&  {
                      startAdornment: <CurrencyRupeeIcon sx={{fontSize:'medium'}}/>
                    }}
                    />
                  </Grid>
                  <Grid item xs={3} sm={4} md={4}>
                    <TextField
                    error = {!isGstValid}
                    id="gst"
                    label="GST Rate"
                    fullWidth
                    required
                    type='number'
                    size="medium"
                    name='gst'
                    value={input.gst}
                    onChange={inputHandler}
                    placeholder="0%"
                    InputProps={{
                      endAdornment: '%'
                    }}
                    >
                    </TextField> 
                  </Grid>
                  <Grid item xs={3} sm={4} md={4}>
                  <LocalizationProvider required dateAdapter={AdapterDayjs}>
                      <DatePicker className='expense-date'
                        label="Date of Purchase"
                        fullWidth
                        required
                        name='date' 
                        size='medium'
                        value={dayjs(input.date)}
                        onChange={dateHandler}
                        format="YYYY-MM-DD"
                        disableFuture
                        openTo="year"
                        views={["year", "month", "day"]} 
                      />
                  </LocalizationProvider>
                  </Grid>  
                  <Grid item xs={4} sm={6} md={4}>
                    <TextField
                    error = {!isPayeeValid}
                    label="Payee"
                    fullWidth
                    required
                    sx={{ width: '100%'}}
                    size="medium"
                    id="payee"
                    name='payee'
                    value={input.payee}
                    onChange={inputHandler}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6} md={4}>
                    <TextField
                    label="Category"
                    fullWidth
                    required
                    size="medium"
                    id="category"
                    name='category'
                    value={input.category}
                    onChange={inputHandler}
                    select
                    SelectProps={{
                      native:'true'
                    }}
                    >
                      {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                      {category.name}
                      </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={4} sm={6} md={4}>
                    <TextField
                    label="Payment Type"
                    fullWidth
                    required
                    sx={{ width: '100%' }}
                    size="medium"
                    id="paymentType"
                    name='payment_type'
                    value={input.payment_type}
                    onChange={inputHandler}
                    select
                    SelectProps={{
                      native:'true'
                    }}
                    >
                      {paymentTypes.map((paymentType) =>(
                        <option key={paymentType.id} value={paymentType.id}>
                          {paymentType.type}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                    label="Description"
                    fullWidth
                    name='description'
                    multiline
                    rows={2}
                    id="description"
                    value={input.description}
                    onChange={inputHandler}
                    placeholder="Type Here..."
                    sx={{fontSize:'50px'}}
                    />
                  </Grid>
                </Grid>
                
                <DialogActions>
                  {alert.includes('success') &&
                    <Alert sx={{ padding: '0px 16px' }} variant="outlined" severity="success">
                    {alert}
                  </Alert>}
                  {alert && !alert.includes('success') &&
                  <Alert sx={{ padding: '0px 16px' }} variant="outlined" severity="error">
                    {alert}
                  </Alert>}
                   <Button autoFocus variant="contained" size='medium' type='submit' style={{backgroundColor: "#014f86"}} onClick={addExpense}>
                    Add
                   </Button>
                </DialogActions>
                </DialogContent>
              </BootstrapDialog>
              </Box>
            </React.Fragment>
        </Modal>
      </div>
    );
}

export default AddExpenseModal
