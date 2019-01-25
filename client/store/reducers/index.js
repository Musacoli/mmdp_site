import { combineReducers } from 'redux';
import loginReducer from './auth/login';

const rootReducer = combineReducers({
  loginReducer,
});

export default rootReducer;
