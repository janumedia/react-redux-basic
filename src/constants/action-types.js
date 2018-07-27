const asyncActionTypes = type => ({
    PENDING: `${type}_PENDING`,
    SUCCESS: `${type}_SUCCESS`,
    FAILED: `${type}_FAILED`
});

export const GET_USERS = asyncActionTypes('GET_USERS');
export const ADD_USER = asyncActionTypes('ADD_USER');
export const DELETE_USER = 'DELETE_USER';