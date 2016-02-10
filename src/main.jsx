import { Provider } from 'react-redux';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { render } from 'react-dom';
import reducers from './lib/reducers';
import App from './components/app';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const rootReducer = combineReducers(reducers);
const store = createStoreWithMiddleware(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
