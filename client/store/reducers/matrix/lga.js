import {
  ADD_STATE_SVG_FILE,
  ADD_STATE_SVG_FILE_SUCCESS,
  ADD_STATE_SVG_FILE_FAILURE,
  FETCH_LGA_BOUNDARIES,
  FETCH_LGA_BOUNDARIES_FAILURE,
  FETCH_LGA_BOUNDARIES_SUCCESS,
  UPDATE_LGA,
  UPDATE_LGA_MAP_SUCCESS,
  UPDATE_LGA_MAP_FAILURE,
} from '../../../constants/matrix/lga';

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export const initialState = {
  data: [],
  loading: false,
};

const LGAMap = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_STATE_SVG_FILE:
      return {
        ...state,
        payload: action.payload,
        loading: true,
      };
    case ADD_STATE_SVG_FILE_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    case ADD_STATE_SVG_FILE_FAILURE:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    case FETCH_LGA_BOUNDARIES:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    case FETCH_LGA_BOUNDARIES_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    case FETCH_LGA_BOUNDARIES_FAILURE:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    case UPDATE_LGA:
      return {
        ...state,
        payload: action.payload,
        loading: true,
      };
    case UPDATE_LGA_MAP_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    case UPDATE_LGA_MAP_FAILURE:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default LGAMap;
