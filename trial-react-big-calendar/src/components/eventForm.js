import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Select, InputLabel, makeStyles, FormControl, MenuItem, Grid, Typography } from '@material-ui/core';
import { DatePicker, TimePicker, MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axiosPostCalendarEvent from './AxiosCalling/axiosPost';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    padding: '5px 5px',
  },
}));

function EventForm ({handleClose, start, end, calendarStore}) {
  const classes = useStyles();
  const [ category, setCategory ] = React.useState('Meeting Notes');
  const [selectedStartDate, handleStartDateChange] = useState(start);
  const [selectedEndDate, handleEndDateChange] = useState(end);

  const handleChange = event => {
    setCategory(event.target.value || '');
  }

  const submitForm = e => { //note to self: need to actually check if start date is earlier than end date!!
    e.preventDefault();
    handleEndDateChange(selectedStartDate);
    //Check if start and end dates are weekends
    if (selectedStartDate.getDay() === 6 || selectedStartDate.getDay() === 0){return alert("You have selected a weekend. Please choose a weekday instead.")}
    console.log(selectedStartDate);
    console.log(selectedEndDate);

    //check the date somewhere
    //but let's do a risky post first

    // if (category===""){ 
    //   return alert("Please choose a category");
    // } else {
    //   axiosPostCalendarEvent(selectedStartDate, selectedEndDate, category, "Pending")
    //   calendarStore.addData({
    //       title: category,
    //       start: selectedStartDate,
    //       end: selectedEndDate,
    //       event_type: category,
    //       status: "Pending"
    //   })
    // }
    handleClose();
  }

  const renderOthersFormView = () => {
    return(
      <React.Fragment>
        <Grid item xs={12}>
          <div style={{display: 'flex'}}>
            <Typography className={classes.secondaryHeading}>Submission Date:</Typography>
            <DatePicker value={selectedStartDate} onChange={handleStartDateChange}>Choose Submission Date:</DatePicker>
          </div>
          {/* <TimePicker label="Choose Start Time" value={selectedStartDate} onChange={handleStartDateChange} /> */}
        </Grid>
        <Grid item xs={12}>
          <div style={{display: 'flex'}}>
            <Typography className={classes.secondaryHeading}>Submission Time:</Typography>
            <KeyboardTimePicker 
              value={selectedStartDate}
              onChange={handleStartDateChange} 
              KeyboardButtonProps={{
                'aria-label': 'change time',  
              }}
              mask="__:__ _M"
            />
          </div>
        </Grid>
      </React.Fragment>
    )
  }

  const onChangeDate = (e) => {
    console.log(e.target.value)
    // handleStartDateChange(e.target.value);
    // handleEndDateChange(e.target.value);
  }

  const renderMeetingFormView = () => {
    return(
      <React.Fragment>
        <Grid item xs={12}>
          <div style={{display: 'flex'}}>
            <Typography className={classes.secondaryHeading}>Meeting Date:</Typography>
            <DatePicker value={selectedStartDate} onChange={handleStartDateChange}>Choose Submission Date:</DatePicker>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{display: 'flex'}}>
            <Typography className={classes.secondaryHeading}>Timing:</Typography>
            <KeyboardTimePicker 
              value={selectedStartDate}
              onChange={handleStartDateChange} 
              KeyboardButtonProps={{
                'aria-label': 'change time',  
              }}
              mask="__:__ _M"
            />
            <Typography className={classes.secondaryHeading}>-</Typography>
            <KeyboardTimePicker 
              value={selectedEndDate}
              onChange={handleEndDateChange} 
              KeyboardButtonProps={{
                'aria-label': 'change time',  
              }}
              mask="__:__ _M"
            />
          </div>
        </Grid>
      </React.Fragment>
    )
  }
  const decideView = () => {
    switch(category){
      case "Weekly Report":
      case "FYP Plan Strategy":
      case "Interim Report":
      case "Final Report":
        return renderOthersFormView();
      case "Meeting Notes":
        return renderMeetingFormView();
      default:
        return(
          <React.Fragment>
            Please choose a category
          </React.Fragment>
        )

    }
  }

  const decideCategoryName = () => {
    switch(category){
      case "Weekly Report": return "Weekly Report Submission Date";
      case "Meeting Notes": return "Meeting Date";
      case "FYP Plan Strategy": return "FYP Plan Submission Date";
      case "Interim Report": return "Interim Report Submission Date";
      case "Final Report": return "Final Report Submission Date";
      default: return "Calendar Event";
    }
  }

  return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div>
          <DialogTitle id="alert-dialog-title">Add {decideCategoryName()}</DialogTitle>
          <DialogContent>
            <form action="/" method="POST" onSubmit={submitForm}>
              {/* 1st: Select Category */}
              <Grid container className={classes.root} spacing={1}>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl} fullWidth>
                    <div style={{display: 'flex'}}>
                        <Typography className={classes.secondaryHeading}>Category:</Typography>
                        {/* <InputLabel htmlFor="demo-dialog-select-label">Category</InputLabel> */}
                        <Select
                          labelId="demo-dialog-select-label"
                          value={category}
                          onChange={handleChange}
                          id="select-category"
                        > 
                          <MenuItem value="Weekly Report">Weekly Report</MenuItem>
                          <MenuItem value="Meeting Notes" label="Meeting">Meeting</MenuItem>
                          <MenuItem value="FYP Plan Strategy">FYP Plan Submission</MenuItem>
                          <MenuItem value="Interim Report">Interim Report Submission</MenuItem>
                          <MenuItem value="Final Report">Final Report Submission</MenuItem>
                        </Select>
                    </div>
                  </FormControl>
                </Grid>

              {/* 2nd: Select Date & Time */}
              {/* <div> */}
                {decideView()}
              {/* </div> */}

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
                <Button type="submit" variant="contained" color="primary" autoFocus>
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