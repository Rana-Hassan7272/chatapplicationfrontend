import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useInputValidation } from '6pp';
import { Search as SearchIcon } from '@mui/icons-material';
import UserItem from './UserItem';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from '../redux/misc';
import { useFriendRequestMutation, useLazyMySearchUserQuery } from '../redux/api/api';
import toast from 'react-hot-toast';
import { asyncMutation } from '../hooks/hooks';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { isSearch } = useSelector((state) => state.misc);
  const search = useInputValidation('');
  const [users, setUsers] = useState([]);
  const [searchUser, { isFetching }] = useLazyMySearchUserQuery(); // Lazy query for search
  const [isLoading, data, executeFriendRequest] = asyncMutation(useFriendRequestMutation);// Call the mutation hook

  // Close the search dialog
  const handleCloseSearch = () => {
    dispatch(setIsSearch(false));
  };

  // Handle sending a friend request
  const handler = async (_id) => {
    try {
      const res = await executeFriendRequest("Sending friend request...", { userId: _id });
      console.log("Response:", res); // Add this line to inspect the response
      if (res.data) {
        toast.success("Friend request sent");
      } else {
        console.log(res.error);
      }
    } catch (error) {
      toast.error('Failed to send friend request');
    }
  };
  
   

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.value.toLowerCase())
  );

  // Search users when the search value changes
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (search.value.trim().length >= 3) {
        searchUser(search.value)
          .unwrap() // Unwrap the promise to handle success and error
          .then(({ users }) => setUsers(users || []))
          .catch(() => toast.error('Failed to fetch users'));
      }
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [search.value, searchUser]);

  return (
    <Dialog open={isSearch} onClose={handleCloseSearch}>
      <Stack spacing={2} sx={{ padding: 2 }}>
        <DialogTitle>Search Users</DialogTitle>
        <TextField
          variant="outlined"
          label="Search"
          value={search.value}
          onChange={search.changeHandler}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {isFetching ? (
          <CircularProgress sx={{ alignSelf: 'center' }} />
        ) : (
          <List>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <UserItem key={user._id} user={user} handler={handler} loadingHandler={isLoading} />
              ))
            ) : (
              <Typography>No users found</Typography>
            )}
          </List>
        )}
      </Stack>
    </Dialog>
  );
};

export default SearchBar;
