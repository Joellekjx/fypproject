import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Box, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MeetingNotesAttachmentPage from './meetingNotesAttachmentPage';
import MeetingNotesSubmissionPage from './meetingNotesSubmissionPage';

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
              Meeting Date
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            <Box fontWeight="fontWeightBold">
              Meeting Notes
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            <Box fontWeight="fontWeightBold">
              Attachments?
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            <Box fontWeight="fontWeightBold">
              Comments
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    )
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
              <ExpansionPanel defaultExpanded style={{overflow: 'hidden'}} className={classes.root} key={index}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                  <Grid container spacing={4}>
                    <Grid item xs={1} />
                    <Grid item xs={2}>
                      {/* Week nos. */}
                      {console.log(text)}
                      {/* NOTE TO SELF: Pls remove this afterwards. This is just a tester!! */}
                      <Typography className={classes.secondaryHeading}>{text.Id}</Typography>
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
                      <Typography className={classes.secondaryHeading}>
                        No attachments
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {/* Other comments */}
                      <Typography className={classes.secondaryHeading}>No comments</Typography>
                    </Grid>
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details} style={{paddingBottom: '40px'}}>
                  <div className={classes.column}>
                    <MeetingNotesSubmissionPage data={text}/>
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
        <div>
          <Paper>
            <Paper style={{position: "sticky", top: '4.5rem', height: '50px', zIndex: '2'}}>
              {this.renderHeader()} 
            </Paper>
            {this.renderMeetingsExpansionPanel()}
          </Paper>
        </div>
        <Paper>
        </Paper>
    </div>
    );
  }
}

MeetingsContent = observer(MeetingsContent);
export default withStyles(useStyles)(MeetingsContent);