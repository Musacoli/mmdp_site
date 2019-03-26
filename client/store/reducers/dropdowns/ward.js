import {
  ADD_WARDS,
  ADD_WARDS_FAILURE,
  ADD_WARDS_SUCCESS,
  FETCH_WARDS,
  FETCH_WARDS_FAILURE,
  FETCH_WARDS_SUCCESS,
  DELETE_WARD,
  DELETE_WARD_FAILURE,
  DELETE_WARD_SUCCESS,
} from '../../../constants/dropdowns/ward';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_WARDS:
      return { ...state, ...payload, loading: true };
    case ADD_WARDS_FAILURE:
      return { ...state, ...payload, loading: false };
    case ADD_WARDS_SUCCESS:
      return { ...state, ...payload, loading: false };

    case DELETE_WARD:
      return { ...state, ...payload, loading: true };
    case DELETE_WARD_FAILURE:
      return { ...state, ...payload, loading: false };
    case DELETE_WARD_SUCCESS:
      return { ...state, ...payload, loading: false };

    case FETCH_WARDS:
      return { ...state, ...payload, loading: true };
    case FETCH_WARDS_SUCCESS:
      return { ...state, ...payload, loading: false };
    case FETCH_WARDS_FAILURE:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};
