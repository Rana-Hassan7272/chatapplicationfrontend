import React, { useRef } from 'react'
import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setIsUploaderFile } from '../redux/misc'
import { Image as ImageIcon, AudioFile as AudioFileIcon, VideoFile as VideoFileIcon, UploadFile as UploadFileIcon } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { useSendAttachmentsMutation } from '../redux/api/api'

export const FileMenu = ({ anchorE1,chatId}) => {
  const dispatch = useDispatch()
  const [sendAttachments]=useSendAttachmentsMutation()

  // Create refs for file inputs
  const imageRef = useRef(null)
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const fileRef = useRef(null)

  // Handlers to trigger click on the input refs
  const imageHandler = () => imageRef.current.click()
  const audioHandler = () => audioRef.current.click()
  const videoHandler = () => videoRef.current.click()
  const filesHandler = () => fileRef.current.click()

  const { isUploaderFile } = useSelector((state) => state.misc)

  const closeMenu = () => {
    dispatch(setIsUploaderFile(false))
  }

  const fileHandler = async (e, key) => {
    const files = Array.from(e.target.files);  // Corrected this to e.target.files
    if (files.length <= 0) return;
    if (files.length > 5) {
      toast.error(`You can't upload more than 5 ${key}`);  // Better error message format
      return;
    }
  
    const toastId = toast.loading(`Sending ${key}`);  // Initialize the loading toast
    closeMenu();  // Close the menu
    
    try {
      const formData = new FormData();
      formData.append("chatId", chatId);  // Make sure chatId is available in the scope
      files.forEach((file) => formData.append("files", file));  // Appending each file to the formData
  
      const res = await sendAttachments(formData);  // Await the sendAttachments API call
  
      if (res.data) {
        toast.success(`Successfully sent ${key}`, { id: toastId });  // Success notification
      } else {
        toast.error(`Failed to upload ${key}`, { id: toastId });  // Error if no data in response
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, { id: toastId });  // Catch any errors and display
    } finally {
      dispatch(setIsUploaderFile(false));  // Reset the uploader file state after the operation
    }
  };
  
    

  return (
    <Menu 
      open={isUploaderFile} 
      anchorEl={anchorE1} 
      onClose={closeMenu}
      PaperProps={{
        style: {
          backgroundColor: '#f5f5f5',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }
      }}
    >
      <div style={{
        width: "12rem",
        padding: "0.5rem",
        borderRadius: "8px",
      }}>
        <MenuList>
          {/** Image Upload Menu */}
          <MenuItem 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '0.5rem', 
              borderRadius: '6px', 
              marginBottom: '0.3rem',
              transition: 'background 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f7fa'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={imageHandler}
          >
            <Tooltip title="Image">
              <ImageIcon style={{ color: '#1976d2' }}/>
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.75rem", color: '#333', fontWeight: 'bold' }}>
              Image
            </ListItemText>
            <input 
              type='file'
              multiple
              accept='image/png,image/jpeg,image.jpg'
              style={{
                display: 'none',
              }}
              ref={imageRef}  // Attach the ref here
              onChange={(e) => fileHandler(e, 'image')}
            />
          </MenuItem>

          {/** Audio Upload Menu */}
          <MenuItem 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '0.5rem', 
              borderRadius: '6px', 
              marginBottom: '0.3rem',
              transition: 'background 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f7fa'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={audioHandler}
          >
            <Tooltip title="Audio">
              <AudioFileIcon style={{ color: '#0288d1' }}/>
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.75rem", color: '#333', fontWeight: 'bold' }}>
              Audio
            </ListItemText>
            <input 
              type='file'
              multiple
              accept='audio/mp3,audio/wav,audio/mpeg'
              style={{
                display: 'none',
              }}
              ref={audioRef}  // Attach the ref here
              onChange={(e) => fileHandler(e, 'audio')}
            />
          </MenuItem>

          {/** Video Upload Menu */}
          <MenuItem 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '0.5rem', 
              borderRadius: '6px', 
              marginBottom: '0.3rem',
              transition: 'background 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f7fa'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={videoHandler}
          >
            <Tooltip title="Video">
              <VideoFileIcon style={{ color: '#0277bd' }}/>
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.75rem", color: '#333', fontWeight: 'bold' }}>
              Video
            </ListItemText>
            <input 
              type='file'
              multiple
              accept='video/mp4,video/webm,video/ogg'
              style={{
                display: 'none',
              }}
              ref={videoRef}  // Attach the ref here
              onChange={(e) => fileHandler(e, 'video')}
            />
          </MenuItem>

          {/** File Upload Menu */}
          <MenuItem 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '0.5rem', 
              borderRadius: '6px', 
              transition: 'background 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0f7fa'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={filesHandler}
          >
            <Tooltip title="File">
              <UploadFileIcon style={{ color: '#01579b' }}/>
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.75rem", color: '#333', fontWeight: 'bold' }}>
              File
            </ListItemText>
            <input 
              type='file'
              multiple
              accept='*'
              style={{
                display: 'none',
              }}
              ref={fileRef}  // Attach the ref here
              onChange={(e) => fileHandler(e, 'file')}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  )
}
