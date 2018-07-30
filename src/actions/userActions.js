import axios from 'axios';

import * as types from "../constants/action-types";
import { resolve } from 'url';

export const getUsers = () => dispatch => {
    
    const GET_USERS = types.GET_USERS;

    dispatch({type: GET_USERS.PENDING});

    //simulate loading delay
    setTimeout(() => {

        axios.get('/data/users.json')
         .then(response => {
            dispatch({type: GET_USERS.SUCCESS, payload: response.data.users});
         })
         .catch(error => {
            dispatch({type: GET_USERS.FAILED, payload: error.toString()})
         })

    }, 2000);

}

export const addUser = newUser => (dispatch, getState) => {
    
    const ADD_USER = types.ADD_USER;
    
    dispatch({type: ADD_USER.PENDING});

    //simulate loading delay and use promise
    new Promise((resolve, reject) => {
        setTimeout(() => { 
            resolve();
        }, 2000);
    }).then( () => {
        const {name} = newUser;
        const exits = getState().users.find(user => user.name === name);
        if(exits)
        {
            dispatch({type: ADD_USER.FAILED, payload: `${name} is already exist!`});
        } else 
        {
            dispatch({type: ADD_USER.SUCCESS, payload: newUser});
        }
    })
}

export const deleteUser = userID => ({
    type: types.DELETE_USER,
    payload: userID
})