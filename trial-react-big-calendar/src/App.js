import React, { Component } from "react";
import MainCalendar from './components/mainCalendar';
import LeftSideColumn from './components/leftSideColumn';
import { Grid } from '@material-ui/core';
import { observer } from "mobx-react";
import axios from 'axios';

class App extends Component {
   componentDidMount(){
    const { calendarStore } = this.props;
    const { addData, getDataLength } = calendarStore;
    axios.get('http://127.0.0.1:8000/api/task/')
        .then(res => {
            res.data.map(indivRes => {
              var start = new Date(indivRes.task_due_date);
              var starttime = new Date(start.setHours(0, 0, 0, 0));
              var endtime = new Date(indivRes.task_due_date);
              
              if(getDataLength !== res.data.length) {
                addData({
                  Id: indivRes.task_id, 
                  title: indivRes.task_type, 
                  start: starttime, 
                  end: endtime, 
                  event_type: indivRes.task_type,
                  status: indivRes.status
                })
              } 
            })
        })
  }

  render() {
    const { calendarStore } = this.props;
    return (
      // <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="App">
          <Grid container>
            <Grid item xs={2}>
              <LeftSideColumn calendarStore={calendarStore}/>
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
