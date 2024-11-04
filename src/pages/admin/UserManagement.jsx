import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { Avatar, Skeleton } from '@mui/material';
import Table from '../../charts/Table';

import { userManagementData } from '../../assets/sample/ChatSampleData';
import { useFetchData } from '6pp';
import { server } from '../../redux/server';
import { useErrors } from '../../hooks/hooks';
import { useMyAdminUserQuery } from '../../redux/api/api';


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
    renderCell: (params) => <Avatar alt={params.row.name} src={params.row.avatar} />
  },
  {
    field: "username",
    headerClassName: "table-header",
    width: 200,
    headerName: "Username"
  },
  {
    field: "name",
    headerClassName: "table-header",
    width: 200,
    headerName: "Name"
  },
  
  
  {
    field: "friends",
    headerClassName: "table-header",
    width: 200,
    headerName: "Friends"
  },
  {
    field: "groups",
    headerClassName: "table-header",
    width: 200,
    headerName: "Groups"
  }
];

const UserManagement = () => {
  const { data, isError, error, isLoading }=useMyAdminUserQuery()

  useErrors([{
    isError:error,
    error:error
  }])
  console.log("Error",error)
  console.log("data",data)
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(data){
    const formattedData = data.users.map((user) => ({
      ...user,
      _id: user._id,
      avatar: user.avatar,
      username: user.username,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      friends: user.friends,
      groups: user.groups
    }));
  
    setRows(formattedData);
 } }, [data]);

  return (
    <AdminLayout>
      {
      isLoading?<Skeleton/>:
      <Table heading="All Users" rows={rows} columns={columns} rowHeight={52} />
}
    </AdminLayout>
  );
};

export default UserManagement;
