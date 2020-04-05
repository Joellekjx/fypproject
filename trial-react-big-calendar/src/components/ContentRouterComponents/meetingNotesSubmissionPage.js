import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper, TextField, Button } from '@material-ui/core';
import moment from 'moment';
import axiosPut from '../AxiosCalling/axiosPut';
import axios from 'axios';

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
            selectedFile: null,
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
              <input type="file" name="file" onChange={this.addAttachment}/>
              <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
            </Paper>
          )
    }

    addAttachment = event => {
      //something happens in this attachment side
      // console.log(event.target.files[0])
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      })
      // console.log(this.state.selectedFile)
    }

    onClickHandler = () => {
      const data = new FormData() 
      data.append('task_id', this.props.data.Id)


      data.append('attach_document', this.state.selectedFile)
      var upload_date = moment(new Date()).format('YYYY-MM-DD HH:mm')
      data.append('uploaded_date', upload_date)

      axios.post("http://127.0.0.1:8000/api/document/", data, { // receive two parameter endpoint url ,form data 
      })
      .then(res => { // then print response status
        console.log(res.statusText);
      })
      .catch((error) => {
          console.log(error.response);
          console.log(upload_date);
      })

      //reset the state
      this.setState({
        selectedFile: null,
      })
    }
    
    onSubmitForm = (e) => {
      e.preventDefault();
      const { data, calendarStore } = this.props;
      const { Id, event_type, start } = data;
      const { updateWeeklyReportSubmission } = calendarStore;
      const { meetingNotes } = this.state;
      var submissionTime = moment();
      if(meetingNotes === "") {
          return alert("Please fill in meeting notes");
      } else {
          axiosPut(Id, event_type, start, submissionTime, data.project_id, data.student_id, data.tutor_id, "Completed", meetingNotes, 0)
          this.onClickHandler();
      }
      //Update mobx store so that front-end view can be updated simultaneously
      updateWeeklyReportSubmission(Id, 'Completed', meetingNotes, submissionTime, 0)

      //Submits the attachment to backend here:
      //Note: Please refactor this -- put it into its own file
      const formData = new FormData() 
      console.log(this.state.selectedFile);
      console.log('what is this selectedfile')
      formData.append('task_id', this.props.data.Id)


      formData.append('attach_document', this.state.selectedFile)
      var upload_date = moment(new Date()).format('YYYY-MM-DD HH:mm')
      formData.append('uploaded_date', upload_date)

      axios.post("http://127.0.0.1:8000/api/document/", formData, { // receive two parameter endpoint url ,form data 
      })
      .then(res => { // then print response status
        console.log(res.statusText);
      })
      .catch((error) => {
          console.log(error.response);
          console.log(upload_date);
      })
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
                  <input type="file" name="file" onChange={this.addAttachment}/>
                  {/* <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>  */}
                  {/* <Button onClick={this.addAttachment} style={{}}><strong>Add attachment</strong></Button> */}
                  <Button type="submit" color="primary" variant="contained" style={{float: 'right'}}>Submit Notes</Button>
                </div>
              </Paper>
            </form>
          )    
    }

    renderSwitchPaper = () => {
        const { data } = this.props;
        switch(data.status){
            case "Completed": 
                return this.renderMeetingNotesCompletedPaper();
            default:
                return this.renderMeetingNotesNotCompletedPaper();
        }
    }

    render(){
        const { classes } = this.props;
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

