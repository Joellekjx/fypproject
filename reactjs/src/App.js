import React from 'react';
// // import logo from './logo.svg';
import './App.css';
import HeaderMenu from './components/headerMenu';
import MainContent from './components/mainContent';
// import CalendarStore from './store/CalendarStore';

// const calendarStore = new CalendarStore();
function App() {
  return (
    <div className="App">
      <HeaderMenu /> 
      {/* calendarStore={calendarStore} */}
      <MainContent/>
    </div>
  );
}

export default App;