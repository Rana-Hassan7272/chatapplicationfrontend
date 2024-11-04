import {
  Grid,
  IconButton,
  Tooltip,
  Box,
  Drawer,
  Stack,
  Typography,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  Menu as MenuIcon,
  Done as DoneIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AvatarCard from '../dialogue/AvatarCard';
import { ChatSampleData, UserData } from '../assets/sample/ChatSampleData';
import UserItem from '../dialogue/UserItem';
import {
  useAddGroupMemberMutation,
  useDeleteGroupMutation,
  useMyChatsDetailsQuery,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from '../redux/api/api';
import { asyncMutation, useErrors } from '../hooks/hooks';
import LayoutLoader from '../layout/LayoutLoader';
import { useDispatch } from 'react-redux';
import { setIsAddMember } from '../redux/misc';

const AddGroup = lazy(() => import('../dialogue/AddGroup'));
const DeleteGroup = lazy(() => import('../dialogue/DeleteGroup'));

export default function Group() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [isLoadingUpdateGroup, updateGroupData, updateGroup] = asyncMutation(
    useRenameGroupMutation
  );
  const [updateGroupName, setUpdateGroupName] = useState('');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoadingRemoveMember, removeMemberData, removeMember] = asyncMutation(
    useRemoveGroupMemberMutation
  );
  const [isLoadingDeleteGroup, deleteGroupData, deleteGroup] = asyncMutation(
    useDeleteGroupMutation
  );
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [members, setMembers] = useState('');

  const chatId = useSearchParams()[0].get('group');
 
  const myGroups = useMyGroupsQuery('');

  const groupDetails = useMyChatsDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const errors = [
    { isError: myGroups.isError, error: myGroups.error },
    { isError: groupDetails.isError, error: groupDetails.error },
  ];
  useErrors(errors);

  const handleOpenDelete = () => setIsDeleteOpen(true);
  const handleCloseDelete = () => {
    deleteGroup("Delete group..",chatId)
    setIsDeleteOpen(false);
  }
  const handleAddMember = () => {
    dispatch(setIsAddMember(true));
    setIsMemberOpen(true);
  };
  const handleRemoveMember = (memberId) => {
    removeMember("Removing member...", { chatId, userId: memberId });
  };

  const handleCloseMember = () => {
    dispatch(setIsAddMember(false));
  };

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
  const handleUpdateGroupName = () => {
    updateGroup("Renaming group...", { chatId, name: updateGroupName });
  };

  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails.data.chat.name);
      setUpdateGroupName(groupDetails.data.chat.name);
      setMembers(groupDetails.data.chat.members);
    }
    return () => {
      setGroupName('');
      setUpdateGroupName('');
      setMembers([]);
      setIsEditing(false);
    };
  }, [groupDetails]);

  const backButton = (
    <Stack>
      <Box
        sx={{ display: { sm: 'block', xs: 'none' }, position: 'fixed', top: '1rem', right: '1rem' }}
      >
        <IconButton onClick={handleMenuToggle}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title='Back'>
        <IconButton
          sx={{ position: 'absolute', top: '1rem', left: '1rem' }}
          onClick={() => navigate('/')}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );

  const groupNameDisplay = (
    <Stack sx={{ position: 'absolute', top: '3rem', textAlign: 'center' }}>
      {isEditing ? (
        <Stack direction='row' spacing={1} alignItems='center'>
          <TextField
            label='Group Name'
            value={updateGroupName}
            onChange={(e) => setUpdateGroupName(e.target.value)}
          />
          <IconButton onClick={handleUpdateGroupName}>
            <DoneIcon />
          </IconButton>
        </Stack>
      ) : (
        <Stack direction='row' spacing={1} alignItems='center'>
          <Typography variant='h4'>{groupName}</Typography>
          <IconButton onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );

  const actionButtons = (
    <Stack
      direction={{ xs: 'column-reverse', sm: 'row' }}
      spacing={'1rem'}
      padding={{ xs: '0', sm: '1rem', md: '1rem 4rem' }}
    >
      <Button size='large' variant='contained' onClick={handleAddMember}>
        Add Members <AddIcon />
      </Button>
      <Button size='large' color='error' onClick={handleOpenDelete}>
        Delete <DeleteIcon />
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        sm={4}
        xs={0}
        display={{ xs: 'none', sm: 'block' }}
        sx={{ bgcolor: 'grey.200', boxShadow: 3, borderRadius: 2, padding: 2 }}
      >
        <GroupList groups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>
      <Grid
        item
        sm={8}
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: '1rem 3rem',
          bgcolor: 'background.paper',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        {backButton}
        {groupNameDisplay}
        <Box sx={{ marginTop: '8rem', alignSelf: 'flex-start' }}>
          <Typography variant='body1' margin={'2rem'}>
            Members
          </Typography>
          <Stack
            maxWidth={'45rem'}
            width={'60vh'}
            boxSizing={'border-box'}
            padding={{ sm: '1rem', xs: '0', md: '1rem 4rem' }}
            height={'50vh'}
            overflow={'auto'}
            spacing={'2rem'}
            bgcolor={'rgba(211,211,211,1)'}
            sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}
          >
            {isLoadingRemoveMember?<CircularProgress/>: groupDetails?.data?.chat?.members?.map((member) => (
              <UserItem
                user={member}
                key={member._id}
                removeMember={handleRemoveMember}
                styling={{
                  boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)',
                  padding: '1rem 2rem',
                  borderRadius: '1rem',
                }}
                isAdded
              />
            ))}
          </Stack>
          {actionButtons}
        </Box>
      </Grid>
      {isMemberOpen && (
        <Suspense fallback={<Backdrop open={true} />}>
          <AddGroup chatId={chatId} handleClose={handleCloseMember} />
        </Suspense>
      )}
      {isDeleteOpen && (
        <Suspense fallback={<Backdrop open={true} />}>
          <DeleteGroup
            open={isDeleteOpen}
            handleClose={handleCloseDelete}
            deleteHandler={handleCloseDelete}
          />
        </Suspense>
      )}
      <Drawer anchor='right' open={isMenuOpen} onClose={handleMenuToggle} sx={{ width: '50vw' }}>
        <Box sx={{ width: '50vw', boxShadow: 3, bgcolor: 'grey.200' }}>
          <GroupList groups={myGroups?.data?.groups} chatId={chatId} />
        </Box>
      </Drawer>
    </Grid>
  );
}

const GroupList = ({ groups = [], chatId }) => (
  <Stack spacing={2} sx={{ padding: 2 }}>
    {groups.length > 0 ? (
      groups.map((group) => <GroupListItem key={group._id} group={group} chatId={chatId} />)
    ) : (
      <Typography textAlign='center'>No Groups</Typography>
    )}
  </Stack>
);

const GroupListItem = ({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
  to={`?group=${_id}`} // Corrected with backticks and curly braces
  style={{ textDecoration: 'none', color: 'inherit' }}
  onClick={(e) => {
    if (chatId === _id) {
      e.preventDefault();
    }
  }}
>
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)',
          cursor: 'pointer',
          bgcolor: 'white',
        }}
      >
        <AvatarCard name={name} avatar={avatar} />
      </Stack>
    </Link>
  );
};
