import React, { memo, useEffect, useState } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import moment from 'moment';
import { FileFormat } from '../libs/FileFormat';
import { RenderComponent } from './RenderComponent';
import { motion } from 'framer-motion';
import { NEW_MESSAGE } from '../constants/event';


const MessageComponent = ({ message, user }) => {
  const { content, attachments = [], sender, createdAt } = message;
  const sameSender = user?._id === sender?._id;
  const timeAgo = moment(createdAt).fromNow();

  const messageVariants = {
    hidden: { opacity: 0, x: sameSender ? 100 : -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', alignItems: sameSender ? 'flex-end' : 'flex-start' }}
    >
      <Box
        sx={{
          backgroundColor: sameSender ? 'lightblue' : 'lightgray',
          color: 'black',
          borderRadius: '8px',
          padding: '0.5rem',
          marginBottom: '0.5rem',
          maxWidth: '80%',
          width: 'fit-content'
        }}
        component={Paper}
        elevation={3}
      >
        {!sameSender && (
          <Typography variant="subtitle2" fontWeight="bold">
            {sender.name}
          </Typography>
        )}
        {content && (
          <Typography variant="body1">
            {content}
          </Typography>
        )}
        {attachments.length > 0 && attachments.map((attachment, index) => (
          <Box key={index} sx={{ marginTop: '0.5rem' }}>
            <a href={attachment.url} download={attachment.name} target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>
              <RenderComponent file={FileFormat(attachment.url)} url={attachment.url} />
            </a>
          </Box>
        ))}
        <Typography variant="caption" color="textSecondary">
          {timeAgo}
        </Typography>
      </Box>
    </motion.div>
  );
};


export default memo(MessageComponent);
