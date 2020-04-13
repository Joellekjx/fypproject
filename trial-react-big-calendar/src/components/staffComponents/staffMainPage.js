//Staff upon login will be automatically sent here
import React, { Component } from "react";
import StaffMainCalendar from './staffMainCalendar';
import LeftSideColumn from '../leftSideColumn';
import { Grid } from '@material-ui/core';
import { observer } from "mobx-react";
import axiosGetFullData from "../AxiosCalling/axiosGetFullData";

import { connect } from 'react-redux';
import * as actions from '../../login-store/actions/auth';

class StaffMainPage extends Component {
  
   componentDidMount(){
    const { calendarStore, paramQuery } = this.props;
    if(calendarStore.getData.length === 0){
      console.log(paramQuery);
      axiosGetFullData(calendarStore, paramQuery);
    }
  }

  render() {
    const { calendarStore, history } = this.props;
    return (
        <div className="MainPage">
          {console.log(this.props.paramQuery)}
          <Grid container>
            <Grid item xs={1}>
              <LeftSideColumn calendarStore={calendarStore} history={history} type="Staff"/>
            </Grid>
            <Grid item xs={11}>
              <StaffMainCalendar calendarStore={calendarStore} />
            </Grid>
          </Grid>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    paramQuery: state.paramQuery
  }
}

const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(actions.logout())
  }
}

StaffMainPage = observer(StaffMainPage);
export default connect(mapStateToProps, mapDispatchToProps)(StaffMainPage);
