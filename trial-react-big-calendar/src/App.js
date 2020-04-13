import React, { Component } from "react";
import { Router, Route, Link, Redirect } from 'react-router-dom';
import CalendarStore from './mobx-store/CalendarStore';
import MainPage from './mainPage';
import ContentRouting from './components/contentRouting';
import history from './history';
import LoginPage from './components/login';
import projectListPage from './components/projectListing';

import { connect } from 'react-redux';
import * as actions from './login-store/actions/auth';

const calendarStore = new CalendarStore();

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    rest.auth === false
        ? 
        <Redirect to='/login'/>
        : 
        <Component {...props} calendarStore={calendarStore}/> 
  )}/>
) 

const CheckRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    rest.auth === false
        ? 
        <Component {...props}/> 
        : 
        rest.staff === true
          ? 
          <Redirect to='/projectListing'/>
          : 
          <Redirect to='/'/>
  )}/>
) 

const CheckProjects = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    rest.auth === false 
      ?
      <Redirect to='/login'/>
      :
      rest.staff === false
          ? 
          <Redirect to='/'/>
          : 
          <Component {...props} calendarStore={calendarStore}/> 
  )}/>
) 


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  
  render() {
    return (
      <Router history={history} >
        <Route>
          {console.log(this.props.isAuthenticated)}
          {/* <PrivateRoute exact path="/" component={MainPage} auth={this.props.isAuthenticated}
            // render={(props) => (<MainPage {...props} calendarStore={calendarStore}/>)}
          />
          <PrivateRoute path="/contentrouter"  component={ContentRouting} auth={this.props.isAuthenticated}
            // render={(props) => (<ContentRouting {...props} calendarStore={calendarStore} />)}
          />
          <CheckRoute path="/login" component={LoginPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff}
            // render={(props) => (<LoginPage {...props} />)}
          />
          <CheckProjects path="/projectListing" component={projectListPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff}/> */}

          <Route exact path="/"
            render={(props) => (<MainPage {...props} calendarStore={calendarStore}/>)}
          />
          <Route path="/contentrouter" 
            render={(props) => (<ContentRouting {...props} calendarStore={calendarStore} />)}
          />
          <Route path="/login" 
            render={(props) => (<LoginPage {...props} />)}
          />
          <Route path="/projectListing" component={projectListPage} auth={this.props.isAuthenticated} staff={this.props.is_Staff}/>

        </Route>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      isAuthenticated: state.token !== null,
      is_Staff: state.is_Staff
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
