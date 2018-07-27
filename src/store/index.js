import { createStore, applyMiddleware } from 'redux';

import userReducer from '../reducers/userReducer';
import userMiddleWare from '../middleware/userMiddleWare';

export default createStore (userReducer, applyMiddleware(userMiddleWare));