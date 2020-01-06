import React, { Component } from "react";
import MainCalendar from './components/mainCalendar';
import LeftSideColumn from './components/leftSideColumn';
import { Grid } from '@material-ui/core';
import { observer } from "mobx-react";

class App extends Component {
  render() {
    const { calendarStore } = this.props;
    return (
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
    );
  }
}

App = observer(App);
export default App;
