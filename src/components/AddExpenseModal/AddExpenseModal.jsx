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
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, alpha,styled } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { DateField } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'

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
}));

const AddExpenseModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [input, setInput] = useState({
      amount: 0.0,
      gst: 0,
      date: new Date(),
      payee: '',
      category: 1,
      paymentType: 1,
      description: ''
    });

    const inputHandler= (event)=> {
      setInput({...input,[event.target.name]:event.target.value});
  
    }

    const addExpense = (event) =>{
      console.log(input);
    }
  
    const [categories, setCategories] = useState([]);
    const [paymentTypes, setPaymentTypes] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:8080/categories").then(
              (response)=>{
                  console.log(response.data);
                  setCategories(response.data.categories);
              }
            ).catch((err)=> {
              console.log(err);
            })
      axios.get("http://localhost:8080/paymentTypes").then(
        (response)=>{
            console.log(response.data);
            setPaymentTypes(response.data.paymentTypes);
        }
      ).catch((err)=> {
        console.log(err);
      })
    },[])



    
    return (
      <div >
        <a className="nav-link" href="#">
            <button onClick={handleOpen} className='btn btn-primary exp-btn-primary'>Add Expense </button>
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
                  color:'white',
                  fontSize:'medium'
                }} 
                id="customized-dialog-title">
                  Add New Expenses
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
                  <Grid item xs={3} sm={4} md={3}>
                    <InputLabel  htmlFor="amount">
                     Amount
                    </InputLabel>
                    <FormControl variant="standard">
                    <TextField
                    size="medium"
                    id="amount"
                    name='amount'
                    value={input.amount}
                    onChange={inputHandler}
                    placeholder="0.0"  
                    InputProps={{
                      startAdornment: <CurrencyRupeeIcon sx={{fontSize:'medium'}}/>
                    }}
                    sx={{ width: '100%'}}
                    />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3} sm={4} md={3}>
                    <InputLabel  htmlFor="gst">
                      GST Rate
                    </InputLabel>
                    <TextField
                    id="gst"
                    size="medium"
                    name='gst'
                    value={input.gst}
                    onChange={inputHandler}
                    placeholder="0%"
                    >
                  
                    </TextField> 
                  </Grid>

                  <Grid item xs={3} sm={4} md={3} >
                  <InputLabel htmlFor="date">
                    Date
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                      <DatePicker
                      name='date' 
                      value={input.date}
                      onChange={inputHandler} />
                  </DemoContainer>
                  </LocalizationProvider>
                  </Grid> 

                  

                  <Grid item xs={4} sm={6} md={4}>
                    <InputLabel  htmlFor="payee">
                      Payee
                    </InputLabel>
                    <TextField
                    size="small"
                    id="payee"
                    name='payee'
                    value={input.payee}
                    onChange={inputHandler}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6} md={4}>
                    <InputLabel  htmlFor="category">
                      Category
                    </InputLabel>
                    <TextField
                    size="small"
                    id="category"
                    name='category'
                    value={input.category}
                    onChange={inputHandler}
                    select
                    defaultValue="Education"
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
                    <InputLabel  htmlFor="paymentType">
                      Payment Type
                    </InputLabel>
                    <TextField
                    size="small"
                    id="paymentType"
                    name='paymentType'
                    value={input.paymentType}
                    onChange={inputHandler}
                    width='100%'
                    select
                    defaultValue="UPI Payment"
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
                    <InputLabel  htmlFor="description">
                      Description
                    </InputLabel>
                    <TextField
                    name='description'
                    fullWidth
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
                   <Button autoFocus variant="contained" size='medium' style={{backgroundColor: "#014f86"}} onClick={addExpense}>
                    Update
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
