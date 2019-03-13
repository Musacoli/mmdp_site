import {
  GET_COUNTRY_DROPDOWN_REQUEST,
  GET_COUNTRY_DROPDOWN_SUCCESS,
  GET_COUNTRY_DROPDOWN_FAILURE,
  UPDATE_COUNTRY_DROPDOWN_REQUEST,
  UPDATE_COUNTRY_DROPDOWN_SUCCESS,
  UPDATE_COUNTRY_DROPDOWN_FAILURE,
  DELETE_USER_COUNTRY_DROPDOWN,
  DELETE_USER_COUNTRY_DROPDOWN_SUCCESS,
  DELETE_USER_COUNTRY_DROPDOWN_FAILURE,
} from '../../../constants/dropdowns/country';

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
const initialState = {};

const countryDropDown = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_COUNTRY_DROPDOWN_REQUEST:
    case UPDATE_COUNTRY_DROPDOWN_REQUEST:
    case DELETE_USER_COUNTRY_DROPDOWN:
      return {
        ...state,
        payload: action.payload,
      };
    case GET_COUNTRY_DROPDOWN_SUCCESS:
      return {
        ...state,
        results: action.payload,
      };

    case DELETE_USER_COUNTRY_DROPDOWN_SUCCESS:
      return {
        ...state,
        results: {
          ...state.results,
          data: {
            ...state.results.data,
            results: state.results.data.results.filter(
              (items) => items._id !== action.payload,
            ),
          },
        },
      };

    case UPDATE_COUNTRY_DROPDOWN_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };
    case GET_COUNTRY_DROPDOWN_FAILURE:
    case UPDATE_COUNTRY_DROPDOWN_FAILURE:
    case DELETE_USER_COUNTRY_DROPDOWN_FAILURE:
      return {
        ...state,
        payload: action.payload,
      };
    default:
      return state;
  }
};

export default countryDropDown;
