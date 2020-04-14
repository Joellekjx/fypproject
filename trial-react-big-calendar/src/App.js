import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import CalendarStore from './mobx-store/CalendarStore';
import StudentMainPage from './components/studentComponents/studentMainPage';
import ContentRouting from './components/contentRouting';
import history from './history';
import LoginPage from './components/login';
import StaffMainPage from './components/staffComponents/staffMainPage';
import ProjectListPage from './components/projectListing';

import { connect } from 'react-redux';
import * as actions from './login-store/actions/auth';
import { PrivateRoute, LoginRoute, StudentOnlyRoute, StaffOnlyRoute, CheckSwitchRoute } from './SpecialRoutes';

const calendarStore = new CalendarStore();

function App() {
  const studentOnlyRoute = ({ match }) => {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/calendar`} />
            <Route
              path={`${match.url}/calendar`} exact={true}
              render={(props) => (<StudentMainPage {...props} calendarStore={calendarStore} />)}
            />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }

  const staffOnlyRoute = ({ match }) => {
    console.log(match)
    console.log("is there match in here??")
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/calendar`} />
            <Route
              path={`${match.url}/calendar`} exact={true}
              render={(props) => (<StaffMainPage {...props} calendarStore={calendarStore} />)}
            />
            <Route
              path={`${match.url}/projectlistings`} exact={true}
              render={(props) => (<ProjectListPage {...props} calendarStore={calendarStore} />)}
            />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }

  const Home = ({ match }) => {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <LoginRoute path={`${match.url}login`} exact component={LoginPage} calendarStore={calendarStore}
            />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }

  return (
    <div>
      <Switch>
        <StudentOnlyRoute path="/student" component={studentOnlyRoute} 
          calendarStore={calendarStore}
        />
        <StaffOnlyRoute path="/staff" component={staffOnlyRoute} 
        calendarStore={calendarStore}
        />
        <PrivateRoute path="/:userID/content" component={ContentRouting}
        calendarStore={calendarStore} 
        // auth={this.props.isAuthenticated} userInfo={this.props.userInfo}
        />
        <CheckSwitchRoute path='/determiner' 
        // calendarStore={calendarStore}
        />
        {/* <CheckRoute path="/" component={LoginPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff} userInfo={this.props.userInfo} calendarStore={calendarStore}
          /> */}
        <Route path='/' component={Home} 
        // calendarStore={calendarStore}
        />
        {/* <Redirect exact from='/' to='/login' />
          <CheckRoute path="/login" component={LoginPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff} userInfo={this.props.userInfo} calendarStore={calendarStore}
          /> */}
      </Switch>
    </div>
  )
}

export default App


// // const CheckProjects = ({ component: Component, ...rest }) => {
// //   var userID = rest.userInfo ? rest.userInfo.id : ''
// //   var studentCalendarURL = `/${userID}/calendar`
// //   return (
// //     <Route {...rest} render={(props) => (
// //       rest.auth === false
// //         ?
// //         <Redirect to='/login' />
// //         :
// //         rest.staff === false
// //           // So since this is a student, if rest.staff===false, we redirect to their calendar instead
// //           ?
// //           <Redirect to={studentCalendarURL} />
// //           :
// //           <Component {...props} />
// //     )} />
// //   )
// // }


// class App extends Component {
//   constructor(props) {
//     super(props)
//   }
//   // componentDidMount() {
//   //   this.props.onTryAutoSignup();
//   // }

