import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Select, InputLabel, Grid, FormLabel, FormControlLabel, makeStyles, FormControl, MenuItem, Input } from '@material-ui/core';
// import DatePicker from './dateTimePicker';
// import { useStyles } from '@material-ui/pickers/views/Month/MonthView';
// import {  } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function EventForm ({handleClose}) {
  const classes = useStyles();
  const [ category, setCategory ] = React.useState('');
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleChange = event => {
    setCategory(event.target.value || '');
  }

  return (
    <div>
        <DialogTitle id="alert-dialog-title">Add Calendar Event</DialogTitle>
        <DialogContent>
          <form className={classes.container} action="/" method="POST" onSubmit={(e) => { e.preventDefault(); alert('Submitted form!'); this.handleClose(); } }>
            {/* 1st FormControl: Select Category */}
            <FormControl className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="demo-dialog-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-dialog-select-label"
                    value={category}
                    // input={<Input />}
                    onChange={handleChange}
                    id="select-category"
                  > 
                    <MenuItem value="Weekly Report">Weekly Report</MenuItem>
                    <MenuItem value="Meetings">Meeting</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
            </FormControl>

            {/* 2nd FormControl: Select Date & Time */}
            <DatePicker
              label="Basic example"
              value={selectedDate}
              onChange={handleDateChange}
              animateYearScrolling
            />

            {/* 3rd FormControl: Option to repeat until? */}
            {/* 
              1. Event Category (weekly report, meeting or others)
              1a. If "others", need to pop up a textfield to fill in what's the others
              2. Start Date & Time
              3. End Date & Time //would task_due_date be the same??
              4. Offer to repeat? But optional

            */}
            {/* <TextField name="event"/> */}
            {/* <TextField name="pwd" type="password"/> */}
            {/* <DatePicker /> */}
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