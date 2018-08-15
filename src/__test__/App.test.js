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

    const findNode = (component, type) => {
        const tree = component.toJSON();
        const section = tree.filter(node => node.type === 'section')[0];
        const Form = section.children.find(node => node.props.className && node.props.className.indexOf('Form') > -1);
        const List = section.children.find(node => node.type === 'ul');
        const form = Form.children.find(node => node.type == 'form');
        const Status = Form.children.find(node => node.props.className && node.props.className.indexOf('Status') > -1);
        const inputList = form.children[0].children.filter(node => node.type === 'input');
        switch(type) {
            case 'section':
                return section;
            case 'form':
                return form;
            case 'name': case 'role':
                return inputList.find(node => node.props.id == type);
            case 'Status':
                return Status;
            case 'List':
                return List;
        }
    }

    const resolveGetUsers = async() => {
        const mockGetUsers = getUsersSpy.mockResolvedValueOnce();
        jest.runOnlyPendingTimers();
        await mockGetUsers();
    }

    const testAndSimulateForm = async (component, name, role) => {
        const inputName = findNode(component, 'name');
        const inputRole = findNode(component, 'role');
        const form = findNode(component, 'form');
        
        //simulate input changed
        inputName.props.onChange({target:{value:name}});
        inputRole.props.onChange({target:{value:role}});

        //simulate form submit
        form.props.onSubmit({preventDefault:()=>{}});
        
        //simulate resolved actions
        jest.runOnlyPendingTimers();
        const mockAddUser = addUserSpy.mockResolvedValueOnce();
        await mockAddUser();

        //get updated DOM
        expect(component.toJSON()).toMatchSnapshot();
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

    it('should render intial load', async () => {
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        
        await resolveGetUsers();
        
        //update
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should update Status text during submiting new user', async () => {
        
        await resolveGetUsers();

        const form = findNode(component, 'form');
        const status = findNode(component, 'Status');

        //simulate form submit
        form.props.onSubmit({preventDefault:()=>{}});
        //status state should updated
        expect(findNode(component, 'Status')).not.toEqual(status);
    })

    it('should add user item onSubmit form', async () => {
        
        await resolveGetUsers();
        
        testAndSimulateForm(component, user2.name, user2.role);
        
    });

    it('should render error Status text when submit invalid input', async () => {
        
        await resolveGetUsers();
        
        testAndSimulateForm(component, '', '')//user.name, user.role);
    });

    it('should render different button label and remove user item from list when delete button clicked', async () => {
        
        await resolveGetUsers();
        
        const findUserDeleteBtn = (component) => {
            const listUser = findNode(component, 'List');
            const userComponent = listUser.children.find(node => node.props.className.indexOf('User') > -1);
            return userComponent.children[1].children.find(node => node.type === 'button');
        }
        
        const listUser = findNode(component, 'List');
        const deleteBtn = findUserDeleteBtn(component);
        
        //simulate onClick
        deleteBtn.props.onClick();
        
        //get updated DOM
        expect(findUserDeleteBtn(component)).not.toEqual(deleteBtn);

        //simulate resolved actions
        jest.runOnlyPendingTimers();
        const mockDeleteUser = deleteUserSpy.mockResolvedValueOnce();
        await mockDeleteUser()

        //get updated DOM
        expect(findNode(component, 'List')).not.toEqual(listUser);
    });

})