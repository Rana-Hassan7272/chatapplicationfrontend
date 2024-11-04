import React, { lazy, Suspense, useState } from 'react';
import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { userNotExist } from '../redux/authSlice';
import { server } from '../redux/server';
import { setIsMobile, setIsNewGroup, setIsNewNotification, setIsSearch } from '../redux/misc';
import { resetNotification } from '../redux/api/chat';

const NewGroup = lazy(() => import("../dialogue/NewGroup"));
const Notification = lazy(() => import("../dialogue/Notification"));
const SearchBar = lazy(() => import("../dialogue/SearchBar"));

const Header = () => {
  const { isSearch, isNotification ,isNewGroup} = useSelector((state) => state.misc);
  const { countNotification } = useSelector((state) => state.chat);
  let navigate = useNavigate();
  const dispatch = useDispatch();
 

  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const handleSearch = () => {
    dispatch(setIsSearch(true));
  };

  const newGroup = () => {
    dispatch(setIsNewGroup(true))
  };

  const navigateGroup = () => {
    navigate("/group");
  };

  const notificationHandle = () => {
    dispatch(setIsNewNotification(true));
    dispatch(resetNotification());
  };

  const logOutHandle = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, { withCredentials: true });
      dispatch(userNotExist());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong during logout");
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundImage: 'linear-gradient(145deg, #6368ea, #ac8ffa, #fdcfe8)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
            transform: 'translateZ(0)',
            backgroundSize: '400% 400%',
            animation: 'gradientAnimation 15s ease infinite',
            borderRadius: '12px',
            padding: '0.5rem',
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 'bold',
                fontSize: '1.6rem',
                letterSpacing: '1px',
                color: '#fff',
              }}
            >
              Home
            </Typography>
            <Box>
              <IcnBtn title="Menu" icon={<MenuIcon />} onClick={handleMobile} />
              <IcnBtn title="Search" icon={<SearchIcon />} onClick={handleSearch} />
              <IcnBtn title="Add New Group" icon={<AddIcon />} onClick={newGroup} />
              <IcnBtn title="Groups" icon={<GroupIcon />} onClick={navigateGroup} />
              <IcnBtn title="Notifications" icon={<NotificationsIcon />} onClick={notificationHandle} value={countNotification} />
              <IcnBtn title="Log Out" icon={<LogoutIcon />} onClick={logOutHandle} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<div><Backdrop open /></div>}>
          <SearchBar />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<div><Backdrop open /></div>}>
          <Notification />
        </Suspense>
      )}
      {newGroup && (
        <Suspense fallback={<div><Backdrop open /></div>}>
          <NewGroup />
        </Suspense>
      )}
    </>
  );
};

const IcnBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        color="inherit"
        onClick={onClick}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'scale(1.05)',
            transition: 'transform 0.2s ease',
          },
        }}
      >
        {value ? (
          <Badge badgeContent={value} color="secondary">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