//   studentOnlyRoute = ({ match }) => {
//     return (
//       <React.Fragment>
//         <Router>
//           <Switch>
//             <Redirect exact from={`${match.url}`} to={`${match.url}/calendar`} />
//             <Route
//               path={`${match.url}/calendar`} exact={true}
//               ender={(props) => (<StudentMainPage {...props} calendarStore={calendarStore} />)}
//             />
//           </Switch>
//         </Router>
//       </React.Fragment>
//     )
//   }

  // staffOnlyRoute = ({ match }) => {
  //   return (
  //     <React.Fragment>
  //       <Router>
  //         <Switch>
  //           <Redirect exact from={`${match.url}`} to={`${match.url}/calendar`} />
  //           <Route
  //             path={`${match.url}/calendar`} exact={true}
  //             ender={(props) => (<StaffMainPage {...props} calendarStore={calendarStore} />)}
  //           />
  //           <Route
  //             path={`${match.url}/projectlistings`} exact={true}
  //             ender={(props) => (<ProjectListPage {...props} calendarStore={calendarStore} />)}
  //           />
  //         </Switch>
  //       </Router>
  //     </React.Fragment>
  //   )
  // }

  // home = () => {
  //   return (
  //     <React.Fragment>
  //       <Router>
  //         <Switch>
  //           <CheckRoute path="/login" component={LoginPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff} userInfo={this.props.userInfo} calendarStore={calendarStore}
  //           />
  //         </Switch>
  //       </Router>
  //     </React.Fragment>
  //   )
  // }
//   render() {
//     return (
//       <div>
//         <Switch>
//           <PrivateRoute path="/:userID/content" component={ContentRouting} auth={this.props.isAuthenticated} userInfo={this.props.userInfo}
//           />
//           <StudentOnlyRoute path="/student" component={(props) => this.studentOnlyRoute(props)} />
//           <StaffOnlyRoute path="/staff" component={(props) => this.staffOnlyRoute(props)} />
//           <CheckSwitchRoute path='/determiner' />
//           {/* <CheckRoute path="/" component={LoginPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff} userInfo={this.props.userInfo} calendarStore={calendarStore}
//           /> */}
//           <Route path='/' component={this.home} />
//           {/* <Redirect exact from='/' to='/login' />
//           <CheckRoute path="/login" component={LoginPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff} userInfo={this.props.userInfo} calendarStore={calendarStore}
//           /> */}
//         </Switch>
//       </div>
//       // <Router history={history} >
//       //   {/* <Route> */}
//       //     {console.log(this.props.isAuthenticated)}
//       //     {/* Calendar Path for student: */}
//       //     <PrivateRoute exact path="/:userID/calendar" component={StudentMainPage} auth={this.props.isAuthenticated} userInfo={this.props.userInfo}
//       //     />
//       // <PrivateRoute path="/:userID/content" component={ContentRouting} auth={this.props.isAuthenticated} userInfo={this.props.userInfo}
//       // />

//       //     {/* Calendar Path for staff: */}
//       //     <PrivateRoute exact path="/:userID/staffcalendar" component={StaffMainPage} auth={this.props.isAuthenticated} userInfo={this.props.userInfo}
//       //     />

//       //     <CheckRoute path="/" component={LoginPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff} userInfo={this.props.userInfo} calendarStore={calendarStore}
//       //     />
//       //     <CheckRoute path="/login" component={LoginPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff} userInfo={this.props.userInfo} calendarStore={calendarStore}
//       //     />
//       //     <CheckProjects path="/projectListing" component={projectListPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff} userInfo={this.props.userInfo}  calendarStore={calendarStore}/>

//       //     {/* <Route exact path="/"
//       //       render={(props) => (<MainPage {...props} calendarStore={calendarStore}/>)}
//       //     />
//       //     <Route path="/contentrouter" 
//       //       render={(props) => (<ContentRouting {...props} calendarStore={calendarStore} />)}
//       //     />
//       //     <Route path="/login" 
//       //       render={(props) => (<LoginPage {...props} />)}
//       //     />
//       //     <Route path="/projectListing" component={projectListPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff}/> */}

//       //   {/* </Route> */}
//       // </Router>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.token !== null,
//     is_Staff: state.is_Staff,
//     userInfo: state.user
//   }
// }

// // const mapDispatchToProps = dispatch => {
// //   return {
// //     onTryAutoSignup: () => dispatch(actions.authCheckState())
// //   }
// // }

// // export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default connect(mapStateToProps, null)(App);
// // export default App;
