/* eslint import/no-named-as-default: 0 */
import Dashboard from '../views/Dashboard';
import Group from '../views/Group';
import GroupForm from '../views/Group/GroupForm';
import GroupUpdateForm from '../views/Group/GroupUpdateView';
import Login from '../containers/Login';
import AddReport from '../views/Resources/Report/AddReport';
import editEmailView from '../views/Users/editEmailView';
import AddUserView, { EditUserView } from '../views/Users';
import CreateEvent from '../views/Events/AddEventView';
import ListEvents from '../views/Events/ListEventsView';
import EditEvents from '../views/Events/EditEvent';
import {
  GovernorMessage,
  AboutMMDP,
  Coordination,
  Objectives,
  EdoStateApproach,
} from '../views/About';
import AddResearch from '../views/Resources/Research/AddResearch';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    exact: true,
  },
  {
    path: '/group',
    name: 'Add Group',
    component: GroupForm,
    exact: true,
  },
  {
    path: '/group/edit/:id',
    name: 'Edit Group',
    component: GroupUpdateForm,
    exact: false,
  },
  {
    path: '/group/list',
    name: 'List Groups',
    component: Group,
    exact: false,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    exact: false,
  },
  {
    path: '/about',
    name: 'About',
    component: GovernorMessage,
    exact: true,
  },
  {
    path: '/about/governor-message',
    name: 'Governor Message',
    component: GovernorMessage,
    exact: false,
  },
  {
    path: '/about/about-mmdp',
    name: 'About MMDP',
    component: AboutMMDP,
    exact: false,
  },
  {
    path: '/about/coordination',
    name: 'Coordination',
    component: Coordination,
    exact: false,
  },
  {
    path: '/about/edo-state-approach',
    name: 'The Edo State Approach',
    component: EdoStateApproach,
    exact: false,
  },
  {
    path: '/about/objectives',
    name: 'Objectives',
    component: Objectives,
    exact: false,
  },
  {
    path: '/resources/report/add',
    name: 'Add Report',
    component: AddReport,
    exact: true,
  },
  {
    path: '/resources/research/add',
    name: 'Add Research',
    component: AddResearch,
    exact: true,
  },
  {
    path: '/create-event',
    name: 'create-event',
    component: CreateEvent,
  },
  {
    path: '/list-events',
    name: 'list-events',
    component: ListEvents,
  },
  {
    path: '/edit-event/:id',
    name: 'edit-event',
    component: EditEvents,
  },
  {
    path: '/create-event',
    name: 'create-event',
    component: CreateEvent,
  },
  {
    path: '/list-events',
    name: 'list-events',
    component: ListEvents,
  },
  {
    path: '/edit-event/:id',
    name: 'edit-event',
    component: EditEvents,
  },
  {
    path: '/resources/research/add',
    name: 'Add Report',
    component: AddResearch,
    exact: true,
  },
  {
    path: '/users',
    name: 'users',
    component: AddUserView,
    exact: true,
  },
  {
    path: '/users/edit/:email/:username',
    name: 'edit',
    component: editEmailView,
    exact: true,
  },
  {
    path: '/users/all',
    name: 'confirmation',
    component: EditUserView,
    exact: true,
  },
];

export default routes;
