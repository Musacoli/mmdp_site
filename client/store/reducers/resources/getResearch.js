import {
  GET_USER_RESEARCH,
  GET_USER_RESEARCH_SUCCESS,
  GET_USER_RESEARCH_FAILURE,
} from '../../../constants/resources/research';

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
const initialState = {
  loading: false,
};

const getResearchReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_RESEARCH:
      return {
        ...state,
        payload: action.payload,
        loading: true,
      };
    case GET_USER_RESEARCH_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    case GET_USER_RESEARCH_FAILURE:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default getResearchReducer;
