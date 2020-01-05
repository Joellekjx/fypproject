import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

const EventForm = ({handleClose}) => {
  return (
    <div>
        <DialogTitle id="alert-dialog-title">{"Add Calendar Event"}</DialogTitle>
        <DialogContent>
          <form action="/" method="POST" onSubmit={(e) => { e.preventDefault(); alert('Submitted form!'); this.handleClose(); } }>
          This dialog spans the entire width of the screen.
          Lalalalal
          changing something to commit
          <TextField name="email"/>
          <TextField name="pwd" type="password"/>
          <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
            {/* {actions} */}
          </div>
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Add Event
          </Button>
        </DialogActions>
    </div>
  );
}

export default EventForm;