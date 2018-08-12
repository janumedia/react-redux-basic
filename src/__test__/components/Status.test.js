import React from 'react';
import renderer from 'react-test-renderer';

import store from '../../store';
import { GET_USERS, ADD_USER, DELETE_USER } from '../../constants/action-types';
import Status from '../../components/Status';

describe('Status component', () => {
    
    it('should display correct status', () => {
        const c = renderer.create(
            <Status store={store}/>
        );
        
        let tree = c.toJSON();
        expect(tree).toMatchSnapshot();
    
        store.dispatch({type: GET_USERS.PENDING});
        tree = c.toJSON();
        expect(tree).toMatchSnapshot();
    
        store.dispatch({type: GET_USERS.FAILED, payload:"Error, get users failed!"});
        tree = c.toJSON();
        expect(tree).toMatchSnapshot();
    
        store.dispatch({type: GET_USERS.SUCCESS, payload:[]});
        tree = c.toJSON();
        expect(tree).toMatchSnapshot();
    
        store.dispatch({type: ADD_USER.PENDING});
        tree = c.toJSON();
        expect(tree).toMatchSnapshot();
    
        store.dispatch({type: ADD_USER.FAILED, payload:"Error, add user failed!"});
        tree = c.toJSON();
        expect(tree).toMatchSnapshot();
    
        store.dispatch({type: ADD_USER.SUCCESS, payload:{}});
        tree = c.toJSON();
        expect(tree).toMatchSnapshot();

        store.dispatch({type: DELETE_USER.FAILED, payload:"Error, delete user failed!"});
        tree = c.toJSON();
        expect(tree).toMatchSnapshot();
    
        store.dispatch({type: DELETE_USER.SUCCESS, payload:{}});
        tree = c.toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});