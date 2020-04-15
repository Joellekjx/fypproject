import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, Route } from 'react-router-dom';
import history from './history';
import { Provider } from 'react-redux'
import { store, persistor } from './login-store/store';
import { PersistGate } from 'redux-persist/integration/react'

const app = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router history={history}>
                {/* <App /> */}
                <Route path="/" component={App} />
            </Router>
        </PersistGate>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();