import React, { Component } from "react";
import StudentMainCalendar from './components/studentMainCalendar';
import LeftSideColumn from './components/leftSideColumn';
import { Grid } from '@material-ui/core';
import { observer } from "mobx-react";
import axiosGetFullData from "./components/AxiosCalling/axiosGetFullData";

import { connect } from 'react-redux';
import * as actions from './login-store/actions/auth';

class StudentMainPage extends Component {
  
   componentDidMount(){
    const { calendarStore, paramQuery } = this.props;
    if(calendarStore.getData.length === 0){
      console.log(paramQuery);
      console.log('what is this')
      axiosGetFullData(calendarStore, paramQuery);
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
            <Grid item xs={1}>
              <LeftSideColumn calendarStore={calendarStore} history={history}/>
            </Grid>
            <Grid item xs={11}>
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
