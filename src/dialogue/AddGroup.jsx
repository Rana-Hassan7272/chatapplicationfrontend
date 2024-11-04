import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import UserItem from './UserItem';
import { UserData } from '../assets/sample/ChatSampleData';
import { useDispatch, useSelector } from 'react-redux';
import { useAddGroupMemberMutation, useAvalaibleFriendsQuery } from '../redux/api/api';
import { asyncMutation, useErrors } from '../hooks/hooks';
import { setIsAddMember } from '../redux/misc';

const AddGroup = ({  chatId ,handleClose}) => {
  const dispatch = useDispatch();
  const [members, setMembers] = useState(UserData);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const [isLoadingAddMember, addMemberData, addMember] = asyncMutation(useAddGroupMemberMutation);
  const { isAddMember } = useSelector((state) => state.misc);
  const { isLoading, data, error, isError } = useAvalaibleFriendsQuery(chatId);
 

  const handler = (_id) => {
    setSelectedMembers((prev) =>
      prev.includes(_id) ? prev.filter((curr) => curr !== _id) : [...prev, _id]
    );
  };

  const handleCloseMemberGroup = () => {
    dispatch(setIsAddMember(false));
  };

  useErrors([{ error, isError }]);

  const submitHandler = () => {
    addMember("Adding member...", { chatId, members: selectedMembers });
  };

  return (
    <Dialog open={isAddMember} onClose={handleCloseMemberGroup}>
      <Stack p={'2rem'} spacing={'1rem'}>
        <DialogTitle>Add Members</DialogTitle>
        <Stack spacing={'1rem'}>
          {isLoading ? (
            <Skeleton />
          ) : data?.availableFriends?.length > 0 ? (
            data?.availableFriends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={handler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography variant='body1' textAlign={'center'}>
              No friends
            </Typography>
          )}
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
          <Button onClick={handleCloseMemberGroup} color='error' variant='outlined'>
            Cancel
          </Button>
          <Button onClick={submitHandler} variant='contained' disabled={isLoadingAddMember}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddGroup;
