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
import { styled } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AddExpenseModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <a className="nav-link" href="#">
            <button onClick={handleOpen} className='btn btn-primary exp-btn-primary'>Add Expense </button>
        </a>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <React.Fragment>
              <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              >
                <DialogTitle 
                sx={{ m: 0, p: 2 , 
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
                <DialogContent>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={3} sm={4} md={3}>
                    Amount
                    <TextField
                    hiddenLabel
                    size="small"
                    />
                  </Grid>
                  <Grid item xs={3} sm={4} md={3}>
                    Gst Rate
                    <TextField
                    size="small"
                    />
                  </Grid>
                  <Grid item xs={3} sm={4} md={3}>
                     Date
                    {/* <TextField
                    size="small"
                    /> */}
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        size="small"
                        label="" 
                        defaultValue={dayjs('2022-04-17')}
                      />
                    </LocalizationProvider>
                    
                  </Grid>  
                  <Grid item xs={3} sm={4} md={3}>
                    Time
                    {/* <TextField
                    size="small"
                    />  */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        size="small"
                        label="" 
                        defaultValue={dayjs('2022-04-17T15:30')}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={3} sm={4} md={3}>
                    Payee
                    <TextField
                    size="small"
                    />
                  </Grid>
                  <Grid item xs={3} sm={4} md={3}>
                    Catogory
                    <TextField
                    size="small"
                    />
                  </Grid>
                  <Grid item xs={3} sm={4} md={3}>
                    Payment Type
                    <TextField
                    size="small"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    Description
                    <TextField
                    fullWidth
                    hiddenLabel
                    multiline
                    id="standard-size-small"
                    defaultValue="Type Here...."
                    />
                  </Grid>
                </Grid>
                <br />
                <DialogActions>
                   <Button autoFocus variant="contained" size='medium' style={{backgroundColor: "#014f86"}} onClick={handleClose}>
                    Update
                   </Button>
                </DialogActions>
                </DialogContent>
                {/* <DialogActions>
                   <Button autoFocus variant="contained" size='medium' style={{backgroundColor: "#014f86"}} onClick={handleClose}>
                    Update
                   </Button>
                </DialogActions> */}
              </BootstrapDialog>
            </React.Fragment>
          </Box>
        </Modal>
      </div>
    );
}

export default AddExpenseModal
