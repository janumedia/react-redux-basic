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
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            role: ''
        }

        //define methods here to make them testable
        this.handleInputNameChange = this.handleInputNameChange.bind(this);
        this.handleInputRoleChange = this.handleInputRoleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    
    handleInputNameChange(e) {
        this.setState({ name: e.target.value })
    }

    handleInputRoleChange(e) {
        this.setState({ role: e.target.value })
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const {name, role} = this.state;
        this.props.addUser({name, role}).then(status => {
            this.setState({status: status});
            if(status === ADD_USER.SUCCESS) {
                this.setState({
                    name: '',
                    role: ''
                })
            }
        })
    }
    
    render() {
        return (
            <div className="Form">
                <form onSubmit={this.handleFormSubmit}>
                    <div>
                        <label>Name</label>
                        <input type="text" id="name" value={this.state.name} onChange={this.handleInputNameChange} />
                        <label>Role</label>
                        <input type="text" id="role" value={this.state.role} onChange={this.handleInputRoleChange} />
                    </div>
                    <button type="submit">Add User</button>
                </form>
                {this.props.children}
            </div>
        );
    }
};

export default connect(null, mapDispatchToProps)(Form);