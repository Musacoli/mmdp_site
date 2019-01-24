import Login from '../containers/Login';
import AddUserView from '../views/Users';
import editEmailView from '../views/Users/editEmailView';

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
  {
    path: '/users/edit',
    name: 'edit',
    component: editEmailView,
  },
];

export default routes;
