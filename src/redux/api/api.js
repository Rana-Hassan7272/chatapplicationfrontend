import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from '../server';


const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${server}/api/v1/`,
    credentials: 'include',  // Global credentials include
  }),
  tagTypes: ['Chat', 'User','Message','Admin'],
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: 'chat/my',
        method: 'GET', // Ensure method is GET
      }),
      providesTags: ['Chat'],
    }),
    mySearchUser: builder.query({
      query: (name) => ({
        url: `user/search?name=${name}`,
        credentials:"include",
        method: 'GET',  // Ensure method is GET for fetching
      }),
      providesTags: ['User']
    }),
    friendRequest: builder.mutation({
      query: (data) => ({
        url: 'user/sendrequest',
        credentials:"include",
        method: 'PUT',
        body: data,  // Data for sending friend request
      }),
      invalidatesTags: ['User'],
    }),
    myNotifiations: builder.query({
      query: () => ({
        url: `user/getnotify`,
        credentials:"include",
        method: 'GET',  // Ensure method is GET for fetching
      }),
      keepUnusedDataFor:0
    }),
    acceptfriendRequest: builder.mutation({
      query: (data) => ({
        url: 'user/acceptrequest',
        credentials:"include",
        method: 'PUT',
        body: data,  // Data for sending friend request
      }),
      invalidatesTags: ['Chat'],
    }),
    myChatsDetails: builder.query({
      query: ({chatId,populate=false}) => {
        let url=`chat/${chatId}`;
        if(populate) url+="?populate=true"
        return{
           url,
           credentials:"include"
        }
      },
      providesTags:['Chat'],
     
    }),
    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chat/message/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    
    }),
    
    sendAttachments: builder.mutation({
      query: (data) => ({
        url: 'chat/attachments',
        credentials:"include",
        method: 'POST',
        body: data,  // Data for sending friend request
      }),
      
    }),
    
    myGroups: builder.query({
      query: () => ({
        url: 'chat/my/group',
        credentials:"include",
       
      }),
     providedTags: ['Chat'],
    }),
    avalaibleFriends: builder.query({
      query: (chatId) => {
        let url=`user/getfriends`;
        if(chatId) url+=`?chatId=${chatId}`
        return{
           url,
           credentials:"include"
        }
      },
      providesTags:['Chat']
    }),
    newGroupDetails: builder.mutation({
      query: ({chatId,members,name}) => ({
        url: 'chat/new',
        credentials:"include",
        method: 'POST',
        body: {chatId,members,name},  // Data for sending friend request
      }),
      invalidatesTags:['Chat']
    }),
    renameGroup: builder.mutation({
      query: ({chatId,name}) => ({
        url: `chat/${chatId}`,
        credentials:"include",
        method: 'PUT',
        body: {name},  // Data for sending friend request
      }),
      invalidatesTags:['Chat']
    }),
    removeGroupMember: builder.mutation({
      query: ({chatId,userId}) => ({
        url: `chat/removeMembers`,
        credentials:"include",
        method: 'PUT',
        body: {chatId,userId},  // Data for sending friend request
      }),
      invalidatesTags:['Chat']
    }),
    addGroupMember: builder.mutation({
      query: ({members,chatId}) => ({
        url: `chat/addMembers`,
        credentials:"include",
        method: 'PUT',
        body: {members,chatId},  // Data for sending friend request
      }),
      invalidatesTags:['Chat']
    }),
    deleteGroup: builder.mutation({
      query: (chatId) => ({
        url: `chat/${chatId}`,
        credentials:"include",
        method: 'DELETE',
       
      }),
      invalidatesTags:['Chat']
    }),
    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: `chat/leaveMember/${chatId}`,
        credentials:"include",
        method: 'DELETE',
       
      }),
      invalidatesTags:['Chat']
    }),
    myAdmin: builder.query({
      query: () => ({
        url: 'admin/stats',
        method: 'GET', // Ensure method is GET
      }),
      keepUnusedDataFor:3000,
      providesTags: ['Admin'],
    }),
    myAdminUser: builder.query({
      query: () => ({
        url: 'admin/users',
        method: 'GET', // Ensure method is GET
      }),
      providesTags: ['Admin'],
    }),
    myAdminChat: builder.query({
      query: () => ({
        url: 'admin/chats',
        method: 'GET', // Ensure method is GET
      }),
      providesTags: ['Admin'],
    }),
    myAdminMessage: builder.query({
      query: () => ({
        url: 'admin/messages',
        method: 'GET', // Ensure method is GET
      }),
      providesTags: ['Admin'],
    }),
    
    
    
  }),
});

export const { useMyChatsQuery,useMyAdminMessageQuery,useMyAdminChatQuery ,useMyAdminUserQuery,useMyAdminQuery, useLazyMySearchUserQuery,useLeaveGroupMutation, useDeleteGroupMutation,useRemoveGroupMemberMutation,useAddGroupMemberMutation,useRenameGroupMutation,useAvalaibleFriendsQuery,useNewGroupDetailsMutation,useFriendRequestMutation,useMyNotifiationsQuery ,useAcceptfriendRequestMutation,useMyChatsDetailsQuery,useGetMessagesQuery,useSendAttachmentsMutation,useMyGroupsQuery} = api;
export default api;
