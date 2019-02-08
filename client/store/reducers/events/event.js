import {
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
} from '../../../constants/events';

export const initialState = {
  response: null,
  adding: false,
  error: null,
};

const createEvent = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_EVENT_REQUEST:
      return {
        ...state,
        adding: true,
        error: null,
      };
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        response: action.payload,
        adding: false,
        error: null,
      };
    case ADD_EVENT_FAILURE:
      return {
        ...state,
        adding: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default createEvent;
