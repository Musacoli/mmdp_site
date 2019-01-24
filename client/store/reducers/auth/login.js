import { LOGIN, LOGIN_SUCCESS_OR_FAILURE } from '../../../constants/auth';

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
const initialState = {};

const loginReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        payload: action.payload,
      };
    case LOGIN_SUCCESS_OR_FAILURE:
      return {
        ...state,
        payload: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
