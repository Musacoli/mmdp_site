import {
  SINGLE_EVENT_FAILURE,
  SINGLE_EVENT_SUCCESS,
  SINGLE_EVENT_REQUEST,
  UPDATE_DATA,
} from '../../../constants/events';

export const intialState = {
  data: {},
  error: {},
  inputData: {},
};

const SingleEvent = (state = intialState, action) => {
  switch (action.type) {
    case SINGLE_EVENT_FAILURE:
      return {
        ...state,
        error: action.payload.data,
        loading: false,
      };
    case SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case UPDATE_DATA:
      return {
        ...state,
        inputData: { ...action.payload },
      };
    case SINGLE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return { ...state };
  }
};

export default SingleEvent;
