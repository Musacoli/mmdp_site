import {
  ADD_IMPACT_TYPES,
  ADD_IMPACT_TYPES_FAILURE,
  ADD_IMPACT_TYPES_SUCCESS,
  FETCH_IMPACT_TYPES,
  FETCH_IMPACT_TYPES_FAILURE,
  FETCH_IMPACT_TYPES_SUCCESS,
  DELETE_IMPACT_TYPE,
  DELETE_IMPACT_TYPE_FAILURE,
  DELETE_IMPACT_TYPE_SUCCESS,
} from '../../../constants';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_IMPACT_TYPES:
      return { ...state, ...payload, loading: true };
    case ADD_IMPACT_TYPES_FAILURE:
      return { ...state, ...payload, loading: false };
    case ADD_IMPACT_TYPES_SUCCESS:
      return { ...state, ...payload, loading: false };

    case DELETE_IMPACT_TYPE:
      return { ...state, ...payload, loading: true };
    case DELETE_IMPACT_TYPE_FAILURE:
      return { ...state, ...payload, loading: false };
    case DELETE_IMPACT_TYPE_SUCCESS:
      return { ...state, ...payload, loading: false };

    case FETCH_IMPACT_TYPES:
      return { ...state, ...payload, loading: true };
    case FETCH_IMPACT_TYPES_SUCCESS:
      return { ...state, ...payload, loading: false };
    case FETCH_IMPACT_TYPES_FAILURE:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};
