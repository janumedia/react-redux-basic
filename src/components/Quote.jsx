import React from 'react';

export default class Quote
 extends React.Component {
    
    //optimize performance
    //only upadte the DOM when necessary
    //alternatively: we can use React.PureComponent
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.children !== nextProps.children)
    }

    render() {
        return (
            <h1>{this.props.children}</h1>
        )
    }
}