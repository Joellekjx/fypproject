import React, { Component } from 'react';
import { Paper, Typography, Button, Grid, Box, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider } from '@material-ui/core';
import { observer } from 'mobx-react';
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import WeeklyReportSubmissionPage from './weeklyReportSubmissionPage';
import WeeklyReportCommentBox from './weeklyReportCommentBox';
import axios from 'axios';
import * as dates from '../../utils/dates'
import ReusableExpansionHeader from './ReusableComponents/ReusableExpansionHeader';

const useStyles = (theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  details: {
    float: 'center',
  },
  column: {
    flexBasis: '50%',
    padding: '0 30px',
  }
})

class WeeklyReportContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weeklyReportArray: [],
      testArray: [1, 2, 3, 4, 5],
      semesterTwoStart: '',
      semesterOneStart: '',
    }
  }

  componentDidMount() {
    const BASEURL = 'http://127.0.0.1:8000'
    axios.get(`${BASEURL}/api/semesterStart/`)
      .then(res => {
        this.setState({ semesterOneStart: res.data[0].start_date, semesterTwoStart: res.data[1].start_date })
      })
  }

  calculateWeekNo = (date) => {
    //If we just focus on sem 2 and disregard anything in sem1...
    const { semesterTwoStart } = this.state;
    var date = moment(date)
    var formattedSemesterTwoStart = moment(semesterTwoStart)
    let week_no = dates.diff(date, formattedSemesterTwoStart, 'day') / 7 + 1
    if (date >= formattedSemesterTwoStart) {
      if (week_no <= 14) {
        switch (week_no) {
          case 8: week_no = 'Recess Week'
            break;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14: week_no -= 1
            break;
          default: break;
        }
        return week_no
      }
    }
    return week_no
  }

  renderWeeklyReportExpansionPanel = () => {
    const { calendarStore, classes } = this.props;
    const { getData } = calendarStore;
    var user_data_id = calendarStore.getUserData.id
    return (
      getData
        .filter(indivData => indivData.event_type === "Weekly Report")
        .slice().sort((a, b) => { //sort the dates so most recent date of submission is below
          return new Date(a.start).getTime() - new Date(b.end).getTime()
        })
        .map((text, index) => {
          return (
            <ExpansionPanel id={text.Id} defaultExpanded style={{ overflow: 'hidden' }} className={classes.root} key={index}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Grid container spacing={4}>
                  <Grid item xs={1} />
                  <Grid item xs={2}>
                    {/* Week nos. */}
                    <Typography className={classes.secondaryHeading}>{this.calculateWeekNo(text.end)}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {/* Status */}
                    <Typography className={classes.secondaryHeading}>{text.status}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {/* Submission date -- need to format it to reflect date only */}
                    {/* {text.event_type} */}
                    <Typography className={classes.secondaryHeading}>{moment(text.end).format("DD/MM/YYYY")}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {/* Submitted date */}
                    <Typography className={classes.secondaryHeading}>
                      {text.submission_date === null ? "Not submitted yet" : "Submitted on " + moment(text.submission_date).format("DD/MM/YYYY")}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {/* No. of hours */}
                    <Typography className={classes.secondaryHeading}>{text.hours_spent}</Typography>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details} style={{ paddingBottom: '40px' }}>
                <div className={classes.column}>
                  <WeeklyReportSubmissionPage calendarStore={calendarStore} documents={text.documents} task_type={text.event_type} task_created={text.end} student_id={text.student_id} tutor_id={text.tutor_id} project_id={text.project_id} Id={text.Id} hours_spent={text.hours_spent} content={text.content} status={text.status} />
                </div>
                <div className={classes.column}>
                  {/* Inside comment box, the user_id should be your own, not the student's. Because prof & student can both type in */}
                  <WeeklyReportCommentBox comments={text.comments} calendarStore={calendarStore} status={text.status} id={text.Id} user_id={user_data_id} />
                </div>
              </ExpansionPanelDetails>
              <Divider />
            </ExpansionPanel>
            // </div>
          )
        }
        )
    )
    // )
  }

  renderHeader = () => {
    return (
      <ReusableExpansionHeader
        week_no='Week No.'
        title1='Submission Status'
        title2='Deadline'
        title3='Submitted Date'
        title4='No. of hours'
      />
    )
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <div>
          <Typography style={{ paddingBottom: '40px' }}>
            {/* {calendarStore.} */}
          </Typography>
          {/* <Button onClick={this.jumpToId}>Jump to view</Button> */}
        </div>
        <div>
          <Paper>
            <Paper style={{ position: "sticky", top: '4.5rem', height: '50px', zIndex: '2' }}>
              {this.renderHeader()}
            </Paper>
            {this.renderWeeklyReportExpansionPanel()}
          </Paper>
        </div>
        <Paper>
        </Paper>
      </div>
    )
  }
}

WeeklyReportContent = observer(WeeklyReportContent);
export default withStyles(useStyles)(WeeklyReportContent);
