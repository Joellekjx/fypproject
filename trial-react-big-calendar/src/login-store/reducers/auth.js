import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    error: null,
    loading: false,
    user: null,
    projects: null,
    is_Staff: null,
    paramQuery: null
}

// const authStart = (state, action) => {
//     return updateObject(state, {
// error: null,
// loading: true, 
// user: {},
// projects: [],
// is_Staff: null,
// paramQuery: null
//     })
// }

const authStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true,
        user: {},
        projects: [],
        is_Staff: null,
        paramQuery: null
    }
}
// const authSuccess = (state, action) => {
//     return updateObject(state, {
//         token: action.token,
//         error: null,
//         loading: false,
//         user: action.user,
//         projects: action.projects,
//         is_Staff: action.is_Staff,
//         paramQuery: action.paramQuery
//     })
// }

const authSuccess = (state, action) => {
    console.log("inside authsuccess")
    console.log(state)
    console.log(action)
    console.log("###################")
    return {
        ...state,
        token: action.token,
        error: null,
        loading: false,
        user: action.user,
        projects: action.projects,
        is_Staff: action.is_Staff,
        paramQuery: action.paramQuery
    }
}

// const authFail = (state, action) => {
//     return updateObject(state, {
// error: action.error,
// loading: false,
// user: null,
// projects: null,
// is_Staff: null,
// paramQuery: null
//     })
// }

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false,
        user: null,
        projects: null,
        is_Staff: null,
        paramQuery: null
    }
}

// const authLogout = (state, action) => {
//     return updateObject(state, {
//         token: null,
//         user: null,
//         projects: null,
//         is_Staff: null,
//         paramQuery: null
//     })
// }

const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        user: null,
        projects: null,
        is_Staff: null,
        paramQuery: null
    }
}

// const tasklistParam = (state, action) => {
//     return updateObject(state, {
//         paramQuery: action.paramQuery
//     })
// }

const tasklistParam = (state, action) => {
    return {
        ...state,
        paramQuery: action.paramQuery
    }
}

const reducer = (state = initialState, action) => {
    console.log(action.type)
    console.log("why is actionTypes used here? Can we forgo it??")
    switch (action.type) {
        case 'AUTH_START': return authStart(state, action);
        case 'AUTH_SUCCESS': return authSuccess(state, action);
        case 'AUTH_FAIL': return authFail(state, action);
        case 'AUTH_LOGOUT': return authLogout(state, action);
        case 'TASK_PARAMS': return tasklistParam(state, action);
        // case actionTypes.AUTH_START: return authStart(state, action);
        // case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        // case actionTypes.AUTH_FAIL: return authFail(state, action);
        // case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        // case actionTypes.TASK_PARAMS: return tasklistParam(state, action);
        default:
            return state;
    }
}

export default reducer;