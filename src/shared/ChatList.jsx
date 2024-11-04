import { Stack } from '@mui/material';
import React from 'react';
import ChatItem from '../dialogue/ChatItem';

export default function ChatList({
  chats = [],           // Get the actual chats prop
  chatId,
  onlineUsers = [],      // List of online users
  newMessageAlert = [{
    chatId:'',
    count:0
  }], // Alerts for new messages
  handleDeleteChat,
  userId,               // Current user's ID (req4)
  w = '100%'            // Set default width if not provided
}) {
  return (
    <>
      <Stack direction="column" width={w} height={'100%'} overflow={'auto'}>
        {chats
           // Exclude the current user
          .map((chat, index) => {
            const { _id, name, avatar, members, groupChat } = chat;
            console.log(chat)

            const isOnline = members?.some(member => onlineUsers.includes(member));

            return (
              <ChatItem
                key={_id}
                newMessageAlert={newMessageAlert}
                _id={_id}
                isOnline={isOnline}
                avatar={avatar}
                groupChat={groupChat}
                name={name}
                members={members}
                sameSender={chatId === _id}
                handleDeleteChat={handleDeleteChat}
              />
            );
          })}
      </Stack>
    </>
  );
}
