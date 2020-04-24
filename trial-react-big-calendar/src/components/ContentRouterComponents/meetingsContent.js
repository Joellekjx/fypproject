import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Box, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MeetingNotesAttachmentPage from './meetingNotesAttachmentPage';
import MeetingNotesSubmissionPage from './meetingNotesSubmissionPage';
import * as dates from '../../utils/dates'
import axios from 'axios';
import ReusableExpansionHeader from './ContentRouterReusableComponents/ReusableExpansionHeader';

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

class MeetingsContent extends Component {
  constructor(props) {
  super(props);
  this.state = {
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

  renderHeader = () => {
    return(
      <ReusableExpansionHeader 
        week_no='Week No.'
        title1='Meeting Date'
        title2='Meeting Notes'
        title3='Attachments?'
        title4='Comments'
      />
    )
  }

  calculateWeekNo = (date) => {
    //If we just focus on sem 2 and disregard anything in sem1...
    const { semesterTwoStart } = this.state;
    var date = moment(date)
    var formattedSemesterTwoStart = moment(semesterTwoStart)
    let week_no = Math.floor(dates.diff(date, formattedSemesterTwoStart, 'day') / 7 + 1)
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

  renderMeetingsExpansionPanel = () => {
    const { calendarStore, classes } = this.props;
    const { getData } = calendarStore;

    return(
      getData
        .filter(indivData => indivData.event_type === "Meeting Notes")
        .slice().sort((a,b) => { //sort the dates so most recent date of submission is below
          return new Date(a.start).getTime() - new Date(b.end).getTime()
        })
        .map((text, index) => {
          return(
              <ExpansionPanel id={text.Id} defaultExpanded style={{overflow: 'hidden'}} className={classes.root} key={index}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                  <Grid container spacing={4} style={{display: 'flex'}}>
                    <Grid item xs={1} />
                    <Grid item xs={2}>
                      {/* Week nos. */}
                      {/* NOTE TO SELF: Pls remove this afterwards. This is just a tester!! */}
                      <Typography  className={classes.secondaryHeading}>{this.calculateWeekNo(text.end)}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {/* Meeting Date */}
                      <Typography className={classes.secondaryHeading}>
                        {moment(text.start).format("dddd, MMMM DD")}
                      </Typography>
                      <Typography className={classes.secondaryHeading}>
                        {moment(text.start).format('HH:mmA')}
                        &nbsp;-&nbsp;
                        {moment(text.end).format('HH:mmA')}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}> 
                      {/* Meeting Notes: whether it's available or not */}
                      {/* {text.event_type} */}
                      <Typography className={classes.secondaryHeading}>{text.status === "Completed" ? "Available" : "Not available"}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {/* Are there any attachments?  */}
                      <Typography className={classes.secondaryHeading} style={{fontStyle: 'italic'}}>
                        No attachments
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {/* Other comments */}
                      <Typography className={classes.secondaryHeading} style={{fontStyle: 'italic'}}>No comments</Typography>
                    </Grid>
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details} style={{paddingBottom: '40px'}}>
                  <div className={classes.column}>
                    <MeetingNotesSubmissionPage data={text} calendarStore={calendarStore}/>
                  </div>
                  <div className={classes.column}>
                    <MeetingNotesAttachmentPage />
                  </div>
                </ExpansionPanelDetails>
                <Divider/>
              </ExpansionPanel>
            )  
          }
        )
      )
  }

  render(){
    return (
      <div style={{width: '100%'}}>
        {/* <Button onClick={this.jumpToId}>Jump to view</Button> */}
        <div>
          <Paper>
            <Paper style={{position: "sticky", top: '4.5rem', height: '50px', zIndex: '2'}}>
              {this.renderHeader()} 
            </Paper>
            {this.renderMeetingsExpansionPanel()}
          </Paper>
          {/* <Button onClick={this.jumpToId}>Jump to an ID of: 26</Button> */}
        </div>
        <Paper>
        </Paper>
    </div>
    );
  }
}

MeetingsContent = observer(MeetingsContent);
export default withStyles(useStyles)(MeetingsContent);