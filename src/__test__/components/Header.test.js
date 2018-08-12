import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Header from '../../components/Header';

describe('Header component', () => {
    let component;
    
    beforeEach(() => {
        component = shallow(<Header/>)
    })
    
    it('should render properly', () => {
        expect(component.type()).toEqual('div');
        expect(component.hasClass('Header')).toBe(true);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should disable shouldComponentUpdate if state changed', () => {
        const expectedText = component.text();
        //try update state
        component.setState({testState:null});
        expect(component.text()).toEqual(expectedText);
    });

    it('should disable shouldComponentUpdate if props changed', () => {
        const expectedText = component.text();
        //try update state
        component.setProps({testProp:null});
        expect(component.text()).toEqual(expectedText);
    });
})