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
import archiveEvents from './events/archiveEvents';
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
import deleteD from './manageDropdowns/deleteD';
import getResearch from './resources/getResearch';
import media from './resources/media';
import addStakeholder from './stakeholders/addStakeholder';
import country from './dropdowns/country';
import states from './dropdowns/state';
import statuses from './dropdowns/status';
import staffStrengths from './dropdowns/staffStrength';
import targetAudience from './dropdowns/targetAudience';
import communities from './dropdowns/communities';
import LGA from './dropdowns/LGA';
import partnershipType from './dropdowns/partnershipType';
import beneficiaryTypes from './dropdowns/beneficiaryTypes';
import funding from './dropdowns/funding';
import ogranizationType from './dropdowns/organizationType';
import wards from './dropdowns/ward';
import impactTypes from './dropdowns/impactTypes';
import frequency from './dropdowns/frequency';
import thematicPillars from './dropdowns/thematicPillar';
import amountInvested from './dropdowns/amountInvested';
import subTheme from './dropdowns/subTheme';
import focusArea from './dropdowns/focusArea';
import dropdowns from './manageDropdowns/dropdowns';

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
  archiveEvents,
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
  statuses,
  staffStrengths,
  targetAudience,
  communities,
  LGA,
  partnershipType,
  beneficiaryTypes,
  funding,
  ogranizationType,
  wards,
  impactTypes,
  frequency,
  thematicPillars,
  amountInvested,
  subTheme,
  focusArea,
  dropdowns,
  deleteD,
});

export default rootReducer;
