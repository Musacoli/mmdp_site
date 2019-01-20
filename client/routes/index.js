/* eslint import/no-named-as-default: 0 */
import Login from '../containers/Login';
import Dashboard from '../views/Dashboard';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
];

export default routes;
