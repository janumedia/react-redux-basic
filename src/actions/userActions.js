import * as types from "../constants/action-types";
import { resolve } from 'url';

export const getUsers = () => (dispatch, getState, api) => {
    
    const GET_USERS = types.GET_USERS;

    dispatch({type: GET_USERS.PENDING});

    api.getUsers()
       .then(data => dispatch({type: GET_USERS.SUCCESS, payload: data.users}))
       .catch(error => dispatch({type: GET_USERS.FAILED, payload: error}))
}

export const addUser = newUser => (dispatch, getState, api) => {
    
    const ADD_USER = types.ADD_USER;
    
    dispatch({type: ADD_USER.PENDING});

    return api.addUser(getState().users, newUser)
       .then(data => {
            dispatch({type: ADD_USER.SUCCESS, payload: data});
            return ADD_USER.SUCCESS;
       })
       .catch(error => {
            dispatch({type: ADD_USER.FAILED, payload: error});
            return ADD_USER.FAILED;
       });
   
}

export const deleteUser = userID => (dispatch, getState, api) => {

    const DELETE_USER = types.DELETE_USER;

    //dispatch({type: DELETE_USER.PENDING});

    return api.deleteUser(getState().users, userID)
              .then(users => {
                  dispatch({type: DELETE_USER.SUCCESS, payload:users});
                  return DELETE_USER.SUCCESS;
              })
              .catch(error => {
                  dispatch({type: DELETE_USER.FAILED, payload:error});
                  return DELETE_USER.FAILED;
              });

}