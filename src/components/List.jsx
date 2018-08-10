import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

const List = ({users}) => {
    //sort by id reverse
    const listUsers = [...users].sort((userA, userB) => (userA.id > userB.id) ? -1 : 1)
                           .map(({name, role, id}) => <User name={name} role={role} id={id} key={id}/>);
    return (
        <ul>{listUsers}</ul>
    )
}

List.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired
        })
    )
}

export default List;