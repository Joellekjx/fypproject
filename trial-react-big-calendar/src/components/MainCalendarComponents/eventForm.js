import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import { DialogTitle, DialogContent, makeStyles, Grid, Typography, Select, MenuItem, DialogActions, Button, TextField } from '@material-ui/core';
import axiosPost from '../AxiosCalling/axiosPost';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        minWidth: 120,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        padding: '5px 5px',
    },
    // selectMenu: {
    //   maxHeight: '100px'
    // },
    // selected:{
    //   maxHeight: '100px'
    // }
}));

function EventForm({ handleClose, start, end, calendarStore }) {
    const initialState = {
        category: 'Meeting Notes',
        selectedStartDate: start,
        selectedEndDate: end,
        repeatValue: 0,
    }

    const classes = useStyles();
    const [{ category, selectedStartDate, selectedEndDate, repeatValue }, setState] = useState(initialState)

    const onSubmit = (e) => {
        e.preventDefault()

        //Check if end date is earlier than start date
        if (selectedEndDate < selectedStartDate) {
            return alert("Your end date is earlier than your start date. Please add a proper timing again.")
        }

        //Add new event by using calendarstore's add data
        //No need to add everything because on refresh, the data from backend will be replaced with this
        calendarStore.addData({ title: category, start: selectedStartDate, end: selectedEndDate });
        // console.log(calendarStore)
        // console.log("can i get the userdata, projectid from the store in eventform??")
        //Add event to backend by axios.post
        var project_id = calendarStore.getUserData.project_id
        var student_id = calendarStore.getUserData.id
        axiosPost(project_id, student_id, selectedStartDate, selectedEndDate, category, 'Pending')

        handleClose();
    }

    //Try a 'on repeat' method --> that is, potentially send onSubmit (x) times but +7 days each time

    const handleCategoryChange = (e) => { //handles category change
        const value = e.target.value;
        setState(state => ({
            ...state,
            [e.target.name]: value
        }));
    }

    const handleStartDateChange = (e) => {
        //If category is "meeting", datepicker has to change selected start and selected end's date ONLY, NOT TIME
        //If it's not a meeting, we need to send the handleStartDate, then also a different setState (where both start and end == e)
        if (category === 'Meeting Notes') {
            setState(state => ({
                ...state,
                selectedStartDate: e
            }))
        } else {
            setState(state => ({
                ...state,
                selectedStartDate: e,
                selectedEndDate: e
            }))
        }
    }

    const handleEndDateChange = (e) => {
        setState(state => ({
            ...state,
            selectedEndDate: e
        }))
    }

    const renderOthersFormView = () => {
        return (
            <React.Fragment>
                <Grid item xs={12} spacing={1}>
                    <div style={{ display: 'flex' }}>
                        <Typography className={classes.secondaryHeading}>Submission Date:</Typography>
                        <DatePicker
                            value={selectedStartDate}
                            name="selectedStartDate"
                            onChange={(e) => { handleStartDateChange(e) }}
                        >
                            Choose Submission Date:
                        </DatePicker>
                    </div>
                </Grid>
                <Grid item xs={12} spacing={1}>
                    <div style={{ display: 'flex' }}>
                        <Typography className={classes.secondaryHeading}>Submission Time:</Typography>
                        <KeyboardTimePicker
                            value={selectedStartDate}
                            onChange={(e) => { handleStartDateChange(e) }}
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

    const renderMeetingFormView = () => {
        return (
            <React.Fragment>
                <Grid item xs={12} spacing={1}>
                    <div style={{ display: 'flex' }}>
                        <Typography className={classes.secondaryHeading}>Meeting Date: </Typography>
                        <DatePicker value={selectedStartDate} name="selectedStartDate" onChange={(e) => handleStartDateChange(e)}>Choose Submission Date:</DatePicker>
                    </div>
                </Grid>
                <Grid item xs={12} spacing={1}>
                    <div style={{ display: 'flex' }}>
                        <Typography className={classes.secondaryHeading}>Timing: </Typography>
                        <KeyboardTimePicker
                            value={selectedStartDate}
                            name="selectedStartDate"
                            onChange={(e) => handleStartDateChange(e)}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            mask="__:__ _M"
                        />
                        <Typography className={classes.secondaryHeading}>-</Typography>
                        <KeyboardTimePicker
                            value={selectedEndDate}
                            name="selectedEndDate"
                            onChange={(e) => handleEndDateChange(e)}
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
        switch (category) {
            case "Weekly Report":
            case "FYP Plan Strategy":
            case "Interim Report":
            case "Final Report":
                return renderOthersFormView();
            case "Meeting Notes":
                return renderMeetingFormView();
            default:
                return (
                    <React.Fragment>
                        Please choose a category
              </React.Fragment>
                )
        }
    }

    // const changeRepeatValue = (e) => {
    //     console.log(e.target.value)

    // }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>
                <DialogTitle>Add an event</DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit} method="POST">
                        <Grid container className={classes.root} spacing={1}>
                            <Grid item xs={12}>
                                <div style={{ display: 'flex' }}>
                                    <Typography className={classes.secondaryHeading}>Category: </Typography>
                                    <Select
                                        labelId="demo-dialog-select-label"
                                        value={category}
                                        onChange={(e) => handleCategoryChange(e)}
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
                            </Grid>
                            <Grid item xs={12}>
                                {decideView()}
                            </Grid>
                            {/* 3rd: Option to repeat until? */}
                            {/* 
                                    1. Event Category (weekly report, meeting or others)
                                    1a. If "others", need to pop up a textfield to fill in what's the others
                                    2. Start Date & Time
                                    3. End Date & Time //would task_due_date be the same??
                                    4. Offer to repeat? But optional, leave if you have time
                                */}
                            {/* <div>
                                    <Typography className={classes.secondaryHeading}>Repeat?</Typography>
                                    <TextField type="number" value={repeatValue} name="repeatValue" placeholder="No. of times to repeat" onChange={e => setState({repeatValue: e.target.value})}></TextField>
                                </div> */}
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
    )
}

export default EventForm;