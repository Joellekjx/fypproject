import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper, TextField, Button } from '@material-ui/core';

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
  constructor(props){
    super(props);
    this.state = {
      // weeklyReportArray: [],
    }
  }

  renderWeeklyReportCompletedPaper = () => {
    const { classes, content, hours_spent } = this.props;
    return(
      <Paper elevation={2} className={classes.paper}>
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
      <form noValidate autoComplete="off">
        <Paper elevation={2} className={classes.paper}>
          <div style={{display: 'flex'}}>
            <Typography className={classes.secondaryHeading}>
              Hours spent: &nbsp;
              {/* comment: reduce the height of textfield pls */}
            </Typography>
            <TextField 
              id="outlined-basic" 
              variant="outlined" 
              size="small"
              type="number"
              style={{width: '12%'}}
            />
          </div>
          <Typography className={classes.secondaryHeading}>
            Things completed:
          </Typography>
          <TextField 
            variant="outlined"
            multiline
            rows="7"
            style={{width: '100%'}}
          />
          <div style={{padding: '10px 0px 5px 0px'}}>
            <Button style={{}}><strong>Add attachment</strong></Button>
            <Button variant="contained" style={{float: 'right'}}>Submit Report</Button>
          </div>
        </Paper>
      </form>
    )
  }


  render(){
    const { classes, status } = this.props;
    
    return (
    <div style={{width: '100%', padding: '10px'}}>
      <Typography className={classes.heading}>Weekly Report Submission</Typography>
      {(status===("Completed"||"Late Submission")) ? this.renderWeeklyReportCompletedPaper() : this.renderWeeklyReportPendingPaper()}
    </div>
    )
  }
} 

WeeklyReportSubmissionPage = observer(WeeklyReportSubmissionPage);
export default withStyles(useStyles)(WeeklyReportSubmissionPage);
