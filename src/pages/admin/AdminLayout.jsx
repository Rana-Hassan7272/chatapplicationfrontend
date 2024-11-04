import { Grid, Box, IconButton, Drawer, Typography, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Menu as MenuIcon, Close as CloseIcon, Dashboard as DashboardIcon, ExitToApp as ExitToAppIcon, ManageAccounts as ManageAccountsIcon, Group as GroupIcon, Message as MessageIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogOut } from '../../redux/api/admin';

const Link = styled(RouterLink)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const adminTabs = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: <DashboardIcon />
  },
  {
    name: 'Users',
    path: '/admin/users',
    icon: <ManageAccountsIcon />
  },
  {
    name: 'Chats',
    path: '/admin/chats',
    icon: <GroupIcon />
  },
  {
    name: 'Messages',
    path: '/admin/messages',
    icon: <MessageIcon />
  }
];

const Sidebar = ({ w = '100%' }) => {
  const location = useLocation();
  const dispatch=useDispatch()

  const logOutHandler = () => {
    dispatch(adminLogOut())
    console.log('Logout');
  };

  return (
    <Stack direction={'column'} spacing={'1rem'} sx={{ width: w }}>
      <Typography variant='body1' textTransform={'uppercase'}>Admin</Typography>
      <Stack spacing={'1rem'}>
        {adminTabs.map(i => (
          <Link key={i.path} to={i.path}>
            <Stack alignItems={'center'} direction={'row'} spacing={'1rem'} sx={{ bgcolor: location.pathname === i.path ? 'black' : 'transparent', color: location.pathname === i.path ? 'white' : 'black' }}>
              {i.icon}
              <Typography>{i.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link to="#" onClick={logOutHandler}>
          <Stack alignItems={'center'} direction={'row'} spacing={'1rem'}>
            <ExitToAppIcon />
            <Typography>Log Out</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const {isAdmin}=useSelector(state=>state.auth)
 
  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();
  const handleMenu = () => setIsMenu(!isMenu);
  const handleClose = () => setIsMenu(false);


  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  return (
    <Grid container minHeight={'100vh'}>
      <Box sx={{ display: { md: 'block', sm: 'none' }, position: 'fixed', top: '1rem', right: '1rem' }}>
        <IconButton onClick={handleMenu}>
          {isMenu ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid item lg={3} md={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Sidebar />
      </Grid>
      <Grid item lg={9} md={8} sx={{ bgcolor: '#f5f5f5' }}>
        {children}
      </Grid>
      <Drawer open={isMenu} onClose={handleClose}>
        <Sidebar w={'50vw'} />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
