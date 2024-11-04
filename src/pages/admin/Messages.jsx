import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { Avatar, Box, Skeleton, Stack, Typography } from '@mui/material';
import Table from '../../charts/Table';
import { userManagementData } from '../../assets/sample/ChatSampleData';
import { FileFormat, transformImg } from '../../libs/FileFormat';
import { RenderComponent } from '../../components/RenderComponent';
import moment from 'moment';
import { useMyAdminMessageQuery } from '../../redux/api/api';
import { useErrors } from '../../hooks/hooks';

const columns = [
  {
    field: "_id",
    headerClassName: "table-header",
    width: 200,
    headerName: "_id"
  },
  {
    field: "attachments",
    headerClassName: "table-header",
    width: 150,
    headerName: "Attachments",
    renderCell: (params) => {
      const { attachments } = params.row;
      return attachments?.length > 0 ? 
        attachments.map((i) => {
          const url = i.url;
          const file = FileFormat(url);

          // Check if file is an image
          if (file.type === 'image') {
            return (
              <Box key={url}>
                <a href={url} download target='_blank' style={{ color: 'black' }}>
                  <img src={url} alt="Attachment" style={{ width: 50, height: 50, borderRadius: '4px' }} />
                </a>
              </Box>
            );
          }

          // For non-image files, render icon
          return (
            <Box key={url}>
              <a href={url} download target='_blank' style={{ color: 'black' }}>
                {RenderComponent(file, url)}
              </a>
            </Box>
          );
        })
        : <Typography>No Attachments</Typography>
    }
  },
  {
    field: "content",
    headerClassName: "table-header",
    width: 200,
    headerName: "Content"
  },
  {
    field: "groupChat",
    headerClassName: "table-header",
    width: 200,
    headerName: "Group Chat"
  },
  {
    field: "sender",
    headerClassName: "table-header",
    width: 200,
    headerName: "Sent By",
    renderCell: (params) => (
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar src={params.row.sender.avatar} alt={params.row.sender.name} />
        <Typography>{params.row.sender.name}</Typography>
      </Stack>
    )
  },
  {
    field: "createdAt",
    headerClassName: "table-header",
    width: 200,
    headerName: "Created At"
  },
  {
    field: "chat",
    headerClassName: "table-header",
    width: 200,
    headerName: "Chat"
  }
];

const Messages = () => {
  const { data, isError, error, isLoading }=useMyAdminMessageQuery();

  useErrors([{
    isError:error,
    error:error
  }])
  console.log("Error in mesages ",error)
  console.log("data in messages",data)
  
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(data){
    const formattedData = data.messages.map((i) => ({
      ...i,
      sender: {
        name: i.sender.name,
        avatar: transformImg(i.sender.avatar, 50)
      },
      createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a")
    }));
    setRows(formattedData);
  }}, []);

  return (
    <AdminLayout>
      {isLoading?<Skeleton/>:
      <Table heading={"Messages"} rows={rows} columns={columns} rowHeight={55} />
}
    </AdminLayout>
  );
};

export default Messages;
