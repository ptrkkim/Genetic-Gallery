import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
const enhancer = process.env.NODE_ENV === 'production'
  ? composeEnhancers(applyMiddleware(thunk))
  : composeEnhancers(applyMiddleware(thunk, logger));

export default createStore(
  rootReducer,
  enhancer,
);
