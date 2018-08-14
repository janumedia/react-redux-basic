import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axios from 'axios';

import api from '../../api';
import {initialState} from '../../reducers/userReducer';
import * as userActions from '../../actions/userActions';
import * as types from '../../constants/action-types';

//mock axios module
//https://jestjs.io/docs/en/mock-functions.html#mocking-modules
//solution one: use jest.mock()
jest.mock('axios');
//soluton two: create mock file inside folder __mocks__

describe('userActions', () => {
    
    const mockStore = configureStore([thunk.withExtraArgument(api)]);

    const user = {
        id: 1,
        name: 'Dave',
        role: 'Engineer'
    }

    let store, getState;

    beforeEach(() => {
        getState = {...initialState};
        store = mockStore(getState);
    });

    it('should dispach action', () => {
        
        const action = { type: 'TO_DO' };
        
        store.dispatch(action);

        const expectedActions = store.getActions();
        
        expect(expectedActions).toEqual([action]);

    });

    it('should has GET_USERS_PENDING and return GET_USERS_SUCCESS', () => {
        //mocking axios module
        axios.get.mockResolvedValueOnce({
            data:
            {
                users:[user]
            }
        });
        
        const pendingActions = { type: types.GET_USERS.PENDING };

        return store.dispatch(userActions.getUsers())
                    .then(data => {
                        const expectedActions = store.getActions();
                        expect(data.type).toEqual(types.GET_USERS.SUCCESS);
                        expect(expectedActions).toEqual(expect.arrayContaining([pendingActions]))
                    })
    });

    it('should has GET_USERS_PENDING and return GET_USERS_FAILED when rejected or has an error', () => {
        //mocking axios module
        axios.get.mockRejectedValueOnce({});
        
        const pendingActions = { type: types.GET_USERS.PENDING };

        return store.dispatch(userActions.getUsers())
                    .then(data => {
                        const expectedActions = store.getActions();
                        expect(data.type).toEqual(types.GET_USERS.FAILED);
                        expect(expectedActions).toEqual(expect.arrayContaining([pendingActions]))
                    })
    })

    it('should has ADD_USER_PENDING and return ADD_USER_FAILED when form incomplete', () => {
        const pendingActions = { type: types.ADD_USER.PENDING };
        
        return store.dispatch(userActions.addUser({name:'', role:''}))
                    .then(res => {
                        const expectedActions = store.getActions();
                        expect(expectedActions).toEqual(expect.arrayContaining([pendingActions]));
                        expect(res).toEqual(types.ADD_USER.FAILED);
                    })
    });

    it('should has ADD_USER_PENDING and return ADD_USER_FAILED when name already exist', () => {
        //add user first
        getState.users = [...getState.users, {...user}];

        store = mockStore(getState);

        const {name, role} = user;
        const pendingActions = { type: types.ADD_USER.PENDING };
        
        return store.dispatch(userActions.addUser({name, role}))
                    .then(res => {
                        const expectedActions = store.getActions();
                        expect(expectedActions).toEqual(expect.arrayContaining([pendingActions]));
                        expect(res).toEqual(types.ADD_USER.FAILED);
                    })
    });

    it('should has ADD_USER_PENDING and return ADD_USER_SUCCESS', () => {
        
        const {name, role} = user;
        const pendingActions = { type: types.ADD_USER.PENDING };
        
        return store.dispatch(userActions.addUser({name, role}))
                    .then(res => {
                        const expectedActions = store.getActions();
                        expect(expectedActions).toEqual(expect.arrayContaining([pendingActions]));
                        expect(res).toEqual(types.ADD_USER.SUCCESS);
                    })
    });

    it('should return DELETE_USER_FAILED when user not exist', () => {
        return store.dispatch(userActions.deleteUser(user.id))
                    .then(res => {
                        expect(res).toEqual(types.DELETE_USER.FAILED);
                    });
    });

    it('should return DELETE_USER_SUCCESS', () => {
        //add user first
        getState.users = [...getState.users, {...user}];

        store = mockStore(getState);
        
        const successActions = { 
            type: types.DELETE_USER.SUCCESS, 
            payload: getState.users.filter(obj => obj.id !== user.id)
        };

        return store.dispatch(userActions.deleteUser(user.id))
                    .then(res => {
                        const expectedActions = store.getActions();
                        expect(expectedActions).toEqual(expect.arrayContaining([successActions]));
                        expect(res).toEqual(types.DELETE_USER.SUCCESS);
                        
                    });
    });

})