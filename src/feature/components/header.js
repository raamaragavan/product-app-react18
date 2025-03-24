// Header.js
import React, { useState } from 'react';
import '../styles/header.css';
import Button from '../library/Button';
import MDialog from '../library/Mdialog';
import ProductSearch from './product-search';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router';


function Header() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const props = { className: 'pull-right', id: 'subscribe-btn' };
  const dialogProps = {
    title: 'Subscribe',
    textContent: 'To subscribe to this app, please enter your email address and mobile number here. We will send updates occasionally',
    dialogAction: true,
    cancelText: 'Cancel',
    actionText: 'Subscribe',
    dialogSlotProps: {
      paper: {

      },
    }
  };

  function resetDialogForm() {
    setEmail(null);
    setMobileNumber(null);
    setEmailError(false);
    setMobileNumberError(false);
  }

  const handleEmailChange = e => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handleMobileNumberChange = e => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    setMobileNumber(e.target.value);
    if (onlyNums.length !== 10 || !e.target.validity.valid) {
      setMobileNumberError(true);
    } else if (e.target.validity.valid && onlyNums.length === 10) {
      const number = onlyNums.replace(
        /(\d{3})(\d{3})(\d{4})/,
        '($1) $2-$3'
      );
      setMobileNumber(number);
      setMobileNumberError(false);
    }
  };

  const handleSubscribeDialogOpen = () => {
    setOpen(true);
  };

  const handleSubscribeDialogClose = () => {
    setOpen(false);
    resetDialogForm();
  };

  const handleSubmitForm = () => {
    if (!email) {
      setEmailError(true);
    }
    if (!mobileNumber) {
      setMobileNumberError(true)
    }
    const isFormInValid = emailError || mobileNumberError || !email || !mobileNumber;
    if (!isFormInValid) {
      const formData = {
        email: email,
        mobileNumber: mobileNumber
      };
      console.log('formData', formData);
      handleSubscribeDialogClose();
    }
  }

  return (
    <header className="navbar">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 2, md: 2 }}>
            <div className="center-left-flex plr-10">
              <Link to={`/`}> Product App</Link>
            </div>
          </Grid>
          <Grid size={{ xs: 6, md: 8 }}>
            <div className="center-flex">
              <ProductSearch />
            </div>
          </Grid>
          <Grid size={{ xs: 2, md: 2 }}>
            <div className="center-right-flex plr-10">
              <Button {...props} onClick={handleSubscribeDialogOpen} id="subscribe-btn">Subscribe</Button>
            </div>
          </Grid>
        </Grid>
      </Box>
      <MDialog id="custom-m-dialog" openDialog={open} onClose={handleSubscribeDialogClose} dialogCancel={handleSubscribeDialogClose} dialogSuccess={handleSubmitForm} {...dialogProps}>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '60ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "Please Enter valid email" : ""}
            required
            id="email"
            name="email"
            label="Email Address"
            type="email"
          />
          <TextField
            onChange={handleMobileNumberChange}
            error={mobileNumberError}
            helperText={mobileNumberError ? "Please Enter valid Mobile Number(Enter 10 digits)" : ""}
            required
            id="mobile"
            label="Mobile Number"
            name="Mobile Number"
            type="number"
          />
        </Box>
      </MDialog>
    </header>
  );
}
export default Header;