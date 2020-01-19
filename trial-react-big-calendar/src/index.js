import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import WeeklyReport from './components/weeklyReport';
import Meeting from './components/meeting';
import CalendarStore from './mobx-store/CalendarStore';
import * as serviceWorker from './serviceWorker';

const calendarStore = new CalendarStore();

const PassPropsToApp = () => {
    return(
        <App
            calendarStore={calendarStore}
        />
    )
}

const PassPropsToWR = () => {
    return(
        <WeeklyReport
            calendarStore={calendarStore}
        />
    )
}

const PassPropsToMeeting = () => {
    return(
        <Meeting
            calendarStore={calendarStore}
        />
    )
}

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={PassPropsToApp}/>
            <Route path="/weeklyreport" component={PassPropsToWR} />
            {/* <Route path="/meetings" component={PassPropsToMeeting} /> */}
        </div>
    </Router>
)

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(routing, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
