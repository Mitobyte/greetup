import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EventCard from "./EventCard";

const MeetingsDialog = ({ organization, handleCloseClicked }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(organization !== undefined)
  }, [organization]);

  return (
    <Dialog
      onClose={handleCloseClicked}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {organization?.name}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseClicked}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {organization?.events?.length === 0 && (
          <div className="text-center">
            <h3>No events found</h3>
          </div>
        )}
        {organization?.events?.map((event, index) => {
            return <EventCard key={`event-${index}`} event={event}/>
          })
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseClicked}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MeetingsDialog;