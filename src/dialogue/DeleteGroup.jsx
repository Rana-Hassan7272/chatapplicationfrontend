import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import React from 'react';

const DeleteGroup = ({ open, deleteHandler, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this group?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteHandler}>Yes</Button>
        <Button color='error' onClick={handleClose}>No</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteGroup;