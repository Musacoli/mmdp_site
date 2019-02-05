/* eslint import/no-named-as-default: 0 */
import Dashboard from '../views/Dashboard';
import Group from '../views/Group';
import GroupForm from '../views/Group/GroupForm';
import GroupUpdateForm from '../views/Group/GroupUpdateView';
import Login from '../containers/Login';
import AddReport from '../views/Resources/Report/AddReport';
import EditReport from '../views/Resources/Report/EditReport';
import ListReport from '../views/Resources/Report/ListReport';
import AddDocument from '../views/Resources/Document/AddDocument';
import EditDocument from '../views/Resources/Document/EditDocument';
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
import PillarOneView from '../views/Pillar/pillarOne';
import PillarTwoView from '../views/Pillar/pillarTwo';
import PillarThreeView from '../views/Pillar/pillarThree';
import PillarFourView from '../views/Pillar/pillarFour';
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
    path: '/resources/reports/add',
    name: 'Add Report',
    component: AddReport,
    exact: true,
  },
  {
    path: '/resources/reports/:id/edit',
    name: 'Edit Report',
    component: EditReport,
    exact: true,
  },
  {
    path: '/resources/reports',
    name: 'Reports',
    component: ListReport,
    exact: true,
  },
  {
    path: '/resources/research/add',
    name: 'Add Research',
    component: AddResearch,
  },
  {
    path: '/resources/document/add',
    name: 'Add Document',
    component: AddDocument,
    exact: true,
  },
  {
    path: '/resources/report/media/add',
    name: 'Add Media',
    component: AddDocument,
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
  {
    path: '/pillar-1',
    name: 'PillarOne',
    component: PillarOneView,
    exact: false,
  },
  {
    path: '/pillar-2',
    name: 'PillarTwo',
    component: PillarTwoView,
    exact: false,
  },
  {
    path: '/pillar-3',
    name: 'PillarThree',
    component: PillarThreeView,
    exact: false,
  },
  {
    path: '/pillar-4',
    name: 'PillarFour',
    component: PillarFourView,
    exact: false,
  },
  {
    path: '/resources/documents/edit/:id',
    name: 'Edit resources document',
    component: EditDocument,
    exact: true,
  },
];

export default routes;
