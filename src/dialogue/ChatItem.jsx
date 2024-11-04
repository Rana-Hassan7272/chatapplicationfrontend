import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Stack, Box } from '@mui/material';
import AvatarCard from './AvatarCard';
import { motion } from 'framer-motion';

const ChatItem = ({
  avatar = [],
  _id,
  newMessageAlert,
  groupChat = false,
  sameSender,
  members,
  name,
  isOnline,
  handleDeleteChat,
 
}) => {
  // Define motion variants for animations
  const chatItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { scale: 1.05 }
  };

  // Determine which name to display based on the userId


  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <motion.div
        style={{
          padding: '1rem',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: sameSender ? "grey" : "unset",
          color: sameSender ? "white" : "unset"
        }}
        variants={chatItemVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <Stack>
          <AvatarCard avatar={avatar} />
          
          <Typography >
         {name}
          </Typography>
          
          {newMessageAlert && (
            <Typography>
              {newMessageAlert.count} new message
            </Typography>
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'green',
              position: 'absolute',
              top: '50%',
              right: '1rem',
              transform: 'translateY(-50%)'
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
