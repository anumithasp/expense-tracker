import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { styled, Alert } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
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
    maxWidth: '600px',
    borderRadius: '10px'
  },
  '& .MuiFormLabel-root, & .MuiInputBase-inputMultiline': {
    fontFamily: 'Poppins'
  }
}));


const AddIncomeModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [alert, setAlert] = useState("");

    const [input, setInput] = useState({
      title: '',
      amount: '',
      payer: '',
      payment_type: 1,
      description: '',
      user_id: sessionStorage.getItem("id")
    });

    const [isTitleValid, setIsTitleValid] = useState(true);
    const [isAmountValid, setIsAmountValid] = useState(true);
    const [isPayerValid, setIsPayerValid] = useState(true);

    const inputHandler = (event) => {
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
          setIsAmountValid(true)
        }
      }
      if(event.target.name === "payer"){
        if(event.target.value === ""){
          setIsPayerValid(false);
        } else {
          setIsPayerValid(true);
        }
      }
    };

    const [headers, setHeaders] = useState(
      {
        "Authorization" : "Bearer " + sessionStorage.getItem("token")
      }
    )

    const addIncome = (e) =>{
      console.log(input);
      e.preventDefault();
      if(input.title === "" || input.amount === "" || input.payer === ""){
        input.title === "" && setIsTitleValid(false);
        input.amount === "" && setIsAmountValid(false);
        input.payer === "" && setIsPayerValid(false);
      } else {
        axios.post("http://localhost:8080/addIncome",input,{headers:headers}).then(
          (response)=>{
            console.log(response);
            if(response.status === 201){
              setAlert("Income added successfully!");
              setTimeout(() => {
                setAlert("");
                setInput({
                  title: '',
                  amount: '',
                  payer: '',
                  payment_type: 1,
                  description: '',
                  user_id: sessionStorage.getItem("id")
                });
              },3000)
            }
          }
        ).catch((err)=>{
          setAlert("Somthing went wrong!");
          setTimeout(()=>{
            setAlert("");
          },3000)
        })
      }
    };

    const [paymentTypes, setPaymentTypes] = useState([]);
    useEffect(()=>{
      axios.get("http://localhost:8080/paymentTypes").then(
        (response) => {
          console.log(response.data);
          setPaymentTypes(response.data.paymentTypes);
        }
      ).catch((err)=>{
        console.log(err);
      })
    },[]);
  
    return (
      <div>
        <a className="nav-link" href="#">
            <button onClick={handleOpen} className='btn btn-primary exp-btn-primary'>Add Income </button>
        </a>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
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
                Add Income
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
                    fullWidth
                    required
                    error={!isTitleValid}
                    label="Title"
                    size="medium"
                    id="title"
                    name='title'
                    sx={{ fontFamily: 'Poppins' }}
                    value={input.title}
                    onChange={inputHandler}
                    />
                  </Grid>
                  <Grid item xs={3} sm={4} md={4}>
                    <TextField
                    fullWidth
                    required
                    error={!isAmountValid}
                    label="Amount"
                    size="medium"
                    id="amount"
                    name='amount'
                    type='number'
                    placeholder="0.0"  
                    value={input.amount}
                    onChange={inputHandler}
                    InputProps={ input.amount != '' &&  {
                      startAdornment: <CurrencyRupeeIcon sx={{fontSize:'medium'}}/>
                    }}  
                    />
                  </Grid>
                  <Grid item xs={3} sm={4} md={4}>
                    <TextField
                    fullWidth
                    required
                    error={!isPayerValid}
                    label="Payer"
                    size="medium"
                    id="payer"
                    name='payer'
                    value={input.payer}
                    onChange={inputHandler}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6} md={4}>
                    <TextField
                    label="Payment Type"
                    fullWidth
                    required
                    size="medium"
                    id="paymentType"
                    name='payment_type'
                    sx={{ width: '100%'}}
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
                    placeholder="Type Here..."
                    value={input.description}
                    onChange={inputHandler}
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
                  <Button autoFocus variant="contained" size='large' type='submit' style={{backgroundColor: "#014f86", fontSize:'medium', fontFamily: 'Poppins' }} onClick={addIncome}>
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

export default AddIncomeModal
