import React, { Component, useEffect } from 'react';
import { Paper, Typography, Grid, Box, Button } from '@material-ui/core';
import axiosGetWeeklyReport from '../AxiosCalling/axiosGetWeeklyReport';
import { observer } from 'mobx-react';
// import { toJS } from 'mobx';

/**
 * 
 * Note to self: how to map a proxy???
 */

class WeeklyReportContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      weeklyReportArray: []
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
    // console.log(getWeeklyReportData);
    // getWeeklyReportData.map((item, i) => {
    //   console.log('hello')
    //   return "hello"
    // })
    // calendarStore.weeklyReportData.map((item, i) => {
    //   console.log(item.Id)
    //   return <li>{item.Id}</li>
    // })
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
    return(
    <div style={{width: '100%'}}>
      <div>
        <Paper>
          <Paper style={{position: "sticky", top: '4rem'}}>
            {this.renderHeader()}
          </Paper>
          <br/>
          <br/>
          hello
          <br/>
          <br/>
          {this.renderWeeklyReportData()}
        </Paper>
      </div>
      <Paper>
        
      </Paper>

    </div>
    )
  }
} 

WeeklyReportContent = observer(WeeklyReportContent);
export default WeeklyReportContent;

// export default function WeeklyReportContent({calendarStore}) {
//   // const [placeholder, setPlaceholder] = React.useState(calendarStore.getWeeklyReportData);
//   // const [placeholder, setPlaceholder] = React.useState(toJS(calendarStore.getWeeklyReportData));

//   async function fetchData(){
//     if(calendarStore.getWeeklyReportData.length == 0){
//       axiosGetWeeklyReport(calendarStore);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // const renderWeeklyReportData = () => {
//   //   console.log("inside renderweeklyreportdata")
//   //   console.log(placeholder);
//   //   // console.log('weekly report data above')
//   //   // console.log(toJS(placeholder.Id));

//   //   // calendarStore.getWeeklyReportData.map((item, i) => {
//   //   //   console.log(item.Id)
//   //   //   <li key={i}>Hello</li>
//   //   // })
//   //   // placeholder.map((anObjectMapped, index) => {
//   //   //   console.log(toJS(anObjectMapped));
//   //   //   return(
//   //   //     console.log("hello?")
//   //   //     // <p key={anObjectMapped.Id}>{anObjectMapped.title}</p>
//   //   //   )
//   //   // })
//   //   placeholder.map(data => console.log(data));
//   //   console.log("lol wtf??")
//   // }

//   const renderHeader = () => {
//     return(
//       <Grid container spacing={3}>
//         <Grid item xs={1}/>
//         <Grid item xs={2}>
//           <Typography variant="subtitle1">
//             <Box fontWeight="fontWeightBold">
//               Week No.
//             </Box>
//           </Typography>
//         </Grid>
//         <Grid item xs={2}>
//           <Typography variant="subtitle1">
//             <Box fontWeight="fontWeightBold">
//               Submission Status
//             </Box>
//           </Typography>
//         </Grid>
//         <Grid item xs={2}>
//           <Typography variant="subtitle1">
//             <Box fontWeight="fontWeightBold">
//               Submission Date
//             </Box>
//           </Typography>
//         </Grid>
//         <Grid item xs={2}>
//           <Typography variant="subtitle1">
//             <Box fontWeight="fontWeightBold">
//               Submitted Date
//             </Box>
//           </Typography>
//         </Grid>
//         <Grid item xs={2}>
//           <Typography variant="subtitle1">
//             <Box fontWeight="fontWeightBold">
//               No. of hours
//             </Box>
//           </Typography>
//         </Grid>
//       </Grid>
//     )
//   }

//   return (
//     <div style={{width: '100%'}}>
//       <div>
//         <Paper>
//           <Paper style={{position: "sticky", top: '4rem'}}>
//             {renderHeader()}
//           </Paper>
//           <br/>
//           <br/>
//           hello
//           <br/>
//           <br/>
//           {/* {renderWeeklyReportData()} */}
//         </Paper>
//       </div>
//       <Paper>
        
//       </Paper>

//     </div>
//   );
// }