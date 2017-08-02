import React from 'react';
import ReactDOM from 'react-dom';

import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import './bootstrap.css';
import './index.css';
import reducers from './reducers';

import App from './containers/App.js';

import registerServiceWorker from './registerServiceWorker';

const client = axios.create({
  baseURL:'http://localhost:3001',
  responseType: 'json'
});
const store = createStore(reducers,applyMiddleware(axiosMiddleware(client)));

ReactDOM.render(
  <Provider store={store}>
    <App/> 
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();