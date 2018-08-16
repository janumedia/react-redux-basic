import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import store from '../../store';
import * as userActions from '../../actions/userActions';
import User from '../../components/User';

jest.useFakeTimers();

describe('User component', () => {

    const props = {
        store,
        name: 'John Doe',
        role: 'CEO',
        id: 1
    }

    const simulatePromiseResolved = () => new Promise(resolve => {
        jest.runOnlyPendingTimers();
        setImmediate(resolve);
    });

    let wrapper, button, deleteUserSpy;

    beforeEach(() => {
        //use .dive() is important for redux-connected component
        //https://github.com/airbnb/enzyme/issues/1002#issuecomment-310796612
        wrapper = shallow(<User {...props}/>).dive();
        button = wrapper.find('button');
        deleteUserSpy = jest.spyOn(userActions, 'deleteUser');
    });

    afterEach(() => {
        deleteUserSpy.mockRestore();
        jest.clearAllTimers();
    });
    
    it('should rendered properly', () => {
        expect(wrapper.type()).toEqual('div');
        expect(wrapper.hasClass('User')).toBe(true);
        expect(wrapper.find('p').first().text()).toEqual(`Name: ${props.name}`);
        expect(wrapper.find('p').last().text()).toEqual(`Role: ${props.role}`);
        expect(wrapper.find('button')).toHaveLength(1);
        expect(wrapper.state('loaded')).toBe(false);
        expect(wrapper.hasClass('hidden')).toBe(true);
        expect(toJson(wrapper)).toMatchSnapshot();
        //process pending timer
        jest.runOnlyPendingTimers();
        expect(wrapper.state('loaded')).toBe(true);
        //update component
        wrapper.update();
        expect(wrapper.hasClass('hidden')).toBe(false);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should triggered "deleteUser" on button clicked', () => {
        button.simulate('click');
        expect(deleteUserSpy).toHaveBeenCalled();
    });

    it('should triggered "deleteUser" only once upon continous button clicked', () => {
        button.simulate('click');
        button.simulate('click');
        button.simulate('click');
        expect(deleteUserSpy).toHaveBeenCalledTimes(1);
    });

    it('should update state on button clicked and "deleteuser" resolved', async() => {
        button.simulate('click');
        expect(wrapper.state('deleting')).toBe(true);
        
        await simulatePromiseResolved();

        expect(wrapper.state('deleting')).toBe(false);
    });

    it('should able button click after "deleteuser" resolved', async() => {
        button.simulate('click');
        expect(deleteUserSpy).toHaveBeenCalledTimes(1);
        expect(wrapper.state('deleting')).toBe(true);
        
        button.simulate('click');
        //until resolved action will not able to call
        expect(deleteUserSpy).toHaveBeenCalledTimes(1);

        await simulatePromiseResolved();

        expect(wrapper.state('deleting')).toBe(false);
        button.simulate('click');
        expect(deleteUserSpy).toHaveBeenCalledTimes(2);
        expect(wrapper.state('deleting')).toBe(true);
    });

    it('should should triggered "deleteUser" and unmount properly', async () => {
        button.simulate('click');
        
        expect(toJson(wrapper)).toMatchSnapshot();
        
        //simulate unmount
        wrapper.unmount();
        //update component
        wrapper.update();
        
        expect(deleteUserSpy).toHaveBeenCalledTimes(1);
        
        await simulatePromiseResolved();

        expect(toJson(wrapper)).toMatchSnapshot();
    });

});