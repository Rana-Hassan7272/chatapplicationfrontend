import React, { useEffect, useState } from 'react';
import { Avatar, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useInputValidation } from '6pp';
import  {adminLogin, adminGet } from '../../redux/api/admin.js';



const AdminLogin = () => {
  const {isAdmin}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
 
  const secretKey = useInputValidation("");
  const navigate = useNavigate();
  

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("submit");
    dispatch(adminLogin(secretKey.value))
    if (isAdmin) {
     return navigate("/admin/dashboard")
    }
  };
useEffect(()=>{
dispatch(adminGet())
},[dispatch])
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 2, marginTop: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Admin Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={secretKey.value}
            onChange={secretKey.changeHandler}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
