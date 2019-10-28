import React, { Component } from 'react';
// import './App.css';
import 'antd/dist/antd.css';

import CustomLayout from './containers/Layout';
import TaskList from './containers/TaskListView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CustomLayout>
          <TaskList /> 
        </CustomLayout>
      </div>
    )
  }
}

export default App;
