import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper, TextField, Button } from '@material-ui/core';
import axiosPut from '../AxiosCalling/axiosPut';
import moment from 'moment';
import axios from 'axios';
import RenderDocumentPreview from './renderDocumentPreview';
import ReusableNotesSubmission from './ContentRouterReusableComponents/ReusableNotesSubmission';

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

class WeeklyReportSubmissionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoursSpent: "",
      thingsCompleted: "",
      selectedFile: null,
    }
  }

  renderWeeklyReportCompletedPaper = () => {
    const { classes, content, hours_spent, documents } = this.props;
    return (
      <Paper elevation={2} className={classes.paper}>
        <div style={{ display: 'flex', padding: '10px' }}>
          <Typography className={classes.secondaryHeading}>
            Hours spent: &nbsp;
          </Typography>
          <Typography className={classes.bodyText}>
            {hours_spent}
          </Typography>
        </div>
        <div style={{ padding: '0 10px 10px 10px' }}>
          <Typography className={classes.secondaryHeading}>
            Things completed:
          </Typography>
          <Typography className={classes.bodyText}>
            {content}
          </Typography>
        </div>
        <input type="file" name="file" onChange={this.addAttachment} />
        <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
        <Typography>Attachments: </Typography>
        {documents.map((item, index) => {
          return <RenderDocumentPreview document={item} key={index}/>
        })}
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
    data.append('task_id', this.props.Id)
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
    console.log(this.state.selectedFile);
    console.log("hello do u enter here after submitting?")
    this.setState({
      selectedFile: null,
    })
    console.log(this.state.selectedFile)
    console.log("what about after this?")
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    //Note to self: Can u like lol reduce the props here some how???
    const { Id, task_type, task_created, student_id, project_id, tutor_id, calendarStore } = this.props;
    const { hoursSpent, thingsCompleted } = this.state;

    const { updateWeeklyReportSubmission } = calendarStore;
    var submissionTime = moment();
    if (hoursSpent === "" || thingsCompleted === "") {
      alert("Please fill in all fields");
    } else {
      axiosPut(Id, task_type, task_created, submissionTime, project_id, student_id, tutor_id, "Completed", thingsCompleted, hoursSpent);
      this.onClickHandler();
    }

    //Update mobx store so that front-end view can be updated simultaneously
    updateWeeklyReportSubmission(Id, 'Completed', thingsCompleted, submissionTime, hoursSpent)
  }

  handleChange = event => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
    })
  }

  renderWeeklyReportPendingPaper = () => {
    const { classes } = this.props;
    const { hoursSpent, thingsCompleted } = this.state;

    return (
      <ReusableNotesSubmission 
        type="Weekly Report"
        onSubmitForm={this.onSubmitForm}
        handleChange={this.handleChange}
        addAttachment={this.addAttachment}
        textfieldValue={thingsCompleted}
        textfieldName="thingsCompleted"
        buttonLabel="Submit"
        textfieldValue2={hoursSpent}
        textfieldName2="hoursSpent"
        onClickHandler={this.onClickHandler}
        noOfRows="7"
      />
    )
  }

  renderSwitchPaper = (status) => {
    switch (status) {
      case "Completed":
      case "Late Submission":
        return this.renderWeeklyReportCompletedPaper();
      default:
        return this.renderWeeklyReportPendingPaper();
    }
  }

  render() {
    const { classes, status } = this.props;

    return (
      <div style={{ width: '100%' }}>
        <Typography className={classes.heading}>Weekly Report Submission</Typography>
        {this.renderSwitchPaper(status)}
      </div>
    )
  }
}

WeeklyReportSubmissionPage = observer(WeeklyReportSubmissionPage);
export default withStyles(useStyles)(WeeklyReportSubmissionPage);
