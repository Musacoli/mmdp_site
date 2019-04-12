import {
  FETCH_COUNTRY_MAP,
  FETCH_COUNTRY_MAP_SUCCESS,
  FETCH_COUNTRY_MAP_FAILURE,
  ADD_COUNTRY_MAP,
  ADD_COUNTRY_MAP_SUCCESS,
  ADD_COUNTRY_MAP_FAILURE,
  UPDATE_COUNTRY_MAP,
  UPDATE_COUNTRY_MAP_SUCCESS,
  UPDATE_COUNTRY_MAP_FAILURE,
} from '../../../constants';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_COUNTRY_MAP:
      return { ...state, ...payload, loading: true };
    case FETCH_COUNTRY_MAP_SUCCESS:
      return { ...state, ...payload, loading: false };
    case FETCH_COUNTRY_MAP_FAILURE:
      return { ...state, ...payload, loading: false };
    case ADD_COUNTRY_MAP:
      return { ...state, ...payload, loading: true };
    case ADD_COUNTRY_MAP_SUCCESS:
      return { ...state, ...payload, loading: false };
    case ADD_COUNTRY_MAP_FAILURE:
      return { ...state, ...payload, loading: false };
    case UPDATE_COUNTRY_MAP:
      return { ...state, ...payload, loading: true };
    case UPDATE_COUNTRY_MAP_SUCCESS:
      return { ...state, ...payload, loading: false };
    case UPDATE_COUNTRY_MAP_FAILURE:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};
