import Login from '../containers/Login';

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
];

export default routes;
