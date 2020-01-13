import React, { Component } from "react";
import MainCalendar from './components/mainCalendar';
import LeftSideColumn from './components/leftSideColumn';
import { Grid } from '@material-ui/core';
import { observer } from "mobx-react";
// import moment from 'moment';
import axios from 'axios';

class App extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       task: [],
//     }
// };  

//   componentDidMount(){
//     const { calendarStore } = this.props;
//     const { addData, getData } = calendarStore;
//     axios.get('http://127.0.0.1:8000/api/task/')
//         .then(res => {
//             res.data.map(indivRes => {
//               this.setState(prevState => ({
//                 task:[...prevState.task, indivRes]
//               }))
//               var start = new Date(indivRes.task_due_date);
//               var starttime = new Date(start.setHours(0, 0, 0, 0));
//               var end = new Date(indivRes.task_due_date);
              
//               console.log("get data length");
//               console.log(getData.length);
//               console.log("res data length: ");
//               console.log(res.data.length);
//               if(getData.length <= res.data.length) {
//                 addData({Id: indivRes.task_id, title: indivRes.task_type, start: starttime, end: end, event_type: indivRes.task_type})
//               }
//             })
//         })
//   }

  render() {
    const { calendarStore } = this.props;
    return (
      // <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="App">
          <Grid container>
            <Grid item xs={2}>
              <LeftSideColumn />
            </Grid>
            <Grid item xs={10}>
              <MainCalendar calendarStore={calendarStore} />
            </Grid>
          </Grid>
        </div>
      // </MuiPickersUtilsProvider>
    );
  }
}

App = observer(App);
export default App;
