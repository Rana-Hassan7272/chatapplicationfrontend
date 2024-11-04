import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { useInputValidation } from '6pp';
import UserItem from './UserItem';
import { UserData } from '../assets/sample/ChatSampleData';
import { useAvalaibleFriendsQuery, useNewGroupDetailsMutation } from '../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { asyncMutation, useErrors } from '../hooks/hooks';
import LayoutLoader from '../layout/LayoutLoader';
import { setIsNewGroup } from '../redux/misc';
import toast from 'react-hot-toast';


const NewGroup = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoadingGroupDetails,groupDetailsData,groupDetails] = asyncMutation(useNewGroupDetailsMutation)
  const { isNewGroup } = useSelector((state) => state.misc);

  const submitHandler = async () => {
    if (!groupCheck.value.trim()) {
      toast.error("Group name is required");
      return;
    }
    
    if (selectedMembers.length < 2) {
      toast.error("Group must have at least 3 members");
      return;
    }
    
    const members = [...selectedMembers, user._id];
  
    try {
      await groupDetails("making group",{ name: groupCheck.value, members });
      toast.success("Group created successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error creating group");
    }
  };
  
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  const handler = (_id) => {
    setSelectedMembers((prev) =>
      prev.includes(_id) ? prev.filter((curr) => curr !== _id) : [...prev, _id]
    );
  };

  const { isLoading, isError, error, data } = useAvalaibleFriendsQuery();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const groupCheck = useInputValidation("");
  const errors = [{ isError, error }];
  useErrors(errors);

  return isLoading ? <Skeleton /> : (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack spacing={2} sx={{ padding: 2 }}>
        <DialogTitle>New Group</DialogTitle>
        <TextField
  variant="outlined"
  label="Group Name"
  value={groupCheck.value}
  onChange={groupCheck.changeHandler}
  required
/>

        <Typography>Group Members</Typography>
        {data?.friends?.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            handler={handler}
            isAdded={selectedMembers.includes(user._id)}
          />
        ))}
        <Stack direction="row" spacing={1} justifyContent="space-evenly">
          <Button color='error' variant='outlined' onClick={closeHandler}>Cancel</Button>
          <Button variant='contained' size='large' onClick={submitHandler} disabled={isLoadingGroupDetails}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
