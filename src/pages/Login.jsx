import React, { useState } from 'react';
import { Avatar, Button, Container, IconButton, Paper, TextField, Typography, Stack } from '@mui/material';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import { VisualHidden } from '../components/VisualHidden';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { ValidatorUsername } from '../utils/ValidatorUsername';
import { toast, Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { userExist } from '../redux/authSlice.js';
import { server } from '../redux/server.js';

export default function Login() {
  const avatar = useFileHandler('single');
  const username = useInputValidation(ValidatorUsername);
  const password = useStrongPassword();
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to login view
  const [isLoading,setIsLoading]=useState(false)

  // Sign Up Handler
  const handleSignUp = async (e) => {
    const toastId=toast.loading("Logging in...")
    e.preventDefault();
    if (!avatar.file) {
      return toast.error("Please upload an avatar");
    }
    setIsLoading(true)
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    formData.append("bio", bio.value);

    try {
      const { data } = await axios.post(`${server}/api/v1/user/new`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(data)
      dispatch(userExist(data.user));
      toast.success(data.message,{id:toastId});
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something wents wrong");
    }
    finally{
      setIsLoading(false)
    }
  };

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId=toast.loading("Logging in...")
    setIsLoading(false)
    try {
      const { data } = await axios.post(`${server}/api/v1/user/login`, {
        username: username.value,
        password: password.value,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(userExist(data.user));
      toast.success(data.message,{id:toastId});
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    finally{
      setIsLoading(false)
    }
  };

  // Toggle between login and signup views
  const toggleSignup = () => {
    setIsLoggedIn(prev => !prev);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 2, marginTop: 8 }}>
        {isLoggedIn ? (
          <>
            <Typography variant="h5" component="h1" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                required
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username.value || ''}
                onChange={username.changeHandler}
                error={!!username.error}
                helperText={username.error}
              />
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password.value || ''}
                onChange={password.changeHandler}
                error={!!password.error}
                helperText={password.error}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                disabled={isLoading}
              >
                Login
              </Button>
              <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                Or
              </Typography>
              <Button
                fullWidth
                variant="text"
                color="secondary"
                onClick={toggleSignup}
                disabled={isLoading}
              >
                Sign Up
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5" component="h1" gutterBottom>
              Sign Up
            </Typography>
            <Stack alignItems="center">
              <Avatar sx={{ width: 100, height: 100 }} src={avatar.preview} />
              <IconButton component="label">
                <CameraAltIcon />
                <VisualHidden type="file" onChange={avatar.changeHandler} />
              </IconButton>
              {avatar.error && (
                <Typography variant="caption" color="error">
                  {avatar.error}
                </Typography>
              )}
            </Stack>
            <form onSubmit={handleSignUp}>
              <TextField
                required
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username.value || ''}
                onChange={username.changeHandler}
                error={!!username.error}
                helperText={username.error}
              />
              <TextField
                required
                fullWidth
                label="Bio"
                variant="outlined"
                margin="normal"
                value={bio.value || ''}
                onChange={bio.changeHandler}
                error={!!bio.error}
                helperText={bio.error}
              />
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password.value || ''}
                onChange={password.changeHandler}
                error={!!password.error}
                helperText={password.error}
              />
              <TextField
                required
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                value={name.value || ''}
                onChange={name.changeHandler}
                error={!!name.error}
                helperText={name.error}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                disabled={isLoading}
              >
                Register
              </Button>
              <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                Or
              </Typography>
              <Button
                fullWidth
                variant="text"
                color="secondary"
                onClick={toggleSignup}
                disabled={isLoading}
              >
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
      <Toaster position='bottom-center' />
    </Container>
  );
}
