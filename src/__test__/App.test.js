import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import axios from 'axios';

import App from '../App';
import store from '../store/index';
import * as userActions from '../actions/userActions';

jest.mock('axios');

jest.useFakeTimers();

describe('App component', () => {

    const user = {
        id: 4,
        name: 'Dave Mustaine',
        role: 'Engineer'
    }

    const user2 = {
        id: 6,
        name: 'Tony Stark',
        role: 'CEO'
    }

    const testAndSimulateForm = async (component, name, role) => {
        let tree = component.toJSON();
    
        const sectionItems = tree.filter(node => node.type === 'section')[0].children;
        const formDiv = sectionItems.find(node => node.props.className === 'Form').children;
        const form = formDiv.find(node => node.type === 'form');
        const inputList = form.children[0].children.filter(node => node.type === 'input');
        const nameInput = inputList[0];
        const roleInput = inputList[1];
        
        //simulate input onChange
        nameInput.props.onChange({target:{value:name}});
        roleInput.props.onChange({target:{value:role}});
    
        //initial
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    
        form.props.onSubmit({preventDefault:()=>{}});
    
        //update onSubmiting
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    
        jest.runOnlyPendingTimers();
        const mockAddUser = addUserSpy.mockResolvedValueOnce();
        await mockAddUser();
    
        //update after onSubmited
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    }

    let component, getUsersSpy, addUserSpy, deleteUserSpy;

    beforeEach(() => {
        
        getUsersSpy = jest.spyOn(userActions, 'getUsers');
        addUserSpy = jest.spyOn(userActions, 'addUser');
        deleteUserSpy = jest.spyOn(userActions, 'deleteUser');
       
        axios.get.mockResolvedValueOnce({
            data:
            {
                users:[user]
            }
        });

        component = renderer.create(
            <Provider store={store}>
                <App/>
            </Provider>
        )
    });

    afterAll(() => {
        getUsersSpy.mockRestore();
        addUserSpy.mockRestore();
        deleteUserSpy.mockRestore();
        jest.clearAllTimers();
    })

    it('should render emty user list initially', () => {
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render list of user items', async () => {
        
        //initial
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const mockGetUsers = getUsersSpy.mockResolvedValueOnce();
        jest.runOnlyPendingTimers();
        await mockGetUsers();
        
        //update
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

    it('should add user item onSubmit form', async () => {
        
        const mockGetUsers = getUsersSpy.mockResolvedValueOnce();
        jest.runOnlyPendingTimers();
        await mockGetUsers();
        
        testAndSimulateForm(component, user2.name, user2.role);
        
    });

    it('should show error status when submit existing name', async () => {
        
        const mockGetUsers = getUsersSpy.mockResolvedValueOnce();
        jest.runOnlyPendingTimers();
        await mockGetUsers();
        
        testAndSimulateForm(component, user.name, user.role);
        
    });

    it('should remove user item delete button clicked', async () => {
        
        jest.runOnlyPendingTimers();
        const mockGetUsers = getUsersSpy.mockResolvedValueOnce();
        await mockGetUsers();
        
        //initial
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        
        const sectionItems = tree.filter(node => node.type === 'section')[0].children;
        const listUser = sectionItems.filter(node => node.type === 'ul')[0].children;
        const itemUser = listUser[0].children;
        const deleteBtn = itemUser[1].children.find(node => node.type === 'button');
        //simulate onClick
        deleteBtn.props.onClick();

        //update on deleting
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();   

        jest.runOnlyPendingTimers();
        const mockDeleteUser = deleteUserSpy.mockResolvedValueOnce();
        await mockDeleteUser()

        //update after deleted
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

})