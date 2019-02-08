/* eslint import/no-named-as-default: 0 */
import Dashboard from '../views/Dashboard';
import Group from '../views/Group';
import GroupForm from '../views/Group/GroupForm';
import GroupUpdateForm from '../views/Group/GroupUpdateView';
import Login from '../containers/Login';
import AddReport from '../views/Resources/Report/AddReport';
import About from '../containers/About';
import editEmailView from '../views/Users/editEmailView';
import AddUserView, { EditUserView } from '../views/Users';
import CreateEvent from '../containers/events/event';
import ListEvents from '../containers/events/eventsList';
import EditEvents from '../containers/events/editEvents';

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
    component: About,
    exact: false,
  },
  {
    path: '/resources/report/add',
    name: 'Add Report',
    component: AddReport,
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
