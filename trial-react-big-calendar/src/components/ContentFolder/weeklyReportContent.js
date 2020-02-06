import React, { Component } from 'react';
import { Paper, Typography, Grid, Box, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider } from '@material-ui/core';
import { observer } from 'mobx-react';
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import WeeklyReportSubmissionPage from './weeklyReportSubmissionPage';
import WeeklyReportCommentBox from './weeklyReportCommentBox';
import axiosGetFullData from "../AxiosCalling/axiosGetFullData";

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
  constructor(props){
    super(props);
    this.state = {
      weeklyReportArray: [],
      testArray: [1, 2, 3, 4, 5],
    }
  }

  renderWeeklyReportExpansionPanel = () => {
    const { calendarStore, classes } = this.props;
    const { getData } = calendarStore;

    return(
      getData
        .filter(indivData => indivData.event_type === "Weekly Report")
        .slice().sort((a,b) => { //sort the dates so most recent date of submission is below
          return new Date(a.start).getTime() - new Date(b.end).getTime()
        })
        .map((text, index) => {
          return(
            // <div className={classes.root} key={index} style={{height: '100%'}}>
              <ExpansionPanel defaultExpanded style={{overflow: 'hidden'}} className={classes.root} key={index}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon/>}
                >
                  <Grid container spacing={4}>
                    <Grid item xs={1} />
                    <Grid item xs={2}>
                      {/* Week nos. */}
                      {console.log(index)}
                      {/* NOTE TO SELF: Pls remove this afterwards. This is just a tester!! */}
                      <Typography className={classes.secondaryHeading}>{text.Id}</Typography>
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
                        {text.submission_date === null ? "Not submitted yet" : "Submitted on " + moment(text.submission_date).format("DD/MM/YYYY") }
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {/* No. of hours */}
                      <Typography className={classes.secondaryHeading}>{text.hours_spent}</Typography>
                    </Grid>
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                  <div className={classes.column}>
                    <WeeklyReportSubmissionPage calendarStore={calendarStore} task_type={text.event_type} task_created={text.end} student_id={text.student_id} tutor_id={text.tutor_id} project_id={text.project_id} Id={text.Id} hours_spent={text.hours_spent} content={text.content} status={text.status} />
                  </div>
                  <div className={classes.column}>
                    <WeeklyReportCommentBox calendarStore={calendarStore} status={text.status} />
                  </div>
                </ExpansionPanelDetails>
                <Divider/>
              </ExpansionPanel>
            // </div>
          )  
      }
      )
      )
    // )
  }

  renderHeader = () => {
    return(
      <Grid container spacing={3}>
        <Grid item xs={1}/>
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            <Box fontWeight="fontWeightBold">
              Week No.
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            <Box fontWeight="fontWeightBold">
              Submission Status
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            <Box fontWeight="fontWeightBold">
              Deadline
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            <Box fontWeight="fontWeightBold">
              Submitted Date
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            <Box fontWeight="fontWeightBold">
              No. of hours
            </Box>
          </Typography>
        </Grid>
      </Grid>
    )
  }

  render(){
    return(
    <div style={{width: '100%'}}>
      <div>
        <Paper>
          <Paper style={{position: "sticky", top: '4.5rem', height: '50px'}}>
            {this.renderHeader()} 
            {/* Honestly a bit buggy looking lol need to fix sticky issue else push expansion panel to the back */}
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
