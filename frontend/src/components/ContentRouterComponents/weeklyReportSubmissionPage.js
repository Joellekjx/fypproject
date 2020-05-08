import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper, TextField, Button } from '@material-ui/core';
import axiosPut from '../AxiosCalling/axiosPut';
import moment from 'moment';
import axios from 'axios';
import RenderDocumentPreview from './renderDocumentPreview';
import ReusableNotesSubmission from './ContentRouterReusableComponents/ReusableNotesSubmission';
import ReusableNotesCompleted from './ContentRouterReusableComponents/ReusableNotesCompleted';

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
      <ReusableNotesCompleted
        type="Weekly Report"
        hours_spent={hours_spent}
        content={content}
        documents={documents}
        addAttachment={this.addAttachment}
        upload={this.onClickHandler}
        selectedFile={this.state.selectedFile}
        cancel={this.cancelAddAttachment}
      />
    )
  }

  addAttachment = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  cancelAddAttachment = () => {
    this.setState({
      selectedFile: null,
    })
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
    this.setState({
      selectedFile: null,
    })
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { Id, task_type, task_created, student_id, project_id, tutor_id, calendarStore } = this.props;
    const { hoursSpent, thingsCompleted } = this.state;

    const { updateWeeklyReportSubmission } = calendarStore;
    var submissionTime = moment();
    if (hoursSpent === "" || thingsCompleted === "") {
      alert("Please fill in all fields");
    } else {
      axiosPut(Id, task_type, task_created, submissionTime, project_id, student_id, tutor_id, "Completed", thingsCompleted, hoursSpent);
      this.onClickHandler();
      //Update mobx store so that front-end view can be updated simultaneously
      updateWeeklyReportSubmission(Id, 'Completed', thingsCompleted, submissionTime, hoursSpent)
    }
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
    const userType = this.props.calendarStore.getUserType;
    if (userType === 'Student') {
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
          noOfRows="7"
          selectedFile={this.state.selectedFile}
        />
      )
    } else {
      return (
        <Paper style={{ padding: '20px', marginTop: '15px' }}>
          <Typography className={classes.bodyText} style={{ fontStyle: 'italic' }}>Student has yet to submit notes</Typography>
        </Paper>
      )
    }
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
