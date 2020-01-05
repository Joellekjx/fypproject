import React, { Component } from "react";
import MainCalendar from './components/mainCalendar';
import LeftSideColumn from './components/leftSideColumn';
import { Grid } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid container>
          <Grid item xs={2}>
            <LeftSideColumn />
          </Grid>
          <Grid item xs={10}>
            <MainCalendar />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
