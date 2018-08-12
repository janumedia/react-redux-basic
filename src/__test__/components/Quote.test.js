import React from 'react';
import { shallow } from 'enzyme';

import Quote from '../../components/Quote';

describe('Quote component', () => {
    it('should render text correctly', () => {
        const expectedText = 'Hello World';
        const expectedUpdatedText = 'Hey Joe';
        const component = shallow(<Quote>{expectedText}</Quote>);
        expect(component.text()).toEqual(expectedText);
        expect(component.props().children).toEqual(expectedText);
        component.setProps({ children: expectedUpdatedText });
        expect(component.text()).toEqual(expectedUpdatedText);
    })
})
