import { Provider } from 'react-redux';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import reducers from './lib/reducers';
import App from './components/app';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const rootReducer = combineReducers(reducers);
const store = createStoreWithMiddleware(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
