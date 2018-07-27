import axios from 'axios';

import {ADD_USER, GET_USERS} from '../constants/action-types';

const getUsers = (store, action) => {
    
    store.dispatch({type: GET_USERS.PENDING});

    //simulate loading delay
    setTimeout(() => {

        axios.get(action.payload.url)
         .then(response => {
            store.dispatch({type: GET_USERS.SUCCESS, payload: response.data.users});
         })
         .catch(error => {
            store.dispatch({type: GET_USERS.FAILED, payload: error.toString()})
         })

    }, 2000);
}

const addUser = (store, action) => {
    
    store.dispatch({type: ADD_USER.PENDING});

    //simulate loading delay
    setTimeout(() => {

        const {name} = action.payload;
        const exits = store.getState().users.find(user => user.name === name);
        if(exits)
        {
            store.dispatch({type: ADD_USER.FAILED, payload: `${name} is already exist!`});
        } else 
        {
            store.dispatch({type: ADD_USER.SUCCESS, payload: action.payload});
        }

    }, 2000);
}

const userMiddleWare = store => next => action => {
    //console.log(action);

    switch(action.type) {
        case GET_USERS:
            getUsers(store, action);
            return;
        case ADD_USER:
            addUser(store, action);
            return;
    }
    
    next(action);
}

export default userMiddleWare;