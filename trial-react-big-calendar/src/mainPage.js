import React, { Component } from "react";
import MainCalendar from './components/mainCalendar';
import LeftSideColumn from './components/leftSideColumn';
import { Grid } from '@material-ui/core';
import { observer } from "mobx-react";
import axiosGetFullData from "./components/AxiosCalling/axiosGetFullData";

class MainPage extends Component {
   componentDidMount(){
    const { calendarStore } = this.props;
    if(calendarStore.getData.length === 0){
      axiosGetFullData(calendarStore);
    }
  }

  render() {
    const { calendarStore } = this.props;
    return (
        <div className="MainPage">
          <Grid container>
            <Grid item xs={1}>
              <LeftSideColumn calendarStore={calendarStore}/>
            </Grid>
            <Grid item xs={11}>
              <MainCalendar calendarStore={calendarStore} />
            </Grid>
          </Grid>
        </div>
    );
  }
}

MainPage = observer(MainPage);
export default MainPage;