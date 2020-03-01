import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, TimePicker, MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import { DialogTitle, DialogContent, Grid, Typography, Select, MenuItem } from '@material-ui/core';

function EventForm({handleClose, start, end, calendarStore}) {
    const initialState = {
        category: 'Meeting Notes',
        selectedStartDate: start,
        selectedEndDate: end,
    }

    const [{ category, selectedStartDate, selectedEndDate }, setState] = useState(initialState)

    const onSubmit = () => {
        console.log("submitted")
    }

    const handleChange = (e) => {
        console.log("changing handle")
        console.log(e.target.name)
        console.log(e.target.value)
        const value = e.target.value;
        setState(state => ({
            ...state,
            [e.target.name]: value
        }));
    }

    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>
                <DialogTitle>Add an event</DialogTitle>
                <DialogContent>
                    <form action="/" method="POST" onSubmit={onSubmit}>
                        <Grid container>
                            <Grid item xs={12}>
                                <div style={{display: 'flex'}}>
                                    <Typography>Category: </Typography>
                                    <Select
                                        labelId="demo-dialog-select-label"
                                        value={category}
                                        onChange={(e) => handleChange(e)}
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
                        </Grid>
                    </form>
                </DialogContent>
            </div>
        </MuiPickersUtilsProvider>
    )
}

export default EventForm;