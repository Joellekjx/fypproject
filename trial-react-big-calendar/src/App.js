import React, { Component } from "react";
import { Router, Route } from 'react-router-dom';
import CalendarStore from './mobx-store/CalendarStore';
import MainPage from './mainPage';
import ContentRouting from './components/contentRouting';
import history from './history';
import ContentRoutingTester from './components/contentRoutingTester';
import LoginPage from './components/login';

const calendarStore = new CalendarStore();
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Route>
          <Route exact path="/" 
            render={(props) => (<MainPage {...props} calendarStore={calendarStore}/>)}
          />
          <Route path="/contentrouter"
            render={(props) => (<ContentRouting {...props} calendarStore={calendarStore} />)}
          />
          <Route path="/contentroutertester"
            render={(props) => (<ContentRoutingTester {...props} calendarStore={calendarStore} />)}
          />
          <Route path="/login"
            render={(props) => (<LoginPage {...props} calendarStore={calendarStore} />)}
          />
        </Route>
      </Router>
    );
  }
}

export default App;
