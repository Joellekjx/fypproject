import React, { Component } from "react";
import StudentMainCalendar from './studentMainCalendar';
import LeftSideColumn from '../leftSideColumn';
import { Grid } from '@material-ui/core';
import { observer } from "mobx-react";
import axiosGetStudentData from "../AxiosCalling/axiosGetStudentData";

import { connect } from 'react-redux';
import * as actions from '../../login-store/actions/auth';

class StudentMainPage extends Component {
  
   componentDidMount(){
    const { calendarStore, paramQuery } = this.props;
    if(calendarStore.getData.length === 0){
      console.log(paramQuery);
      console.log('what is this')
      console.log(calendarStore.getUserData.id)
      var student_id = calendarStore.getUserData.id
      axiosGetStudentData(calendarStore, student_id);
    }
  }

  render() {
    const { calendarStore, history } = this.props;
    var paramQuery = paramQuery ? paramQuery : ''
    console.log(paramQuery)
    return (
        <div className="MainPage">
          {console.log(this.props.paramQuery)}
          <Grid container>
            <Grid item xs={1} md={2}>
              <LeftSideColumn calendarStore={calendarStore} history={history} type="Student"/>
            </Grid>
            <Grid item xs={11} md={10}>
              <StudentMainCalendar calendarStore={calendarStore} />
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
