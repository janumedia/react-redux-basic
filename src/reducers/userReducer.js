import * as types from '../constants/action-types';

const initialState = {
    users: [],
    user: {},
    pending: false
};

const user = (state = initialState, action) => {
    state = {
        ...state,
        action: action.type,
        pending: action.type === types.GET_USERS.PENDING || action.type === types.ADD_USER.PENDING,
        error: action.type === types.GET_USERS.FAILED || action.type === types.ADD_USER.FAILED ? action.payload : null
    };
    switch(action.type) {
        case types.ADD_USER.SUCCESS:
            const id = state.users.length > 0 ? parseInt([...state.users].pop().id) + 1 : 1;
            const user = {...action.payload, id} 
            return {...state, user, users:[...state.users, user]};
        case types.DELETE_USER:
            return {...state, users: state.users.filter(user => user.id !== action.payload)};
        case types.GET_USERS.SUCCESS:
            return {...state, users: [...action.payload]}
        case types.GET_USERS.PENDING:
        case types.GET_USERS.FAILED:
        case types.ADD_USER.PENDING:
        case types.ADD_USER.FAILED:
            //return state;
    }
    return state;
};

export default user;