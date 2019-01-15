import { LOGIN, LOGIN_SUCCESS } from '../../constants/auth';

/**
* @param {Object} state - Default application state
* @param {Object} action - Action from action creator
* @returns {Object} New state
*/
const initialState = {
  loading: false
};

const login = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false
      };
    default: return state;
  }
};

export default login;