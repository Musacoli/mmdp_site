import { combineReducers } from 'redux';
import loginReducer from './auth/login';
import sidebar from './sidebar';
import groups from './group';
import permissions from './permission';
import groupCart from './group/cart';
import governorMessage from './about/governorMessage';
import aboutMMDP from './about/aboutMMDP';
import research from './resources/research';

const rootReducer = combineReducers({
  sidebar,
  groups,
  permissions,
  groupCart,
  loginReducer,
  governorMessage,
  aboutMMDP,
  research,
});

export default rootReducer;
