import React from 'react';
import { connect } from 'react-redux';

import { addUser } from '../actions/user';
import './Form.scss';

const mapDispatchToProps = dispatch => {
    return {
        addUser: user => dispatch(addUser(user))
    };
};

class Form extends React.Component {
    
    handleInputChange(e) {
        this.setState(
            { [e.target.id]: e.target.value }
        )
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const {name, role} = this.state;
        this.props.addUser({name, role})
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit.bind(this)}>
                <div>
                    <label>Name</label>
                    <input type="text" id="name" onChange={this.handleInputChange.bind(this)} required/>
                    <label>Role</label>
                    <input type="text" id="role" onChange={this.handleInputChange.bind(this)} required/>
                </div>
                <button type="submit">Add User</button>
            </form>
        );
    }
};

export default connect(null, mapDispatchToProps)(Form);