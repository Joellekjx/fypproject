import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Select, InputLabel, makeStyles, FormControl, MenuItem, Grid, Typography } from '@material-ui/core';
import { DatePicker, TimePicker, MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axiosPostCalendarEvent from '../AxiosCalling/axiosPost';
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
  selectMenu: {
    maxHeight: '100px'
  },
  selected:{
    // backgroundColor: 'red',
    maxHeight: '100px'
  }
}));

function EventForm ({handleClose, start, end, calendarStore}) {
  const initialState = {
    category: 'Meeting Notes',
    selectedStartDate: start,
    selectedEndDate: end,
  }

  const classes = useStyles();
  const [{ category, selectedStartDate, selectedEndDate }, setState] = useState(initialState);

  const handleChange = e => {
    console.log('r u even inside handlechange?')
    console.log(e)
    
    
    // if (category !== 'Meeting Notes'){
    //   //Date can be changed but now the timing... haha lol
    //   setState(prevState => ({
    //     ...prevState, selectedEndDate: e 
    //   }))
    // } else {
    //   setState(prevState => ({
    //     ...prevState, selectedStartDate: e, selectedEndDate: e
    //   }))
    // }
  };

  console.log(selectedEndDate);
  console.log("did end date change?")
  console.log("did start date change?")
  console.log(selectedStartDate)
  // const handleStartChange = e => {
  //   const { name, value } = e.target;
  //   setState(selectedStartDate(value));
  // }

  // const handleEndChange = e => {
  //   setState(selectedEndDate(e.target.value))
  // }

  // const handleCategoryChange = e => {
  //   setState(category(e.target.value))
  // }

  const selectDropDown = (name, value) => {
    const dayMonthYearFormat = moment(value).format('ddd MMM DD YYYY');
    const gmtSGT = "GMT+0800 (Singapore Standard Time)";
    console.log(name);
    console.log("name above");
    console.log(selectedStartDate);
    console.log("start date above, end date below")
    console.log(selectedEndDate)
    return(
      <React.Fragment>
        {/* Need to: Show a few timings only */}
        <Select
            name={name}
            value={value}
            onChange={handleChange}
            // onChange={name==="selectedStartDate"? handleStartChange : handleEndChange}
            // style={{maxHeight: '100px'}}
            // className={classes.selectMenu}
            // MenuProps={{maxHeight: '100px'}}
            classes={{
              selectMenu: classes.selectMenu
            }}
          >
            <MenuItem value={dayMonthYearFormat + ' 00:00:00 ' + gmtSGT}>12:00AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + ' 00:30:00 ' + gmtSGT}>12:30AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + ' 01:00:00 ' + gmtSGT}>1:00AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + ' 01:30:00 ' + gmtSGT}>1:30AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + ' 02:00:00 ' + gmtSGT}>2:00AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + ' 02:30:00 ' + gmtSGT}>2:30AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + ' 03:00:00 ' + gmtSGT}>3:00AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 03:30:00 " + gmtSGT}>3:30AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 04:00:00 " + gmtSGT}>4:00AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 04:30:00 " + gmtSGT}>4:30AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 05:00:00 " + gmtSGT}>5:00AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 05:30:00 " + gmtSGT}>5:30AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 06:00:00 " + gmtSGT}>6:00AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 06:30:00 " + gmtSGT}>6:30AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 07:00:00 " + gmtSGT}>7:00AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 07:30:00 " + gmtSGT}>7:30AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 08:00:00 " + gmtSGT}>8:00AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 08:30:00 " + gmtSGT}>8:30AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 09:00:00 " + gmtSGT}>9:00AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 09:30:00 " + gmtSGT}>9:30AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 10:00:00 " + gmtSGT}>10:00AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 10:30:00 " + gmtSGT}>10:30AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 11:00:00 " + gmtSGT}>11:00AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 11:30:00 " + gmtSGT}>11:30AM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 12:00:00 " + gmtSGT}>12:00PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 12:30:00 " + gmtSGT}>12:30PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 13:00:00 " + gmtSGT}>1:00PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 13:30:00 " + gmtSGT}>1:30PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 14:00:00 " + gmtSGT}>2:00PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 14:30:00 " + gmtSGT}>2:30PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 15:00:00 " + gmtSGT}>3:00PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 15:30:00 " + gmtSGT}>3:30PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 16:00:00 " + gmtSGT}>4:00PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 16:30:00 " + gmtSGT}>4:30PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 17:00:00 " + gmtSGT}>5:00PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 17:30:00 " + gmtSGT}>5:30PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 18:00:00 " + gmtSGT}>6:00PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 18:30:00 " + gmtSGT}>6:30PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 19:00:00 " + gmtSGT}>7:00PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 19:30:00 " + gmtSGT}>7:30PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 20:00:00 " + gmtSGT}>8:00PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 20:30:00 " + gmtSGT}>8:30PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 21:00:00 " + gmtSGT}>9:00PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 21:30:00 " + gmtSGT}>9:30PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 22:00:00 " + gmtSGT}>10:00PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 22:30:00 " + gmtSGT}>10:30PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 23:00:00 " + gmtSGT}>11:00PM</MenuItem>
            <MenuItem value={dayMonthYearFormat + " 23:30:00 " + gmtSGT}>11:30PM</MenuItem>
        </Select> 
      </React.Fragment>
    )
  }

  const submitForm = e => { //note to self: need to actually check if start date is earlier than end date!!
    e.preventDefault();
    // handleEndDateChange(selectedStartDate);
    //Check if start and end dates are weekends
    // if (selectedStartDate.getDay() === 6 || selectedStartDate.getDay() === 0){return alert("You have selected a weekend. Please choose a weekday only.")}
    // console.log(selectedStartDate);
    // console.log(selectedEndDate);

    //check the date somewhere
    //but let's do a risky post first

    if (category===""){ 
      return alert("Please choose a category");
    } else {
      // axiosPostCalendarEvent(selectedStartDate, selectedEndDate, category, "Pending")
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


  /**
   * All Other Forms: 1 date, 1 timing
   * selectedStartDate = current date/any chosen date
   * selectedEndDate = selectedStartDate
   */
  const renderOthersFormView = () => {
    return(
      <React.Fragment>
        <Grid item xs={12}>
          <div style={{display: 'flex'}}>
            <Typography className={classes.secondaryHeading}>Submission Date:</Typography>
            <DatePicker 
              value={selectedStartDate} 
              name="selectedStartDate" 
              onChange={(e) => { handleChange(e) }}>
                Choose Submission Date:
            </DatePicker>
          </div>
          {/* <TimePicker label="Choose Start Time" value={selectedStartDate} onChange={handleStartDateChange} /> */}
        </Grid>
        <Grid item xs={12}>
          <div style={{display: 'flex'}}>
            <Typography className={classes.secondaryHeading}>Submission Time:</Typography>
            {/* <KeyboardTimePicker 
              value={selectedStartDate}
              onChange={handleStartDateChange} 
              KeyboardButtonProps={{
                'aria-label': 'change time',  
              }}
              mask="__:__ _M"
            /> */}
            {selectDropDown('selectedStartDate', selectedStartDate)}
          </div>
        </Grid>
      </React.Fragment>
    )
  }

  // const onChangeDate = (e) => {
  //   console.log(e.target.value)
  //   // handleStartDateChange(e.target.value);
  //   // handleEndDateChange(e.target.value);
  // }

  /**
   * Meeting Form: 1 date, 2 timings
   * selectedStartDate = current date + 1st timing
   * selectedEndDate = current date + 2nd timing (there is no date choosing for this)
   */
  const renderMeetingFormView = () => {
    return(
      <React.Fragment>
        <Grid item xs={12}>
          <div style={{display: 'flex'}}>
            <Typography className={classes.secondaryHeading}>Meeting Date:</Typography>
            <DatePicker value={selectedStartDate} name='selectedStartDate' onChange={(e) => { handleChange(e)} }>Choose Submission Date:</DatePicker>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{display: 'flex'}}>
            <Typography className={classes.secondaryHeading}>Timing:</Typography>
            {/* <KeyboardTimePicker 
              value={selectedStartDate}
              onChange={handleStartDateChange} 
              KeyboardButtonProps={{
                'aria-label': 'change time',  
              }}
              mask="__:__ _M"
            /> */}
            {selectDropDown('selectedStartDate', selectedStartDate)}
            {/* {selectDropDown("selectedStartDate")} */}
            {/* {selectDropDown(moment(selectedStartDate).format("hh:mm:ss"))} */}
            <Typography className={classes.secondaryHeading}>-</Typography>
            {/* <KeyboardTimePicker 
              value={selectedEndDate}
              onChange={handleEndDateChange} 
              KeyboardButtonProps={{
                'aria-label': 'change time',  
              }}
              mask="__:__ _M"
            /> */}
            {selectDropDown('selectedEndDate', selectedEndDate)}
            {/* {selectDropDown("selectedEndDate")} */}
            {/* {selectDropDown(moment(selectedEndDate).format("hh:mm:ss"))} */}
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
                          name="category"
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