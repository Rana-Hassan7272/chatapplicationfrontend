import React from 'react';
import AdminLayout from './AdminLayout';
import { Container, Paper, Typography, Stack } from '@mui/material';
import { AdminPanelSettings as AdminPanelSettingsIcon, Notifications as NotificationsIcon, Group as GroupIcon, Person as PersonIcon, Message as MessageIcon } from '@mui/icons-material';
import moment from 'moment';
import { CurveButton, SearchFeild } from '../../components/VisualHidden';
import LineChart from '../../charts/LineChart';
import DoughnutChart from '../../charts/DoughnutChart';
import { useFetchData } from '6pp';
import { server } from '../../redux/server';
import { useErrors } from '../../hooks/hooks';
import LayoutLoader from '../../layout/LayoutLoader';
import { useMyAdminQuery } from '../../redux/api/api';


const Dashboard = () => {
  const { data, isError, error, isLoading } = useMyAdminQuery();
  const stats = data?.stats || {};

  useErrors([{ isError, error }]);

  const Appbar = () => (
    <Paper elevation={3} sx={{ padding: '2rem', margin: '2rem', borderRadius: '1rem' }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <AdminPanelSettingsIcon />
        <SearchFeild placeholder="Search" />
        <CurveButton>Search</CurveButton>
        <Typography>{moment().format('MMM Do YYYY, h:mm:ss a')}</Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const Widgets = () => (
    <Stack direction="row" spacing={2} sx={{ margin: '2rem' }}>
      <Widget title="Users" icon={<PersonIcon />} value={stats.userCount || 0} />
      <Widget title="Groups" icon={<GroupIcon />} value={stats.groupsCount || 0} />
      <Widget title="Messages" icon={<MessageIcon />} value={stats.messagesCount || 0} />
    </Stack>
  );

  return isLoading ? (
    <LayoutLoader />
  ) : (
    <AdminLayout>
      <Container>
        {Appbar()}
        <Stack direction={{ xs: 'column', sm: 'row' }} flexWrap="wrap" sx={{ margin: '2rem', gap: '2rem', padding: '2rem', borderRadius: '1rem', backgroundColor: '#f5f5f5' }} justifyContent="center" alignItems={{ xs: 'center', lg: 'stretch', md: 'center' }}>
          <Paper sx={{ padding: '2rem', marginBottom: '2rem', borderRadius: '1rem' }}>
            <Typography variant="h6">Last messages</Typography>
            <LineChart value={stats.messagesChart || []} />
          </Paper>
          <Paper sx={{ padding: '2rem', borderRadius: '1rem', height: '20rem', maxWidth: '20rem', width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <DoughnutChart values={[stats.chatCount - stats.groupsCount || 0, stats.groupsCount || 0]} labels={['Single Chats', 'Double Chats']} />
            <Stack direction="row" alignItems="center" spacing={2} sx={{ position: 'absolute', bottom: '2rem' }}>
              <GroupIcon />
              <Typography>Or</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        <Widgets />
      </Container>
    </AdminLayout>
  );
};


const Widget = ({ value, icon, title }) => (
  <Stack direction="column" alignItems="center" spacing={1} sx={{ width: '100%', borderRadius: '1rem', backgroundColor: '#e0e0e0', padding: '1rem' }}>
    <Paper elevation={3} sx={{ padding: '1rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}>
      <Typography variant="h4">{value}</Typography>
    </Paper>
    {icon}
    <Typography variant="body1">{title}</Typography>
  </Stack>
);

export default Dashboard;