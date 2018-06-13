import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import App from 'App/App.jsx';


const reducers = combineReducers({
  global: require('App/reducer.js'),
  forms: require('Form/reducer.js'),
  textboxes: require('Textbox/reducer.js'),
  checkboxes: require('Checkbox/reducer.js'),
});

// ------ Middleware stuff ------

const middleware = [
  // require('path/to/middleware'),
];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const devTools = window.devToolsExtension;
const store = createStoreWithMiddleware(reducers, devTools && devTools());

// ------------------------------

store.subscribe(() => {
  console.log('state changed', store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  
  document.getElementById('main')
);

console.log(store.getState());

export default store;