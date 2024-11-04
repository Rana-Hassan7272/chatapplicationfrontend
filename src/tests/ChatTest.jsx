
import React, { Fragment, useCallback, useRef, useState } from 'react';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Stack, Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import AppLayout from '../layout/AppLayout';
import MessageComponent from '../components/MessageComponent';
import { getSocket } from '../socket';
import { NEW_MESSAGE } from '../constants/event';
import { useGetMessagesQuery, useMyChatsDetailsQuery } from '../redux/api/api';
import { useErrors, useSocketEvents } from '../hooks/hooks';
import { useInfiniteScrollTop } from '6pp';  // Infinite scroll for loading messages

// Styled InputBox component
const InputBox = styled('input')`
  height: 40px;
  flex: 1;
  outline: none;
  border-radius: 20px;
  padding: 0 1rem;
  border: 1px solid #ccc;
  background-color: rgba(247, 247, 247, 1);
  margin: 0 1rem;
`;

// Styled form component
const StyledForm = styled('form')`
  height: 10%;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: #f9f9f9;
  border-top: 1px solid #e0e0e0;
`;

const Chat = ({ chatId, user }) => {
  const socket = getSocket();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  // Fetch chat details
  const chatDetails = useMyChatsDetailsQuery(
    { chatId, populate: true }, // Query arguments
    { skip: !chatId }           // Hook options
  );

  const containerRef = useRef(null);

  // Message submission handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;  // Prevent sending empty messages

    // Emit the message through socket
    socket.emit(NEW_MESSAGE, { chatId, members: chatDetails.data?.members, message });

    // Clear input after sending message
    setMessage('');
  };

  // New message handler
  const newMessageHandler = useCallback((data) => {
    setMessages((prev) => [...prev, data.message]);
  }, []);

  const handlers = { [NEW_MESSAGE]: newMessageHandler };
  useSocketEvents(socket, handlers);

  const oldMessagesDetail = useGetMessagesQuery({ chatId, page });
  
  // Using infinite scroll to load old messages
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesDetail?.data?.totalPages,
    oldMessagesDetail?.data?.messages,
    page,
    setPage
);

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesDetail.isError, error: oldMessagesDetail.error },
  ];
  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        padding="1rem"
        spacing="1rem"
        height="90%"
        boxSizing="border-box"
        overflow="auto"
        bgcolor="#fff"
      >
        {allMessages.map((message) => (
          <MessageComponent key={message._id} message={message} user={user} />
        ))}
      </Stack>
      <StyledForm onSubmit={submitHandler}>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <InputBox
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      </StyledForm>
    </Fragment>
  );
};

export default AppLayout(Chat);
