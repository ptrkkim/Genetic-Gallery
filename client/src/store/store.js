import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const enhancer = process.env.NODE_ENV === 'production'
  ? applyMiddleware(thunk)
  : applyMiddleware(thunk, logger);

export default createStore(
  rootReducer,
  enhancer,
);
