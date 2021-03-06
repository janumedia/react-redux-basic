import axios from 'axios';

const getUsers = () => {
    return new Promise((resolve, reject) => {
        //simulate loading delay
        setTimeout(() => {
            return axios.get('/data/users.json')
                   .then(response => {
                       resolve(response.data);
                   })
                   .catch(error => {
                        reject(error.toString());
                   });
       }, 2000);
   })
}

const addUser = (users, newUser) => {
    return new Promise((resolve, reject) => {
        //simulate loading delay
        setTimeout(() => {
            const {name, role} = newUser;
            if(!name || name.length == 0 || !role || role.length == 0)
            {
                reject('Name and Role is required!!');
                return;
            }
            const exist = users.find(user => user.name === name);
            if(!exist) {
                const id = users.length > 0 ? parseInt([...users].pop().id) + 1 : 1;
                const user = {...newUser, id} 
                resolve([...users, user]);
            } else {
                reject(`${name} is already exist!`);
            }
        }, 1200);
    })
}

const deleteUser = (users, id) => {
    return new Promise((resolve, reject) => {
        //simulate loading delay
        setTimeout(() => {
            const exist = users.find(user => user.id === id);
            if(exist) {
                resolve(users.filter(user => user.id !== id));
            } else {
                reject('User not exist!');
            }
        }, 1000);
    })
}

export default { getUsers, addUser, deleteUser };