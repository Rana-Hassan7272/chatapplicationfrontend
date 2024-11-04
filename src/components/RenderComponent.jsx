import React from 'react';
import { transformImg } from '../libs/FileFormat';
import { FileOpen as FileOpenIcon } from '@mui/icons-material';

export const RenderComponent = ({ file, url }) => {

    switch (file) {
      case "video":
        return <video src={url} preload='none' width="200px" controls />;
      case "img":
        return <img src={transformImg(url, 200)} alt='attachment' height="150px" width="200px" style={{ objectFit: "contain" }} />;
      case "audio":
        return <audio src={url} preload='none' width="200px" controls />;
      default:
        return <FileOpenIcon />;
    }

};
