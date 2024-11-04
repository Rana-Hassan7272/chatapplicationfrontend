import { Menu, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { setIsDeleteMenu } from '../redux/misc';
import { useDispatch, useSelector } from 'react-redux';
import { ExitToApp as ExitToAppIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { asyncMutation } from '../hooks/hooks';
import { useDeleteGroupMutation, useLeaveGroupMutation } from '../redux/api/api';
import { useNavigate } from 'react-router-dom';

const DeleteChat = ({ dispatch, deleteMenuAnchor }) => {
    const navigate=useNavigate()
  const { isDeleteMenu, isSelectDeleteChat } = useSelector((state) => state.misc);
  
  const [isLoadingDeleteChat,deleteChatData,deleteChat]=asyncMutation(useDeleteGroupMutation)
  const [isLoadingLeaveGroup,leaveGroupData,leaveGroup]=asyncMutation(useLeaveGroupMutation)
  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current=null;
  };

  const leaveGroupHandler = () => {
    closeHandler()
    leaveGroup("Leave group..",isSelectDeleteChat.chatId)
  };

  const deleteChatHandler = () => {
    closeHandler()
    deleteChat("delete chat",isSelectDeleteChat.chatId)
  };
  useEffect(()=>{
if(deleteChatData|| leaveGroupData) return navigate("/")
  },[deleteChatData,leaveGroupData])

  return (
    <div>
      <Menu
        open={isDeleteMenu}
        onClose={closeHandler}
        anchorEl={deleteMenuAnchor.current} 
        transformOrigin={{ vertical: 'center', horizontal: 'left' }}
      >
        <Stack
          sx={{ padding: '0.5rem', width: '10rem', cursor: 'pointer' }}
          direction="row"
          alignItems="center"
          spacing="0.5rem"
          onClick={isSelectDeleteChat.groupChat ? leaveGroupHandler : deleteChatHandler}
        >
          {isSelectDeleteChat?.groupChat ? (
            <>
              <ExitToAppIcon />
              <Typography>Leave Group</Typography>
            </>
          ) : (
            <>
              <DeleteIcon />
              <Typography>Delete Chat</Typography>
            </>
          )}
        </Stack>
      </Menu>
    </div>
  );
};

export default DeleteChat;
