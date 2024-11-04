import { Avatar, IconButton, ListItem, Typography, Stack } from '@mui/material';
import React, { memo, useState } from 'react';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { transformImg } from '../libs/FileFormat';

const UserItem = ({ user, handler, loadingHandler, isAdded, removeMember }) => {
 
  const { avatar, _id, name } = user;

  const handleToggle = () => {
    if (isAdded) {
      removeMember(_id);  // Trigger the remove member logic
    } else {
      handler(_id);  // Add member logic
    }
  };

  const avatarSrc = avatar && typeof avatar === 'string' ? transformImg(avatar) : '/path/to/default/avatar.png';

  return (
    <ListItem>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={avatarSrc} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
        <IconButton
          onClick={handleToggle}
          disabled={loadingHandler}
          sx={{ bgcolor: isAdded ? "error.main" : "primary.main" }}
          aria-label={isAdded ? "Remove user" : "Add user"}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};


export default memo(UserItem);
