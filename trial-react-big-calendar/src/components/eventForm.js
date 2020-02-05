import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Select, InputLabel, makeStyles, FormControl, MenuItem, Grid } from '@material-ui/core';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { observer } from 'mobx-react-lite';
import axiosPostCalendarEvent from './AxiosCalling/axiosPost';

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

function EventForm ({handleClose, start, end, calendarStore}) {
  const classes = useStyles();
  const [ category, setCategory ] = React.useState('');
  const [selectedStartDate, handleStartDateChange] = useState(start);
  const [selectedEndDate, handleEndDateChange] = useState(end);

  const handleChange = event => {
    setCategory(event.target.value || '');
  }

  const submitForm = e => { //note to self: need to actually check if start date is earlier than end date!!
    if(e){
      e.preventDefault();
    }

    //check the date somewhere
    //but let's do a risky post first

    if (category===""){ 
      //note to self: axios.posting "others" doesn't work. needs to be specific
      axiosPostCalendarEvent(selectedStartDate, selectedEndDate, "Final Report", "Pending");
      calendarStore.addData({ //note to self: u need to somehow use the task id
        //then maybe u can consider deleting... but how lol
        title: "Others",
        start: selectedStartDate,
        end: selectedEndDate,
        event_type: "Others",
        status: "Pending"
      })
    } else {
      axiosPostCalendarEvent(selectedStartDate, selectedEndDate, category, "Pending")
      calendarStore.addData({
          title: category,
          start: selectedStartDate,
          end: selectedEndDate,
          event_type: category,
          status: "Pending"
      })
    }
    handleClose();
  }

  // console.log(category);

  return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div>
          <DialogTitle id="alert-dialog-title">Add Calendar Event</DialogTitle>
          <DialogContent>
            <form action="/" method="POST" onSubmit={submitForm}>

              {/* 1st: Select Category */}
              <Grid container>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl} fullWidth>
                        <InputLabel htmlFor="demo-dialog-select-label">Category</InputLabel>
                        <Select
                          labelId="demo-dialog-select-label"
                          value={category}
                          onChange={handleChange}
                          id="select-category"
                        > 
                          <MenuItem value="Weekly Report">Weekly Report</MenuItem>
                          <MenuItem value="Meeting Notes" label="Meeting">Meeting</MenuItem>
                          <MenuItem value="Others">Others</MenuItem>
                        </Select>
                  </FormControl>
                </Grid>

              {/* 2nd: Select Date & Time */}
              <Grid item xs={12}>
                <DatePicker label="Choose Start Date" value={selectedStartDate} onChange={handleStartDateChange} />
                
                <TimePicker label="Choose Start Time" value={selectedStartDate} onChange={handleStartDateChange} />
              </Grid>
              <Grid item xs={12}>
                <DatePicker label="Choose End Date" value={selectedEndDate} onChange={handleEndDateChange} />
                <TimePicker label="Choose End Time" value={selectedEndDate} onChange={handleEndDateChange} />
              </Grid>

              {/* 3rd: Option to repeat until? */}
              {/* 
                1. Event Category (weekly report, meeting or others)
                1a. If "others", need to pop up a textfield to fill in what's the others
                2. Start Date & Time
                3. End Date & Time //would task_due_date be the same??
                4. Offer to repeat? But optional, leave if you have time
              */}
              
              </Grid>
            
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" autoFocus>
                  Add Event
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
      </div>
    </MuiPickersUtilsProvider>
  );
}

// EventForm = observer(EventForm);
export default EventForm;