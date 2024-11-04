import React from 'react';
import AppLayout from '../layout/AppLayout';
import { Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <div>
      <Box bgcolor="rgba(247, 247, 247, 1)" height="100%">
        <Typography variant="h5" textAlign="center" p="2rem">
          Select a friend to chat
        </Typography>
      </Box>
    </div>
  );
};

export default AppLayout(Home);
