import { combineReducers } from 'redux';
import login from './auth/login';
import register from './users/';
import userEdit from './users/editUser';
import sidebar from './sidebar';


const rootReducer = combineReducers({
  login,
  register,
  sidebar,
  userEdit,
});

export default rootReducer;
