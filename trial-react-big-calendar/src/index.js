import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import ContentRouting from './components/contentRouting';
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
        <ContentRouting
            calendarStore={calendarStore}
        />
    )
}

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={PassPropsToApp}/>
            <Route path="/contentrouter" component={PassPropsToWR} /> 
        </div>
    </Router>
)

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(routing, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
