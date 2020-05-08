//Staff upon login will be automatically sent here
import React, { Component } from "react";
import LeftSideColumn from '../leftSideColumn';
import { Grid } from '@material-ui/core';
import { observer } from "mobx-react";
import axiosGetFullData from "../AxiosCalling/axiosGetFullData";
import axiosGetIdsAndUsernames from '../AxiosCalling/axiosGetIdsAndUsernames';
import { connect } from 'react-redux';
import * as actions from '../../login-store/actions/auth';
import ReusableMainCalendar from '../MainCalendarReusableComponents/ReusableMainCalendar';

class StaffMainPage extends Component {
  constructor(props){
    super(props)
  }

   componentDidMount(){
    const { calendarStore, paramQuery } = this.props;
    if(calendarStore.getStaffStudentData.length === 0){
      axiosGetFullData(calendarStore, paramQuery);
      axiosGetIdsAndUsernames(calendarStore)
      calendarStore.addUserType('Staff')
    }
  }

  render() {
    const { calendarStore } = this.props;

    return (
        <div className="MainPage">
          <Grid container>
            <Grid item xs={1} md={1}>
              <LeftSideColumn calendarStore={calendarStore} type="Staff"/>
            </Grid>
            <Grid item xs={11} md={11}>
            <ReusableMainCalendar calendarStore={calendarStore}  type="Staff"/>
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
