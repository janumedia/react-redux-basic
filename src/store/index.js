import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from '../reducers/userReducer';
//import userMiddleWare from '../middleware/userMiddleWare';

//export default createStore (userReducer, applyMiddleware(userMiddleWare));
export default createStore (userReducer, applyMiddleware(thunk));