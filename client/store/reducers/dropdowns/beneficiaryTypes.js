import {
  ADD_TYPES,
  ADD_TYPES_FAILURE,
  ADD_TYPES_SUCCESS,
  FETCH_TYPES,
  FETCH_TYPES_FAILURE,
  FETCH_TYPES_SUCCESS,
  DELETE_TYPE,
  DELETE_TYPE_FAILURE,
  DELETE_TYPE_SUCCESS,
} from '../../../constants/dropdowns/beneficiaryType';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TYPES:
      return { ...state, ...payload, loading: true };
    case ADD_TYPES_FAILURE:
      return { ...state, ...payload, loading: false };
    case ADD_TYPES_SUCCESS:
      return { ...state, ...payload, loading: false };

    case DELETE_TYPE:
      return { ...state, ...payload, loading: true };
    case DELETE_TYPE_FAILURE:
      return { ...state, ...payload, loading: false };
    case DELETE_TYPE_SUCCESS:
      return { ...state, ...payload, loading: false };

    case FETCH_TYPES:
      return { ...state, ...payload, loading: true };
    case FETCH_TYPES_SUCCESS:
      return { ...state, ...payload, loading: false };
    case FETCH_TYPES_FAILURE:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};
