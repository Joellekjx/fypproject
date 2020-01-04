import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';

import CustomLayout from './containers/Layout';
import CalendarView from './containers/CalendarView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CustomLayout>
          <CalendarView/>
        </CustomLayout>
      </div>
    )
  }
}

export default App;
