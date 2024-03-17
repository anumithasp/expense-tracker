import React from 'react'
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

    const [amount, setAmount] = React.useState('00.00');
    // const [gstRate, setGstRate] = React.useState(5);

    const gstRates = [
      {
        value: '500.78',
        label: '5%($00.00)',
      },
      {
        value: '1008.9',
        label: '10%($00.00)',
      },
      {
        value: '2089',
        label: '15%($00.00)',
      },
      {
        value: '3500.90',
        label: '20%($00.00)',
      },
    ];

    const categories = [
      'Education',
      'Food',
      'Shopping',
      'Travel',
      'Grocery',
      'Vehicle Expenses',
      'Insurance',
      'Gifts',
    ];

    const paymentTypes = [
      'UPI Payment', 
      'Cash Payment',
      'Card Payment'
    ];

    const handleAmountChange = (event) => {
      setAmount(event.target.value);
    };

    
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
                    value={amount}
                    // defaultValue="$00.00"
                    InputProps={{
                      startAdornment: <span>$</span>
                    }}
                    onChange={handleAmountChange}
                    sx={{ width: '100%'}}
                    />
                    </FormControl>
                  </Grid>

                  <Grid item xs={3} sm={4} md={3}>
                    <InputLabel  htmlFor="rate">
                      GST Rate
                    </InputLabel>
                    <TextField
                    id="rate"
                    size="medium"
                    select
                    defaultValue="500.78"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {gstRates.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                    ))}
                    </TextField> 
                  </Grid>

                  <Grid item xs={3} sm={4} md={3} >
                  <InputLabel htmlFor="date">
                    Date
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    renderInput={(params) => (
                    <TextField
                    {...params}
                    size="small"
                    id="date"
                    sx={{ width: 'small'}} 
                   />)}
                   />
                  </LocalizationProvider>
                  </Grid> 

                  <Grid item xs={3} sm={4} md={3}>
                    <InputLabel  htmlFor="time">
                      Time
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                      renderInput={(params) => (
                      <TextField
                      {...params}
                      size="small"
                      id="time"
                      sx={{ width: '20%',fontSize:'xx-small'}}
                      />
                      )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={4} sm={6} md={4}>
                    <InputLabel  htmlFor="payee">
                      Payee
                    </InputLabel>
                    <TextField
                    size="small"
                    id="payee"
                    defaultValue="Melvin Thomas"
                    />
                  </Grid>
                  <Grid item xs={4} sm={6} md={4}>
                    <InputLabel  htmlFor="category">
                      Category
                    </InputLabel>
                    <TextField
                    size="small"
                    id="category"
                    select
                    defaultValue="Education"
                    SelectProps={{
                      native:'true'
                    }}
                    >
                      {categories.map((category) => (
                      <option key={category} value={category}>
                      {category}
                      </option>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={4} sm={6} md={4}>
                    <InputLabel  htmlFor="payment-type">
                      Payment Type
                    </InputLabel>
                    <TextField
                    size="small"
                    id="payment-type"
                    select
                    defaultValue="UPI Payment"
                    SelectProps={{
                      native:'true'
                    }}
                    >
                      {paymentTypes.map((paymentType) =>(
                        <option key={paymentType} value={paymentType}>
                          {paymentType}
                        </option>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <InputLabel  htmlFor="description">
                      Description
                    </InputLabel>
                    <TextField
                    fullWidth
                    multiline
                    rows={2}
                    id="description"
                    placeholder="Type Here..."
                    sx={{fontSize:'50px'}}
                    />
                  </Grid>
                </Grid>
                
                <DialogActions>
                   <Button autoFocus variant="contained" size='medium' style={{backgroundColor: "#014f86"}} onClick={handleClose}>
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
