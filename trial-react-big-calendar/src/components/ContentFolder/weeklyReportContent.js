import React, { useEffect } from 'react';
import { Paper, Typography, Grid, Box, Button } from '@material-ui/core';
import axiosGetWeeklyReport from '../AxiosCalling/axiosGetWeeklyReport';
import { toJS } from 'mobx';

/**
 * 
 * Note to self: how to map a proxy???
 */

export default function WeeklyReportContent({calendarStore}) {
  const [placeholder, setPlaceholder] = React.useState(calendarStore.getWeeklyReportData);

  async function fetchData(){
    if(calendarStore.getWeeklyReportData.length == 0){
      axiosGetWeeklyReport(calendarStore);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(calendarStore.getWeeklyReportData);
  // console.log(calendarStore.getWeeklyReportData.map())

  // const renderWeeklyReportData = () => {
  //   console.log("inside renderweeklyreportdata")
  //   // console.log(toJS(placeholder.Id));

  //   // calendarStore.getWeeklyReportData.map((item, i) => {
  //   //   console.log(item.Id)
  //   //   <li key={i}>Hello</li>
  //   // })
  //   placeholder.map((anObjectMapped, index) => {
  //     console.log(toJS(anObjectMapped));
  //     return(
  //       <p key={anObjectMapped.Id}>{anObjectMapped.title}</p>
  //     )
  //   })
  // }

  const renderHeader = () => {
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

  return (
    <div style={{width: '100%'}}>
      <div>
        <Paper>
          <Paper style={{position: "sticky", top: '4rem'}}>
            {renderHeader()}
          </Paper>
          <br/>
          <br/>
          hello
          {/* {renderWeeklyReportData()} */}
        </Paper>
      </div>
      <Paper>
        
      </Paper>

    </div>
  );
}