import React from 'react';
import { Avatar, AvatarGroup, Stack } from '@mui/material';
import { transformImg } from '../libs/FileFormat';

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <AvatarGroup max={max} sx={{ position: 'relative' }}>
        {avatar.map((imgUrl, index) => (
          <Avatar
            key={index} // Ideally, use a unique identifier instead of index
            src={transformImg(imgUrl, 24)} // Pass the correct size to transformImg
            alt={`Avatar ${index}`}
            sx={{ width: 24, height: 24 }} // Customize styles if needed
          />
        ))}
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
