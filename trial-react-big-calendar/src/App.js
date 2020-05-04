import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import CalendarStore from './mobx-store/CalendarStore';
import StudentMainPage from './components/studentComponents/studentMainPage';
import ContentRouting from './components/contentRouting';
import LoginPage from './components/login';
import StaffMainPage from './components/staffComponents/staffMainPage';
import ProjectListPage from './components/projectListing';
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
          <Redirect exact from={`${match.url}`} to={`${match.url}login`} />
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
        />
        <CheckSwitchRoute path='/determiner' 
        calendarStore={calendarStore}
        />
        <Route path='/' component={Home} 
        calendarStore={calendarStore}
        />
      </Switch>
    </div>
  )
}

export default App

