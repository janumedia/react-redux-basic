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
    }
    
    handleInputChange(e) {
        this.setState(
            { [e.target.id]: e.target.value }
        )
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
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <div>
                        <label>Name</label>
                        <input type="text" id="name" value={this.state.name} onChange={this.handleInputChange.bind(this)} />
                        <label>Role</label>
                        <input type="text" id="role" value={this.state.role} onChange={this.handleInputChange.bind(this)} />
                    </div>
                    <button type="submit">Add User</button>
                </form>
                {this.props.children}
            </div>
        );
    }
};

export default connect(null, mapDispatchToProps)(Form);