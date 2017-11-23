/**
 * Created by lailai on 2017/11/23.
 * 入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/AppleReducer.js';
import AppleBasket from './containers/AppleBasket.jsx';

const store=createStore(reducers,applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <AppleBasket/>
    </Provider>,
    document.getElementById('container')
);