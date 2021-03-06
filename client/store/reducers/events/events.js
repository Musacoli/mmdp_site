/* eslint-disable no-underscore-dangle */
import {
  LIST_EVENTS_REQUEST,
  LIST_EVENTS_SUCCESS,
  LIST_EVENTS_FAILURE,
  UPDATE_EVENTS_LIST,
} from '../../../constants/events';

export const initialState = {
  events: [],
  pagination: {},
  fetching: false,
  error: null,
};

const listEvents = (state = initialState, action = {}) => {
  switch (action.type) {
    case LIST_EVENTS_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case LIST_EVENTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        events: action.events.data,
        pagination: action.events.pagination,
      };
    case UPDATE_EVENTS_LIST: {
      const newEvents = state.events.filter(
        ({ _id }) => _id !== action.item._id,
      );
      return {
        ...state,
        events: newEvents,
      };
    }
    case LIST_EVENTS_FAILURE:
      return {
        ...state,
        fetching: false,
        events: [],
        pagination: {},
        error: action.error,
      };
    default:
      return state;
  }
};

export default listEvents;
