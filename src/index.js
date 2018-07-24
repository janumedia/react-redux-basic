import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/index';
import App from './App';
import './index.scss';

//subscribe store updates
//store.subscribe(() => console.log('store updated!!!'))

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);

//enable test in console
//window.store = store;

//default webpack hot module replacement without ejecting / reload all DOM
if(module.hot) {
    module.hot.accept();
}