import { combineReducers } from 'redux';
import sidebar from './sidebar';
import groups from './group';
import permissions from './permission';
import groupCart from './group/cart';


const rootReducer = combineReducers({
  sidebar,
  groups,
  permissions,
  groupCart,
});

export default rootReducer;
