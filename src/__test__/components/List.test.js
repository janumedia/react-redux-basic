import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import List from '../../components/List';
import User from '../../components/User';

describe('List component', () => {
    
    const props = {
        users: [
            {
                id: 20,
                name: "Charlie Jackson",
                role: "CTO"
            },
            {
                id: 1,
                name: "John Doe",
                role: "CEO"
            },
            {
                id: 3,
                name: "Dave Esco",
                role: "Engineer"
            },
            {
                id: 2,
                name: "Charlie Jackson",
                role: "CTO"
            }
        ]
    };

    let component, totalUsers = props.users.length;
    
    beforeEach(() => {
        component = shallow(<List {...props} />);
    });

    it('should render properly', () => {
        expect(component.type()).toEqual('ul');
        expect(component.children()).toHaveLength(totalUsers);
        expect(component.childAt(0).type()).toEqual(User);
        expect(component.childAt(totalUsers-1).type()).toEqual(User);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render items short by "id" descending', () => {
        const shortedUsers = props.users.sort((userA, userB) => userA.id > userB.id ? -1 : 1);
        const matches = component.children().map(node => node)
        .filter((node, index) => {
            return node.props().id == shortedUsers[index].id;
        }).length;

        expect(matches).toEqual(props.users.length);
    })
})