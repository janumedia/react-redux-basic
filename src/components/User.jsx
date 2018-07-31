import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {deleteUser} from '../actions/userActions';
import {DELETE_USER} from '../constants/action-types';

import './User.scss';

const mapDispatchToProps = dispatch => {
    return {
        deleteUser: userID => dispatch(deleteUser(userID))
    };
};

class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            deleting: false
        }

        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
        this.timerID = setTimeout(() => {
            this.setState({loaded: true})
        }, 10)
    }

    componentWillUnmount() {
        this.mounted = false;
        clearTimeout(this.timerID);
    }

    //optimization only render new user
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props === nextProps)
    }

    deleteUser(e) {
        if(this.state.deleting) return;
        this.setState({deleting: true});
        this.props.deleteUser(this.props.id)
                  .then(status => {
                    if(!this.mounted) return;
                    this.setState({
                        deleting: status === DELETE_USER.SUCCESS
                    })
                  })
    }

    render() {
        const {name, role} = this.props;
        return (
            <div className={`User ${this.state.loaded ? '' : 'hidden'} ${this.state.deleting ? 'deleting' : ''}`}>
                <div>
                    <p>Name: {name}</p>
                    <p>Role: {role}</p>
                </div>
                <div>
                    <button onClick={this.deleteUser.bind(this)}>{this.state.deleting ? 'Deleting' : 'Delete'}</button>
                </div>
            </div>
        );
    }
}

User.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
}

export default connect(null, mapDispatchToProps)(User);