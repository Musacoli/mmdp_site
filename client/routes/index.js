import Login from '../containers/Login';
import AddUserView from '../views/Users';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Login, // TODO: User home component instead of Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/users',
    name: 'users',
    component: AddUserView,
  },
];

export default routes;
