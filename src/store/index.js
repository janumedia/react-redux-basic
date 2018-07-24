import { createStore } from 'redux';

import userReducer from '../reducers/user';

export default createStore (userReducer);