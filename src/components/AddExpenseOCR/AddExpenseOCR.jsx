import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
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
import { styled } from '@mui/material';

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

const AddExpenseOCR = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [image, setImage] = useState(null);
    const [ocrText, setOcrText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const recognizeText = async () => {
        if (!image) return;

        // const worker = await createWorker("eng");

        // await worker.load();
        // await worker.loadLanguage('eng');
        // await worker.initialize('eng');

        // const { data: { text } } = await worker.recognize(image);
        // setOcrText(text);

        // await worker.terminate();

        setLoading(true);

        const formData = new FormData();
        formData.append('file', image);
        formData.append('apikey', 'K87547277088957');

        try {
            const response = await fetch('https://api.ocr.space/parse/image', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data && data.ParsedResults && data.ParsedResults.length > 0) {
                setOcrText(data.ParsedResults[0].ParsedText);
            }
        } catch (error) {
            console.error('Error recognizing text:', error);
        }

        setLoading(false);
    };

    return (
        <div>
            <a className="nav-link" href="#">
            <button onClick={handleOpen} className='btn btn-primary exp-btn-primary'>Add OCR</button>
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
                                fullWidth
                                required
                                size="medium"
                                id="image"
                                name='image'
                                type='file'
                                accept="image/*"
                                onChange={handleImageChange}
                                />
                            </Grid>
                            <Grid item xs={3} sm={4} md={4}>
                                <Button disabled={loading} autoFocus variant="contained" size='medium' type='button' style={{backgroundColor: "#014f86"}} onClick={recognizeText}>
                                    Recognize Text
                                </Button>
                                {loading && <p>Loading...</p>}
                            </Grid>
                            {ocrText && (
                                <Grid item xs={12} sm={12} md={12}>
                                    <div>
                                        <h2>Recognized Text:</h2>
                                        <p>{ocrText}</p>
                                    </div>
                                </Grid>
                            )}
                        </Grid>
                    <DialogActions>
                    <Button autoFocus variant="contained" size='medium' type='submit' style={{backgroundColor: "#014f86"}}>
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
};

export default AddExpenseOCR;
