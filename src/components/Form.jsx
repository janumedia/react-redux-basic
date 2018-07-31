import React from 'react';
import { connect } from 'react-redux';

import { addUser } from '../actions/userActions';
import { ADD_USER } from '../constants/action-types';
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
        this.props.addUser({name, role}).then(status => {
            if(status === ADD_USER.SUCCESS) {
                this.refs.name.value = '';
                this.refs.role.value = '';
            }
        });
    }
    
    render() {
        return (
            <div className="Form">
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <div>
                        <label>Name</label>
                        <input type="text" id="name" ref="name" onChange={this.handleInputChange.bind(this)} required/>
                        <label>Role</label>
                        <input type="text" id="role" ref="role" onChange={this.handleInputChange.bind(this)} required/>
                    </div>
                    <button type="submit">Add User</button>
                </form>
                {this.props.children}
            </div>
        );
    }
};

//export default connect(mapStateToProps, mapDispatchToProps)(Form);
export default connect(null, mapDispatchToProps)(Form);