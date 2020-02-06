import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CalendarStore from './mobx-store/CalendarStore';
import MainPage from './mainPage';
import ContentRouting from './components/contentRouting';

const calendarStore = new CalendarStore();
class App extends Component {
  render() {
    return (
      <Router>
        <Route>
          <Route exact path="/" 
            render={(props) => (<MainPage {...props} calendarStore={calendarStore}/>)}
          />
          <Route path="/contentrouter"
            render={(props) => (<ContentRouting {...props} calendarStore={calendarStore} />)}
          />
        </Route>
      </Router>
    );
  }
}

export default App;
