import React from 'react';

import User from './User';

const List = ({users}) => {
    const listUsers = users.sort((userA, userB) => (userA.id > userB.id) ? -1 : 1)
                           .map(({name, role, id}) => <User name={name} role={role} id={id} key={id}/>);
    return (
        <ul>{listUsers}</ul>
    )
}

export default List;