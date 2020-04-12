import * as actionTypes from './actionTypes';
import axios from 'axios';
// import store from '../../index';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, user, projects, is_Staff) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: user,
        projects: projects,
        is_Staff: is_Staff
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('projects');
    localStorage.removeItem('is_Staff');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    // const state = store.getState();

    // const authToken = state.user;
    
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            dispatch(checkAuthTimeout(3600));
            const user = {
                id: res.data.user.id,
                username: res.data.user.username,
                is_staff: res.data.user.is_staff,
                project_id: res.data.user.project_id
            };
            var projects_data = []
            res.data.user.projects.forEach(result => {
                projects_data.push({
                    project_id: result.project_id,
                    tutor_id: result.tutor_id,
                    project_name: result.project_name,
                    project_description: result.project_description,
                    students: result.students 
                });
            });
            const projects = projects_data;
            const is_Staff = user.is_staff !== 0

            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('is_Staff', is_Staff);

            var myUserJSON = JSON.stringify(user);
            localStorage.setItem('user', myUserJSON);
            var myProjecsJSON = JSON.stringify(projects)
            localStorage.setItem('projects', myProjecsJSON);

            dispatch(authSuccess(token, user, projects, is_Staff));
        })
        .catch(err => {
            dispatch(authFail(err))
        })    
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })    
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        const is_Staff = localStorage.getItem('is_Staff');
        const projects = JSON.parse(localStorage.getItem('projects'));
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, user, projects, is_Staff));
                dispatch(checkAuthTimeout( 
                    (expirationDate.getTime() - new Date().getTime()) / 1000)
                )
            }
        }
    }
}