import { combineReducers } from 'redux';
import login from './auth/login';


const rootReducer = combineReducers({
  login,
});

export default rootReducer;
