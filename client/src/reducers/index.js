import { combineReducers } from 'redux';
import modal from './modal';
import gallery from './gallery';
import create from './create';

export default combineReducers({
  modal,
  gallery,
  create,
});
