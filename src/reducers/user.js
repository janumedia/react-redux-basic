import { ADD_USER, DELETE_USER } from '../constants/action-type';

const initialState = {
    users: [
        {
            id: 1,
            name: "John Doe",
            role: "CTO"
        }
    ],
    user: {}
};

const user = (state = initialState, action) => {
    switch(action.type) {
        case ADD_USER:
            const user = {...action.payload, id:state.users.length + 1} 
            return {user, users:[...state.users, user]}
        case DELETE_USER:
            return {...state, users: state.users.filter(user => user.id !== action.payload)}
    }
    return state;
};

export default user;