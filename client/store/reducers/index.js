import { combineReducers } from 'redux';
import login from './auth/login';
import register from './users/';
import sidebar from './sidebar';


const rootReducer = combineReducers({
  login,
  register,
  sidebar,
});

export default rootReducer;
