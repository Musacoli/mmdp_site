import { combineReducers } from 'redux';
import login from './auth/login';
import sidebar from './sidebar';
import groups from './group';
import permissions from './permission';
import groupCart from './group/cart';


const rootReducer = combineReducers({
  sidebar,
  groups,
  permissions,
  groupCart,
  login,
});

export default rootReducer;
