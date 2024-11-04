import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute';
import LayoutLoader from './layout/LayoutLoader';
import axios from 'axios';
import { server } from './redux/server';
import {useDispatch, useSelector} from 'react-redux'
import { userExist, userNotExist } from './redux/authSlice';
import { SocketProvider } from './socket';

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Group = lazy(() => import("./pages/Group"));
const Chat = lazy(() => import("./pages/Chat"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const Messages = lazy(() => import("./pages/admin/Messages"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  
const dispatch=useDispatch();
const {user,loader}=useSelector(state=>state.auth)
useEffect(() => {
  axios
    .get(`${server}/api/v1/user/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      withCredentials: true,
    })
    .then((response) => {
      // Ensure you're accessing the correct property
      dispatch(userExist(response.data.user));
    })
    .catch((err) => {
      dispatch(userNotExist());
    });
}, [dispatch]);


  return (
    loader?<LayoutLoader/>:
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<SocketProvider><ProtectRoute user={user} /></SocketProvider>}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/group" element={<Group />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/chats" element={<ChatManagement />} />
            <Route path="/admin/messages" element={<Messages />} />
          </Route>
          <Route
            path="/login"
            
            element={
              <ProtectRoute user={!user}  redirect='/'>
                <Login />
              </ProtectRoute>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
