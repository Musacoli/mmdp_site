import {
  ADD_USER_RESEARCH,
  ADD_USER_RESEARCH_SUCCESS,
  ADD_USER_RESEARCH_FAILURE,
} from '../../../constants/resources/research';

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
const initialState = {};

const researchReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_USER_RESEARCH:
      return {
        ...state,
        payload: action.payload,
      };
    case ADD_USER_RESEARCH_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };
    case ADD_USER_RESEARCH_FAILURE:
      return {
        ...state,
        payload: action.payload,
      };
    default:
      return state;
  }
};

export default researchReducer;
