import React, { Component } from 'react';
import { Paper, Typography, Grid, Box, List, ListItem, ListItemText, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import axiosGetWeeklyReport from '../AxiosCalling/axiosGetWeeklyReport';
import { observer } from 'mobx-react';
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

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
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  }
})

class WeeklyReportContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      weeklyReportArray: [],
    }
  }

  componentDidMount(){
    const { calendarStore } = this.props;
    if (calendarStore.getWeeklyReportData.length == 0){
      axiosGetWeeklyReport(calendarStore);
    }
  }

  renderWeeklyReportData = () => {
    const { calendarStore } = this.props;
    const { getWeeklyReportData } = calendarStore;
    console.log(getWeeklyReportData);
    return(
      <Grid container spacing={3}>
        <Grid item xs={1} />
        <Grid item xs={2}>
          {/* Week nos. */}
        </Grid>
        <Grid item xs={2}>         
          <List>
            {getWeeklyReportData.map((text, index) => (
              <ListItem>
                <ListItemText key={index} primary={text.status} />
              </ListItem>
            ))}
          </List>
          {/* Also have this. The rest... */}
        </Grid>
        <Grid item xs={2}> 
        {/* only thing we have?? lol */}
          <List>
            {getWeeklyReportData.map((text, index) => (
              <ListItem>
                <ListItemText primary={text.event_type} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={2}>
          {/* Submitted date */}
        </Grid>
        <Grid item xs={2}>
          {/* No. of hours */}
        </Grid>
      </Grid>
    )
  }

  renderWeeklyReportExpansionPanel = () => {
    const { calendarStore, classes } = this.props;
    const { getWeeklyReportData} = calendarStore;

    return(
      getWeeklyReportData.map((text, index) => (
        <div className={classes.root}>
          <ExpansionPanel defaultExpanded style={{overflow: 'hidden'}}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon/>}
            >
              <Grid container spacing={3}>
                <Grid item xs={1} />
                <Grid item xs={2}>
                  {/* Week nos. */}
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
                </Grid>
                <Grid item xs={2}>
                  {/* No. of hours */}
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <div className={classes.column}>
                Hello col 1
              </div>
              <div className={classes.column}>
                Hello col 2
              </div>
              <div className={classes.column}>
                Hello col 3
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      ))
    )
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
              Submission Date
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
    const { calendarStore } = this.props;
    const { getWeeklyReportData } = calendarStore;
    return(
    <div style={{width: '100%'}}>
      <div>
        <Paper>
          <Paper style={{position: "sticky", top: '4.5rem', height: '50px'}}>
            {this.renderHeader()} 
            {/* Honestly a bit buggy looking lol need to fix sticky issue else push expansion panel to the back */}
          </Paper>
          {/* {this.renderWeeklyReportData()} */}
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
