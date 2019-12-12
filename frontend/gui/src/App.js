import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';

import CustomLayout from './containers/Layout';
import TaskList from './containers/TaskListView';
import CalendarView from './containers/CalendarView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CustomLayout>
          {/* <TaskList />  */}
          <CalendarView/>
        </CustomLayout>
      </div>
    )
  }
}

export default App;
