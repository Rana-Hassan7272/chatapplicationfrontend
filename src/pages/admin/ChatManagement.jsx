import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { Avatar, Skeleton, Stack } from '@mui/material';
import Table from '../../charts/Table';
import AvatarCard from '../../dialogue/AvatarCard';
import { userManagementData } from '../../assets/sample/ChatSampleData';
import { transformImg } from '../../libs/FileFormat';
import { useMyAdminChatQuery } from '../../redux/api/api';
import { useErrors } from '../../hooks/hooks';

const columns = [
  {
    field: "_id",
    headerClassName: "table-header",
    width: 200,
    headerName: "_id"
  },
  {
    field: "avatar",
    headerClassName: "table-header",
    width: 150,
    headerName: "Avatar",
    renderCell: (params) => <Avatar alt={params.row.name} src={params.row.avatar[0]} />
  },
  {
    field: "name",
    headerClassName: "table-header",
    width: 200,
    headerName: "Username"
  },
  {
    field: "groupChat",
    headerClassName: "table-header",
    width: 200,
    headerName: "Group Chat"
  },
  {
    field: "creator",
    headerClassName: "table-header",
    width: 200,
    headerName: "Created By",
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar src={params.row.creator.avatar} alt={params.row.creator.name} />
        <span>{params.row.creator.name}</span>
      </Stack>
    )
  },
  {
    field: "members",
    headerClassName: "table-header",
    width: 200,
    headerName: "Total Members",
    renderCell: (params) => (
      <AvatarCard avatar={params.row.members.map(member => member.avatar)} />
    )
  },
  {
    field: "totalMessages",
    headerClassName: "table-header",
    width: 200,
    headerName: "Total Messages"
  },
  {
    field: "groups",
    headerClassName: "table-header",
    width: 200,
    headerName: "Groups"
  },
  {
    field: "totalMembers",
    headerClassName: "table-header",
    width: 200,
    headerName: "Total Members"
  }
];

 const ChatManagement = () => {
  const { data, isError, error, isLoading }=useMyAdminChatQuery();

  useErrors([{
    isError:error,
    error:error
  }])
  console.log("Error in chat ",error)
  console.log("data in chat",data)
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(data){
    const transformedRows = data.transformedChats.map((chat) => ({
      ...chat,
      id: chat._id,
      avatar: chat.avatar.map((a) => transformImg(a, 50)),
      members: chat.members.map((member) => ({
        ...member,
        avatar: transformImg(member.avatar[0], 50)
      })),
      creator: {
        name: chat.creator.name,
        avatar: transformImg(chat.creator.avatar[0], 50)
      }
    }));
    setRows(transformedRows);
  }}, [data]);

  return (
    <AdminLayout>
      { isLoading?<Skeleton/>:
      <Table heading={"Chat Data"} rows={rows} columns={columns} rowHeight={55} />
 }
    </AdminLayout>
  );
};

export default ChatManagement
