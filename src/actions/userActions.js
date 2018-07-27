import * as types from "../constants/action-types";

export const addUser = (newUser) => ({
    type: types.ADD_USER,
    payload: newUser
})

export const deleteUser = (userID) => ({
    type: types.DELETE_USER,
    payload: userID
})

export const getUsers = () => ({
    type: types.GET_USERS,
    payload: {url: '/data/users.json'}
})
