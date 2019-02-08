import {
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
} from '../../../constants/events';

export const initialState = {
  deleting: false,
  status: null,
  error: null,
};

const deleteEvent = (state = initialState, action = {}) => {
  switch (action.type) {
    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        deleting: true,
        status: null,
        error: null,
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        deleting: false,
        status: action.response.status,
      };
    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        deleting: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default deleteEvent;
