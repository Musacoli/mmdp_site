import {
  ADD_STATUSES,
  ADD_STATUSES_FAILURE,
  ADD_STATUSES_SUCCESS,
  FETCH_STATUSES,
  FETCH_STATUSES_FAILURE,
  FETCH_STATUSES_SUCCESS,
  DELETE_STATUS,
  DELETE_STATUS_FAILURE,
  DELETE_STATUS_SUCCESS,
} from '../../../constants/dropdowns/statuses';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_STATUSES:
      return { ...state, ...payload, loading: true };
    case ADD_STATUSES_FAILURE:
      return { ...state, ...payload, loading: false };
    case ADD_STATUSES_SUCCESS:
      return { ...state, ...payload, loading: false };

    case DELETE_STATUS:
      return { ...state, ...payload, loading: true };
    case DELETE_STATUS_FAILURE:
      return { ...state, ...payload, loading: false };
    case DELETE_STATUS_SUCCESS:
      return { ...state, ...payload, loading: false };

    case FETCH_STATUSES:
      return { ...state, ...payload, loading: true };
    case FETCH_STATUSES_SUCCESS:
      return { ...state, ...payload, loading: false };
    case FETCH_STATUSES_FAILURE:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};
