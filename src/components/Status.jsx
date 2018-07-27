import React from 'react';
import {connect} from 'react-redux';

import './Status.scss';

const mapStateToProps = state => state;

const Status = (props) => {
    const className = `Status ${props.error ? 'error' : props.pending ? 'pending' : ''}`;
    return (
        <p className={className}>{
            props.pending ? 'please wait...!' : (props.error ? props.error : '')
        }
        </p>
    )
}

export default connect(mapStateToProps)(Status);