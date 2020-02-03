import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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
})

class WeeklyReportCommentBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      // weeklyReportArray: [],
    }
  }

  render(){
    const { classes } = this.props;
    return(
    <div style={{width: '100%'}}>
      <Typography className={classes.heading}>Comments:</Typography>
    </div>
    )
  }
} 

WeeklyReportCommentBox = observer(WeeklyReportCommentBox);
export default withStyles(useStyles)(WeeklyReportCommentBox);
