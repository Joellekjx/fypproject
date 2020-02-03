import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';

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
    fontWeight: 'bold'
  },
  bodyText: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  paper: {
    width: '80%',
    padding: '10px',
    marginTop: '5px',
  }
})

class WeeklyReportSubmissionPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      // weeklyReportArray: [],
    }
  }

  renderWeeklyReportCompletedPaper = () => {
    const { classes, content, hours_spent } = this.props;
    return(
      <Paper elevation={1} className={classes.paper}>
        <div style={{display: 'flex', padding: '10px'}}>
          <Typography className={classes.secondaryHeading}>
            Hours spent: &nbsp; 
          </Typography>
          <Typography className={classes.bodyText}>
            {hours_spent}
          </Typography>
        </div>
        <div style={{padding: '0 10px 10px 10px'}}>
          <Typography className={classes.secondaryHeading}>
            Things completed:
          </Typography>
          <Typography className={classes.bodyText}>
            {content}
          </Typography>
        </div>
      </Paper>
    )
  }

  renderWeeklyReportPendingPaper = () => {
    const { classes } = this.props;
    return(
      <Paper elevation={1} className={classes.paper}>
        <Typography className={classes.secondaryHeading}>
          Hours spent: 
        </Typography>
        <Typography className={classes.secondaryHeading}>
          Things completed:
        </Typography>
      </Paper>
    )
  }


  render(){
    const { classes, status } = this.props;
    
    return (
    <div style={{width: '100%', padding: '10px'}}>
      <Typography className={classes.heading}>Weekly Report Submission</Typography>
      {status==="Completed"||"Late Submission" ? this.renderWeeklyReportCompletedPaper() : this.renderWeeklyReportPendingPaper()}
    </div>
    )
  }
} 

WeeklyReportSubmissionPage = observer(WeeklyReportSubmissionPage);
export default withStyles(useStyles)(WeeklyReportSubmissionPage);
