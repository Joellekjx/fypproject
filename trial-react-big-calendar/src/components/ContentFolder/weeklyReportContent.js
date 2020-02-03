import React, { Component, useEffect } from 'react';
import { Paper, Typography, Grid, Box, Button, List, ListItem, ListItemText, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import axiosGetWeeklyReport from '../AxiosCalling/axiosGetWeeklyReport';
import { observer } from 'mobx-react';
import moment from 'moment';
// import RenderWeeklyReportExpansionPanel from './renderWeeklyReportExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import { toJS } from 'mobx';

/**
 * 
 * Note to self: how to map a proxy???
 */

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
    const { calendarStore } = this.props;
    const { getWeeklyReportData} = calendarStore;

    return(
      getWeeklyReportData.map((text, index) => (
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
                {text.status}
              </Grid>
              <Grid item xs={2}> 
                {/* Submission date -- need to format it to reflect date only */}
                {text.event_type}
              </Grid>
              <Grid item xs={2}>
                {/* Submitted date */}
              </Grid>
              <Grid item xs={2}>
                {/* No. of hours */}
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            Hello
          </ExpansionPanelDetails>
        </ExpansionPanel>
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

      {/* Can u do smth about changing the dates to print them? */}
      {/* {getWeeklyReportData.map(item => )} */}
      {/* {getWeeklyReportData.map(item => console.log(item.end))} */}
      {getWeeklyReportData.map((text, index) => (
        <ListItem>
          <ListItemText>
            {/* {text.end} */}
            {console.log(text.end)}
            ok
          </ListItemText>
        </ListItem>
      ))}
    </div>
    )
  }
} 

WeeklyReportContent = observer(WeeklyReportContent);
export default WeeklyReportContent;
