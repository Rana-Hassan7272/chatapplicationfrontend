import { Button, Dialog, Stack, Avatar, ListItem, Typography, DialogTitle, List, Skeleton } from '@mui/material';
import React, { memo } from 'react';
import { NotificationData } from '../assets/sample/ChatSampleData';
import { useMyNotifiationsQuery ,useAcceptfriendRequestMutation} from '../redux/api/api';
import { useErrors } from '../hooks/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNewNotification } from '../redux/misc';
import toast from 'react-hot-toast';
const Notification = () => {
  const { data, isError, error, isLoading } = useMyNotifiationsQuery();
  const [acceptrequest]=useAcceptfriendRequestMutation()
  const dispatch = useDispatch();
  const { isNotification } = useSelector((state) => state.misc);
  
  
  console.log(data);
  

  if (isLoading) {
    return <Skeleton />;
  }

  const closeNotification = () => dispatch(setIsNewNotification(false));

  const handler = async ({ _id, accept }) => {
    if (!_id) {
      toast.error("Request ID is missing");
      return;
    }
    dispatch(setIsNewNotification(false));
    try {
      const res = await acceptrequest({ requestId: _id, accept });
      console.log(res.data)
      if (res.data.success) {
        console.log("we use sockets here");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  
  return (
    <Dialog open={isNotification} onClose={closeNotification}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} spacing={2}>
        <DialogTitle>Notifications</DialogTitle>
        {data?.allRequests?.length > 0 ? (
          <List>
            {data.allRequests.map((i) => (
              <NotificationItem key={i._id} sender={i.sender} _id={i._id} handler={handler} />
            ))}
          </List>
        ) : (
          <div>No Notifications Found</div>
        )}
      </Stack>
    </Dialog>
  );
};



const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
        <Avatar src={avatar} alt={name} />
        <Typography variant="body1" sx={{
          flexGrow: 1,
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
          {`${name} sent you a friend request`}
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button variant="contained" onClick={() => handler({ _id ,accept: true})}>Accept</Button>
          <Button variant="contained" color="error" onClick={() => handler({  _id,accept: false })}>Reject</Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notification;
