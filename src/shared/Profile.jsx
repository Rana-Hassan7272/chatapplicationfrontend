import React from 'react';
import { Stack, Avatar, Typography, Paper } from '@mui/material';
import { AccountCircle as UsernameIcon, Face as FaceIcon, CalendarToday as CalendarIcon } from '@mui/icons-material';
import moment from 'moment';
import { transformImg } from '../libs/FileFormat';

const Profile = ({ user }) => {
  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  const avatarUrl = transformImg(user?.avatar?.url);
  const username = user.username || "No username available";
  const bio = user?.bio || "No bio available";
  const joinedDate = user?.createdAt ? moment(user.createdAt).fromNow() : "Unknown";

  return (
    <Stack direction="column" spacing={4} alignItems="center" sx={{ width: '100%', padding: 3 }}>
      <Avatar
        src={avatarUrl}
        sx={{
          width: 120,
          height: 120,
          border: '4px solid #1976d2',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
        alt="User Avatar"
      />
      <Stack spacing={3} sx={{ width: '100%' }}>
        <ProfileCard
          text={bio}
          heading="Self Detail"
          icon={<FaceIcon sx={{ color: '#1976d2', fontSize: 30 }} />}
        />
        <ProfileCard
          text={username}
          heading="Username"
          icon={<UsernameIcon sx={{ color: '#1976d2', fontSize: 30 }} />}
        />
        <ProfileCard
          text={joinedDate}
          heading="Joined"
          icon={<CalendarIcon sx={{ color: '#1976d2', fontSize: 30 }} />}
        />
      </Stack>
    </Stack>
  );
};

const ProfileCard = ({ heading, text, icon }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        padding: 3,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
        },
        width: '100%',
      }}
    >
      <Stack sx={{ marginRight: 2 }}>{icon}</Stack>
      <Stack>
        <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 400 }}>
          {text}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
          {heading}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default Profile;
