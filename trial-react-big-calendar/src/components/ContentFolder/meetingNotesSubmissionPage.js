import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper, TextField, Button } from '@material-ui/core';
import moment from 'moment';
import axiosPut from '../AxiosCalling/axiosPut';

const useStyles = (theme) => ({
    root: {
        width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
      fontWeight: 'bold'
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 'bold',
      padding: '5px 0px',
    },
    bodyText: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      padding: '5px 0px',
    },
    paper: {
      width: '80%',
      padding: '15px',
      marginTop: '15px',
    }
})

class MeetingNotesSubmissionPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            meetingNotes: "",
        }
    }

    renderMeetingNotesCompletedPaper = () => {
        const { classes, data } = this.props;
        return(
            <Paper elevation={2} className={classes.paper}>
              <div style={{padding: '0 10px 10px 10px'}}>
                <Typography className={classes.bodyText}>
                  {data.content}
                </Typography>
              </div>
            </Paper>
          )
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        const { data } = this.props;
        const { meetingNotes } = this.state;
        var submissionTime = moment();

        if(meetingNotes === "") {
            alert("Please fill in meeting notes");
        } else {
            axiosPut(data.Id, data.task_type, data.task_created, submissionTime, data.project_id, data.student_id, data.tutor_id, "Completed", meetingNotes)
        }
    }

    handleChange = event => {
        this.setState({...this.state, [event.target.name]: event.target.value})
    }

    renderMeetingNotesNotCompletedPaper = () => {
        const { classes, data } = this.props;
        const { meetingNotes } = this.state;
        return(
            <form  noValidate autoComplete="off" onSubmit={this.onSubmitForm} method="POST">
              <Paper elevation={2} className={classes.paper}>
                {/* <Typography className={classes.secondaryHeading}>
                  Things completed:
                </Typography> */}
                <TextField 
                  variant="outlined"
                  multiline
                  rows="4"
                  style={{width: '100%'}}
                  value={meetingNotes}
                  onChange={this.handleChange}
                  name="meetingNotes"
                />
                <div style={{padding: '10px 0px 5px 0px'}}>
                  <Button onClick={this.addAttachment} style={{}}><strong>Add attachment</strong></Button>
                  <Button type="submit" color="primary" variant="contained" style={{float: 'right'}}>Submit Notes</Button>
                </div>
              </Paper>
            </form>
          )    
    }

    renderSwitchPaper = () => {
        const { data } = this.props;
        console.log(data.status);
        switch(data.status){
            case "Completed": 
                return this.renderMeetingNotesCompletedPaper();
            default:
                return this.renderMeetingNotesNotCompletedPaper();
        }
    }

    render(){
        const { classes, data } = this.props;
        console.log(data);
        return(
            <div style={{width: '100%'}}>
                <Typography className={classes.heading}>Meeting Notes:</Typography>
                {this.renderSwitchPaper()}
            </div>
        )
    }
}

MeetingNotesSubmissionPage = observer(MeetingNotesSubmissionPage)
export default withStyles(useStyles)(MeetingNotesSubmissionPage);

