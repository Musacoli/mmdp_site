import {
  ADD_STATES,
  ADD_STATES_FAILURE,
  ADD_STATES_SUCCESS,
  FETCH_STATES,
  FETCH_STATES_FAILURE,
  FETCH_STATES_SUCCESS,
  DELETE_STATE,
  DELETE_STATE_FAILURE,
  DELETE_STATE_SUCCESS,
} from '../../../constants';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_STATES:
      return { ...state, ...payload, loading: true };
    case ADD_STATES_FAILURE:
      return { ...state, ...payload, loading: false };
    case ADD_STATES_SUCCESS:
      return { ...state, ...payload, loading: false };

    case DELETE_STATE:
      return { ...state, ...payload, loading: true };
    case DELETE_STATE_FAILURE:
      return { ...state, ...payload, loading: false };
    case DELETE_STATE_SUCCESS:
      return { ...state, ...payload, loading: false };

    case FETCH_STATES:
      return { ...state, ...payload, loading: true };
    case FETCH_STATES_SUCCESS:
      return { ...state, ...payload, loading: false };
    case FETCH_STATES_FAILURE:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};
