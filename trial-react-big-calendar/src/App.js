import React, { Component } from "react";
import { Router, Route, Link, Redirect } from 'react-router-dom';
import CalendarStore from './mobx-store/CalendarStore';
import StudentMainPage from './components/studentComponents/studentMainPage';
import ContentRouting from './components/contentRouting';
import history from './history';
import LoginPage from './components/login';
import StaffMainPage from './components/staffComponents/staffMainPage';
import projectListPage from './components/projectListing';

import { connect } from 'react-redux';
import * as actions from './login-store/actions/auth';

const calendarStore = new CalendarStore();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.auth === false
      ?
      <Redirect to='/login' />
      :
      <Component {...props} calendarStore={calendarStore} />
  )} />
)

//Checking if the user is staff or not
//If it is staff, go to /:userID/staffcalendar
//Else, go to /:userID/calendar
const CheckRoute = ({ component: Component, ...rest }) => {
  var userID = rest.userInfo ? rest.userInfo.id : ''
  var staffCalendarURL = `/${userID}/staffcalendar`
  var studentCalendarURL = `/${userID}/calendar`
  rest.calendarStore.setUserData(rest.userInfo)
  return (
    <Route {...rest} render={(props) => (
      rest.auth === false
        ?
        <Component {...props} />
        :
        rest.staff === true
          ?
          <Redirect to={staffCalendarURL} />
          :
          <Redirect to={studentCalendarURL} />
    )} />
  )
}

const CheckProjects = ({ component: Component, ...rest }) => {
  var userID = rest.userInfo ? rest.userInfo.id : ''
  var studentCalendarURL = `/${userID}/calendar`
  return (
    <Route {...rest} render={(props) => (
      rest.auth === false
        ?
        <Redirect to='/login' />
        :
        rest.staff === false
          // So since this is a student, if rest.staff===false, we redirect to their calendar instead
          ?
          <Redirect to={studentCalendarURL} />
          :
          <Component {...props} />
    )} />
  )
}


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  

  render() {
    return (
      <Router history={history} >
        {/* <Route> */}
          {console.log(this.props.isAuthenticated)}
          {/* Calendar Path for student: */}
          <PrivateRoute exact path="/:userID/calendar" component={StudentMainPage} auth={this.props.isAuthenticated} userInfo={this.props.userInfo}
          />
          <PrivateRoute path="/:userID/content" component={ContentRouting} auth={this.props.isAuthenticated} userInfo={this.props.userInfo}
          />

          {/* Calendar Path for staff: */}
          <PrivateRoute exact path="/:userID/staffcalendar" component={StaffMainPage} auth={this.props.isAuthenticated} userInfo={this.props.userInfo}
          />


          <CheckRoute path="/" component={LoginPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff} userInfo={this.props.userInfo} calendarStore={calendarStore}
          />
          <CheckRoute path="/login" component={LoginPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff} userInfo={this.props.userInfo} calendarStore={calendarStore}
          />
          <CheckProjects path="/projectListing" component={projectListPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff} userInfo={this.props.userInfo}  calendarStore={calendarStore}/>

          {/* <Route exact path="/"
            render={(props) => (<MainPage {...props} calendarStore={calendarStore}/>)}
          />
          <Route path="/contentrouter" 
            render={(props) => (<ContentRouting {...props} calendarStore={calendarStore} />)}
          />
          <Route path="/login" 
            render={(props) => (<LoginPage {...props} />)}
          />
          <Route path="/projectListing" component={projectListPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff}/> */}

        {/* </Route> */}
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
    is_Staff: state.is_Staff,
    userInfo: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
