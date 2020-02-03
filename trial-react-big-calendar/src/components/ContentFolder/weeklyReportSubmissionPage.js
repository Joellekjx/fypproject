import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';

const useStyles = (theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold'
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

  renderWeeklyReportSubmissionPaper = () => {
    const { classes } = this.props;
    return(
      <Paper elevation={1} className={classes.paper}>
        Hours spent: <br/>
        Things completed:
      </Paper>
    )
  }
  render(){
    const { classes } = this.props;
    return(
    <div style={{width: '100%'}}>
      <Typography className={classes.heading}>Weekly Report Submission</Typography>
      {this.renderWeeklyReportSubmissionPaper()}
    </div>
    )
  }
} 

WeeklyReportSubmissionPage = observer(WeeklyReportSubmissionPage);
export default withStyles(useStyles)(WeeklyReportSubmissionPage);
