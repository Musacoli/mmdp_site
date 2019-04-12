import {
  FETCH_STATE_MAP,
  FETCH_STATE_MAP_SUCCESS,
  FETCH_STATE_MAP_FAILURE,
  ADD_STATE_MAP,
  ADD_STATE_MAP_SUCCESS,
  ADD_STATE_MAP_FAILURE,
  UPDATE_STATE_MAP,
  UPDATE_STATE_MAP_SUCCESS,
  UPDATE_STATE_MAP_FAILURE,
} from '../../../constants';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_STATE_MAP:
      return { ...state, ...payload, loading: true };
    case FETCH_STATE_MAP_SUCCESS:
      return { ...state, ...payload, loading: false };
    case FETCH_STATE_MAP_FAILURE:
      return { ...state, ...payload, loading: false };
    case ADD_STATE_MAP:
      return { ...state, ...payload, loading: true };
    case ADD_STATE_MAP_SUCCESS:
      return { ...state, ...payload, loading: false };
    case ADD_STATE_MAP_FAILURE:
      return { ...state, ...payload, loading: false };
    case UPDATE_STATE_MAP:
      return { ...state, ...payload, loading: true };
    case UPDATE_STATE_MAP_SUCCESS:
      return { ...state, ...payload, loading: false };
    case UPDATE_STATE_MAP_FAILURE:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};
