import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import store from '../../store';
import * as userActions from '../../actions/userActions';
import { ADD_USER } from '../../constants/action-types';
import Form from '../../components/Form';

jest.useFakeTimers();

describe('Form component', () => {

    let wrapper, form, inputName, inputRole, addUserSpy;

    beforeEach(() => {
        wrapper = shallow(<Form store={store}/>).dive();
        form  = wrapper.find('form');
        inputName = wrapper.find('#name');
        inputRole = wrapper.find('#role');
        addUserSpy = jest.spyOn(userActions, 'addUser');
    });

    afterEach(() => {
        addUserSpy.mockRestore();
        //jest.resetAllMocks();
        jest.clearAllTimers();
    })

    it('should render properly', () => {
        expect(wrapper.type()).toEqual('div');
        expect(wrapper.hasClass('Form')).toBe(true);
        expect(wrapper.find('#name')).toHaveLength(1);
        expect(wrapper.find('#role')).toHaveLength(1);
        expect(wrapper.find('button')).toHaveLength(1);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    
    it('should trigger "addUser', () => {
        form.simulate('submit', {preventDefault:() => {}});
        expect(addUserSpy).toHaveBeenCalledTimes(1);
    })

    it('should return "ADD_USER.FAILED" if NOT fill both "name" and "role"', async() => {
        form.simulate('submit', {preventDefault:() => {}});
        
        jest.runOnlyPendingTimers();
        expect(addUserSpy).toHaveBeenCalledTimes(1);
        
        //simulate failed mock resolved
        const mockResolveAddUser = addUserSpy.mockResolvedValueOnce();
        await mockResolveAddUser();

        expect(wrapper.state('status')).toEqual(ADD_USER.FAILED);
    })

    
    it('should reset form if return "ADD_USER.SUCCES"', async () => {
        
        inputName.simulate('change', {target:{id:"name", value:"Dave"}});
        inputRole.simulate('change', {target:{id:"role", value:"Engineer"}});
        
        form.simulate('submit', {target:form, preventDefault:() => {}});
        jest.runOnlyPendingTimers();

        const mockResolveAddUser = addUserSpy.mockResolvedValueOnce();
        await mockResolveAddUser();
        
        if(wrapper.state('status') === ADD_USER.SUCCESS)
        {
            expect(wrapper.state('name')).toEqual('');
            expect(wrapper.state('role')).toEqual('');
        } else {
            expect(wrapper.state('name')).toEqual('Dave');
            expect(wrapper.state('role')).toEqual('Engineer');
        }
    });

    it('should return "ADD_USER.FAILED if "name" already exist', async () => {
        
        inputName.simulate('change', {target:{id:"name", value:"Dave"}});
        inputRole.simulate('change', {target:{id:"role", value:"Lead Engineer"}});
        
        form.simulate('submit', {target:form, preventDefault:() => {}});
        jest.runOnlyPendingTimers();

        const mockResolveAddUser = addUserSpy.mockResolvedValueOnce();
        await mockResolveAddUser();

        expect(wrapper.state('status')).toEqual(ADD_USER.FAILED);
    });
})