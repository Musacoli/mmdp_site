import Login from '../containers/Login';
import AddUserView from '../views/Users';
import editEmailView from '../views/Users/editEmailView';
import { EditUserView} from "../views/Users";

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
  {
    path: '/users/all',
    name: 'confirmation',
    component: EditUserView,
  },
];

export default routes;
