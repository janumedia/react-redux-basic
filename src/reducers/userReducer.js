import * as types from '../constants/action-types';

export const initialState = {
    users: [],
    pending: false
};

export default (state = initialState, action) => {
    state = {
        ...state,
        pending: action.type.indexOf('_PENDING') > 0,
        error: action.type.indexOf('_FAILED') > 0 ? action.payload : null
    };
    switch(action.type) {
        case types.GET_USERS.SUCCESS:
            return {...state, users: [...action.payload]}
        case types.ADD_USER.SUCCESS:
            return {...state, users: [...action.payload]};
        case types.DELETE_USER.SUCCESS:
            return {...state, users: [...action.payload]};
        case types.GET_USERS.PENDING:
        case types.GET_USERS.FAILED:
        case types.ADD_USER.PENDING:
        case types.ADD_USER.FAILED:
        case types.DELETE_USER.PENDING:
        case types.DELETE_USER.FAILED:
            //return state;
    }
    return state;
};