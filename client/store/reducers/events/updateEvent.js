import {
  UPDATE_EVENT_FAILURE,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_REQUEST,
} from '../../../constants/events';

export const intialState = {
  data: {},
  error: {},
  loading: false,
};

const UpdateEvent = (state = intialState, action) => {
  switch (action.type) {
    case UPDATE_EVENT_FAILURE:
      return {
        ...state,
        error: action.payload.data,
        loading: false,
      };
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case UPDATE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return { ...state };
  }
};

export default UpdateEvent;
