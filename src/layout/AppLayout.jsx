import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Drawer, Grid, Skeleton } from '@mui/material';
import Title from '../shared/Title';
import Header from '../shared/Header';
import ChatList from '../shared/ChatList';
import Profile from '../shared/Profile';
import { useNavigate, useParams } from 'react-router-dom';
import { useMyChatsQuery } from '../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDeleteMenu, setIsMobile, setIsNewMessageAlert, setIsSelectDeletedChat } from '../redux/misc';
import { useErrors, useSocketEvents } from '../hooks/hooks';
import { getSocket } from '../socket';
import { NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_DATA } from '../constants/event';
import { incrementNotification } from '../redux/api/chat';
import { getOrSaveFromStorage } from '../libs/FileFormat';
import DeleteChat from '../dialogue/DeleteChat';
import { ONLINE_USER } from '../../../../server/constants/events';

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const { user, loader } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);
    const chatId = params.chatId;
    const navigate = useNavigate();
    const deleteMenuAnchor = useRef(null);
    const socket = getSocket();
    const dispatch = useDispatch();
    const { isMobile } = useSelector((state) => state.misc);
    const [onlineUser,setOnlineUser]=useState([])
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleMobileClose = () => dispatch(setIsMobile(false));

    const { data, isLoading, isError, refetch, error } = useMyChatsQuery();
    const newMessageHandler = useCallback((data) => {
  
      // Update messages array with the new message received via socket
      setMessages((prev) => [...prev, data.message]);
    
    
  }, []);
  

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, _id, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setIsSelectDeletedChat({ chatId:_id, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };
  
    const newMessageAlertHandler = useCallback((data) => {
      if (data?.chat === chatId) return;
      dispatch(setIsNewMessageAlert(data));
    }, [chatId]);

    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotification());
    }, []);

    const refetchListner = useCallback(() => {
      navigate('/');
      refetch();
    }, [refetch, navigate]);
    const onlineListener = useCallback((data) => {
      
      setOnlineUser(data)
    }, []);

    const handlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_DATA]: refetchListner,
      [ONLINE_USER]:onlineListener
    };
    useSocketEvents(socket, handlers);

    return (
      <div>
        <Title />
        <Header />
        <DeleteChat dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessageAlert={newMessagesAlert}
              onlineUsers={onlineUser} // Dummy online users
            />
          </Drawer>
        )}

        <Grid container style={{ height: 'calc(100vh - 4rem)' }}>
          <Grid item sm={4} md={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessageAlert={newMessagesAlert}
                onlineUsers={onlineUser}
                
              />
            )}
          </Grid>

          <Grid item xs={12} sm={8} lg={6} md={5}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>

          <Grid item md={4} lg={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            {loader ? <Skeleton /> : <Profile user={user} />}
          </Grid>
        </Grid>
      </div>
    );
  };
};

export default AppLayout;