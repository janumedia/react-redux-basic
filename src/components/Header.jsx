import React from 'react';
import menu from '../data/menu';
import './Header.scss';

export default class Header extends React.Component {
    //right now we do optimization as the DOM for this component not required any update
    //but we might to updated later
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    render() {
        return (
            <div className="Header">
                <ul>
                {
                    menu.list.map(item => <li key={item.path}><a href={item.path}>{item.name}</a></li>)
                }
                </ul>
            </div>
        )
    }
}