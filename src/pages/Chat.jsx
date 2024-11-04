import React, { useCallback, useRef, useState, useEffect } from 'react';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Stack, Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import AppLayout from '../layout/AppLayout';
import MessageComponent from '../components/MessageComponent';
import { getSocket } from '../socket';
import { ALERT, CHAT_EXIT, CHAT_JOIN, NEW_MESSAGE, NEW_MESSAGE_ALERT, START_TYPING, STOP_TYPING } from '../constants/event';
import { useGetMessagesQuery, useMyChatsDetailsQuery } from '../redux/api/api';
import { useErrors, useSocketEvents } from '../hooks/hooks';
import { setIsUploaderFile } from '../redux/misc';
import { useDispatch } from 'react-redux';
import { FileMenu } from '../assets/FileMenu';
import { removeMessageAlert } from '../redux/api/chat';
import { TypingLoader } from '../layout/LayoutLoader';
import { useNavigate } from 'react-router-dom';

const ChatContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 4rem); /* Adjust according to your header size */
`;

const MessagesContainer = styled(Stack)`
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
  background-color: #fff;
`;

const InputContainer = styled('form')`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: #f9f9f9;
  border-top: 1px solid #e0e0e0;
`;

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

const Chat = ({ chatId, user }) => {
  const socket = getSocket();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [anchor, setAnchor] = useState(null);
  const [iAmTyping, setIAmTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const timeOut = useRef(null);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const dispatch = useDispatch();

  // Fetch chat details
  const chatDetails = useMyChatsDetailsQuery({ chatId, populate: true }, { skip: !chatId });
  const members = chatDetails?.data?.chat?.members;

  // Handle typing message
  const changeTypingMessage = (e) => {
    setMessage(e.target.value);
    if (!iAmTyping) {
      socket.emit(START_TYPING, { chatId });
      setIAmTyping(true);
    }
    if (timeOut.current) clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { chatId });
      setIAmTyping(false);
    }, 2000);
  };

  // Handle file upload
  const fileMenu = (e) => {
    dispatch(setIsUploaderFile(true));
    setAnchor(e.currentTarget);
  };

  // Handle message submission
  const submitHandler = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const newMessage = { content: message, sender: user, _id: Date.now() };

    // Emit the new message to the server
    socket.emit(NEW_MESSAGE, { chatId, message, members });

    // Add the message locally to update the UI immediately
    setMessages((prev) => [...prev, newMessage]);

    setMessage(''); // Clear input after sending message
  };

  // Clear message and message alerts on chat change
  useEffect(() => {
    socket.emit(CHAT_JOIN, { userId: user._id, members });
    dispatch(removeMessageAlert(chatId));

    return () => {
      setMessage('');
      setMessages([]);
      socket.emit(CHAT_EXIT, { userId: user._id, members }); // Clear messages when chatId changes
    };
  }, [chatId, dispatch]);

  useEffect(() => {
    if (!chatDetails?.data?.chat) navigate("/");
  }, [chatDetails.isError]);

  // Handle new messages from socket
  // Handle new messages from socket
  const newMessageHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    []
  );

  // Handle when a user starts typing
  const startMessageListener = useCallback(() => {
    setUserTyping(true);
  }, []);

  // Handle when a user stops typing
  const stopMessageListener = useCallback(() => {
    setUserTyping(false);
  }, []);
  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "djasdhajksdhasdsadasdas",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    []
  );


  const handlers = {
    [NEW_MESSAGE_ALERT]:alertListener,
    [NEW_MESSAGE]: newMessageHandler,
    [START_TYPING]: startMessageListener,
    [STOP_TYPING]: stopMessageListener,
  };
  useSocketEvents(socket, handlers);

  // Fetch old messages with pagination
  const oldMessagesDetail = useGetMessagesQuery({ chatId, page });
  const allMessages = [...(oldMessagesDetail?.data?.messages || []), ...messages];

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [allMessages]);

  // Error handling
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesDetail.isError, error: oldMessagesDetail.error },
  ];
  useErrors(errors);

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <ChatContainer>
      <MessagesContainer ref={containerRef}>
        {allMessages.map((message) => (
          <MessageComponent key={message._id} message={message} user={user} />
        ))}
        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </MessagesContainer>
      
      <InputContainer onSubmit={submitHandler}>
        <IconButton onClick={fileMenu}>
          <AttachFileIcon />
        </IconButton>
        <InputBox
          placeholder="Type a message..."
          value={message}
          onChange={changeTypingMessage}
        />
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      </InputContainer>

      <FileMenu anchorEl={anchor} chatId={chatId} />
    </ChatContainer>
  );
};

export default AppLayout(Chat);
