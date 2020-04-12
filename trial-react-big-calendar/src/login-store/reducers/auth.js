import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    error: null,
    loading: false,
    user: null,
    projects: null,
    is_Staff: null
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true, 
        user: {},
        projects: [],
        is_Staff: null
    })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false,
        user: action.user,
        projects: action.projects,
        is_Staff: action.is_Staff
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        user: null,
        projects: null,
        is_Staff: null
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        user: null,
        projects: null,
        is_Staff: null
    })
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;