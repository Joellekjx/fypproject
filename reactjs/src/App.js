import React from 'react';
// // import logo from './logo.svg';
import './App.css';
import HeaderMenu from './components/headerMenu';
import MainContent from './components/mainContent';

function App() {
  return (
    <div className="App">
      <HeaderMenu />
      <MainContent />
    </div>
  );
}

export default App;