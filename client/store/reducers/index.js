import { combineReducers } from 'redux';
import loginReducer from './auth/login';
import register from './users';
import userEdit from './users/editUser';
import fetchOneUser from './users/fetchOneUser';
import sidebar from './sidebar';
import groups from './group';
import permissions from './permission';
import groupCart from './group/cart';
import governorMessage from './about/governorMessage';
import aboutMMDP from './about/aboutMMDP';
import report from './resources/report';
import Users from './users/fetchUsers';
import deleteUser from './users/deleteUser';

const rootReducer = combineReducers({
  sidebar,
  groups,
  permissions,
  groupCart,
  loginReducer,
  governorMessage,
  aboutMMDP,
  report,
  register,
  userEdit,
  Users,
  deleteUser,
  fetchOneUser,
});

export default rootReducer;
