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
import documents from './resources/document';
import report from './resources/report';
import Users from './users/fetchUsers';
import deleteUser from './users/deleteUser';
import createEntry from './events/event';
import listEvents from './events/events';
import singleEvent from './events/singleEvent';
import deleteEvent from './events/deleteEvent';
import updateEvent from './events/updateEvent';
import coordination from './about/coordination';
import edoStateApproach from './about/edoStateApproach';
import objectives from './about/objectives';
import research from './resources/research';
import editResearch from './resources/editResearch';
import {
  pillarOneReducer,
  pillarTwoReducer,
  pillarThreeReducer,
  pillarFourReducer,
} from './pillar/pillar';
import archive from './resources/archive';
import deleteDoc from './resources/deleteDoc';
import getResearch from './resources/getResearch';
import media from './resources/media';
import addStakeholder from './stakeholders/addStakeholder';
import country from './dropdowns/country';
import states from './dropdowns/state';

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
  edoStateApproach,
  objectives,
  research,
  pillarOneReducer,
  pillarTwoReducer,
  pillarThreeReducer,
  pillarFourReducer,
  archive,
  deleteDoc,
  editResearch,
  getResearch,
  media,
  addStakeholder,
  country,
  states,
});

export default rootReducer;
