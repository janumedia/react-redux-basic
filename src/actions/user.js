import { ADD_USER, DELETE_USER } from "../constants/action-type";

export const addUser = (newUser) => ({
    type: ADD_USER,
    payload: newUser
})

export const deleteUser = (userID) => ({
    type: DELETE_USER,
    payload: userID
})
