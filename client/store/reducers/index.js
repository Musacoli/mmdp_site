import { combineReducers } from 'redux';
import login from './auth/login';
import sidebar from './sidebar';


const rootReducer = combineReducers({
  login,
  sidebar,
});

export default rootReducer;
