import React, { Component } from "react";
import LeftSideColumn from '../leftSideColumn';
import { Grid } from '@material-ui/core';
import { observer } from "mobx-react";
import axiosGetStudentData from "../AxiosCalling/axiosGetStudentData";
import axiosGetIdsAndUsernames from '../AxiosCalling/axiosGetIdsAndUsernames';
import { connect } from 'react-redux';
import * as actions from '../../login-store/actions/auth';
import ReusableMainCalendar from '../MainCalendarReusableComponents/ReusableMainCalendar';

class StudentMainPage extends Component {
  
   componentDidMount(){
    const { calendarStore, paramQuery } = this.props;
    if(calendarStore.getData.length === 0){
      var student_id = calendarStore.getUserData.id
      axiosGetStudentData(calendarStore, student_id);
      axiosGetIdsAndUsernames(calendarStore)
      calendarStore.addUserType('Student')
    }
  }

  render() {
    const { calendarStore } = this.props;
    var paramQuery = paramQuery ? paramQuery : ''
    return (
        <div className="MainPage">
          <Grid container>
            <Grid item xs={1} md={1}>
              <LeftSideColumn calendarStore={calendarStore} type="Student"/>
            </Grid>
            <Grid item xs={11} md={11}>
              <ReusableMainCalendar calendarStore={calendarStore}  type="Student"/>
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

StudentMainPage = observer(StudentMainPage);
export default connect(mapStateToProps, mapDispatchToProps)(StudentMainPage);
