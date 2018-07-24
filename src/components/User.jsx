import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {deleteUser} from '../actions/user';

import './User.scss';

const mapDispatchToProps = dispatch => {
    return {
        deleteUser: userID => dispatch(deleteUser(userID))
    };
};

class User extends React.Component {

    componentDidMount() {
        this.timerID = setTimeout(() => {
            this.refs.userElement.classList.remove("hidden");
            //document.querySelector(".User.hidden").classList.remove("hidden");
        }, 10)
    }

    componentWillUnmount() {
        clearTimeout(this.timerID);
    }

    //optimization only render new user
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props === nextProps)
    }

    deleteUser(e) {
        this.props.deleteUser(this.props.id);
    }

    render() {
        const {name, role} = this.props;
        return (
            <div className="User hidden" ref="userElement">
                <div>
                    <p>Name: {name}</p>
                    <p>Role: {role}</p>
                </div>
                <div>
                    <button onClick={this.deleteUser.bind(this)}>Delete</button>
                </div>
            </div>
        );
    }
}

User.propTypes = {
    name: PropTypes.string,
    role: PropTypes.string
}

export default connect(null, mapDispatchToProps)(User);