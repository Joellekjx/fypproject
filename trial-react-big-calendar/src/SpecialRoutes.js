import { store } from './login-store/store';
import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const token = localStorage.getItem("token")
            const expiry = localStorage.getItem("expirationDate")
            const currentTime = new Date().getTime();
            rest.calendarStore.setUserData(JSON.parse(localStorage.getItem("user")))
            if (currentTime > expiry) {
                return <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            }
            if (token) { //as long as authenticated, able to access the privateroute
                return <Component {...props}
                    // calendarStore={calendarStore}
                />
            } else {
                return <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
                />
            }
        }}
    />
)

//Checking if the user is staff or not
//If it is staff, go to /:userID/staffcalendar
//Else, go to /:userID/calendar
export const LoginRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const token = localStorage.getItem("token")
            const expiry = localStorage.getItem("expirationDate")
            const currentTime = new Date().getTime();
            if (currentTime > expiry) {
                return <Component {...props} />
            }
            if (token) {
                rest.calendarStore.setUserData(JSON.parse(localStorage.getItem("user")))
                if (store.getState().is_Staff) { //if is staff
                    return <Redirect
                        to={{
                            pathname: '/staff',
                            state: { from: props.location }
                        }}
                    />
                } else if (!store.getState().is_Staff) {
                    return <Redirect
                        to={{
                            pathname: '/student',
                            state: { from: props.location }
                        }}
                    />
                } else {
                    return <Component {...props} />
                }
            } else {
                return <Component {...props} />
            }
        }}
    />
)

export const StudentOnlyRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const token = localStorage.getItem("token")
            const expiry = localStorage.getItem("expirationDate")
            const currentTime = new Date().getTime();
            rest.calendarStore.setUserData(JSON.parse(localStorage.getItem("user")))
            if (currentTime > expiry) {
                return <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            }
            if (token) {
                if (store.getState().is_Staff) {
                    return <Redirect
                        to={{
                            pathname: '/staff',
                            state: { from: props.location }
                        }}
                    />
                } else if (!store.getState().is_Staff) {
                    return <Component {...props} />
                } else {
                    return <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                }
            } else {
                return <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            }
        }}
    />
)

export const StaffOnlyRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const token = localStorage.getItem("token")
            const expiry = localStorage.getItem("expirationDate")
            const currentTime = new Date().getTime();
            rest.calendarStore.setUserData(JSON.parse(localStorage.getItem("user")))
            if (currentTime > expiry) {
                return <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            }
            if (token) {
                if (store.getState().is_Staff) {
                    return <Component {...props} />
                } else if (!store.getState().is_Staff) {
                    return <Redirect
                        to={{
                            pathname: '/student',
                            state: { from: props.location }
                        }}
                    />
                    
                } else {
                    return <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                }
            } else {
                return <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            }
        }}
    />
)

export const CheckSwitchRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const token = localStorage.getItem("token")
            const expiry = localStorage.getItem("expirationDate")
            const currentTime = new Date().getTime();
            rest.calendarStore.setUserData(JSON.parse(localStorage.getItem("user")))
            if (currentTime > expiry) {
                return <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            }
            if (token) {
                if (store.getState().is_Staff) {
                    return <Redirect
                        to={{
                            pathname: '/staff',
                            state: { from: props.location }
                        }}
                    />
                } else if (!store.getState().is_Staff) {
                    return <Redirect
                        to={{
                            pathname: '/student',
                            state: { from: props.location }
                        }}
                    />
                } else {
                    return <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                }
            } else {
                return <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            }
        }}
    />
)