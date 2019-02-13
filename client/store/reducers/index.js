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
import documents from './resources/document';
import Users from './users/fetchUsers';
import deleteUser from './users/deleteUser';
import createEntry from './events/event';
import listEvents from './events/events';
import singleEvent from './events/singleEvent';
import deleteEvent from './events/deleteEvent';
import updateEvent from './events/updateEvent';
import coordination from './about/coordination';

const rootReducer = combineReducers({
  sidebar,
  groups,
  permissions,
  groupCart,
  loginReducer,
  governorMessage,
  aboutMMDP,
  report,
  documents,
  register,
  userEdit,
  Users,
  deleteUser,
  fetchOneUser,
  createEntry,
  listEvents,
  singleEvent,
  deleteEvent,
  updateEvent,
  coordination,
});

export default rootReducer;
