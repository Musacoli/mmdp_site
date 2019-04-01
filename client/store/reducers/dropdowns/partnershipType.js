import {
  ADD_PARTNERSHIP_TYPES,
  ADD_PARTNERSHIP_TYPES_FAILURE,
  ADD_PARTNERSHIP_TYPES_SUCCESS,
  FETCH_PARTNERSHIP_TYPES,
  FETCH_PARTNERSHIP_TYPES_FAILURE,
  FETCH_PARTNERSHIP_TYPES_SUCCESS,
  DELETE_PARTNERSHIP_TYPE,
  DELETE_PARTNERSHIP_TYPE_FAILURE,
  DELETE_PARTNERSHIP_TYPE_SUCCESS,
} from '../../../constants';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PARTNERSHIP_TYPES:
      return { ...state, loading: true };
    case ADD_PARTNERSHIP_TYPES_FAILURE:
      return { ...state, ...payload, loading: false };
    case ADD_PARTNERSHIP_TYPES_SUCCESS:
      return { ...state, ...payload, loading: false };

    case DELETE_PARTNERSHIP_TYPE:
      return { ...state, ...payload, loading: true };
    case DELETE_PARTNERSHIP_TYPE_FAILURE:
      return { ...state, ...payload, loading: false };
    case DELETE_PARTNERSHIP_TYPE_SUCCESS:
      return { ...state, ...payload, loading: false };

    case FETCH_PARTNERSHIP_TYPES:
      return { ...state, ...payload, loading: true };
    case FETCH_PARTNERSHIP_TYPES_FAILURE:
      return { ...state, ...payload, loading: false };
    case FETCH_PARTNERSHIP_TYPES_SUCCESS:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};
