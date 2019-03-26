import {
  ADD_FUNDING,
  ADD_FUNDING_SUCCESS,
  ADD_FUNDING_FAILURE,
  FETCH_FUNDING,
  FETCH_FUNDING_SUCCESS,
  FETCH_FUNDING_FAILURE,
  DELETE_FUNDING,
  DELETE_FUNDING_SUCCESS,
  DELETE_FUNDING_FAILURE,
} from '../../../constants/dropdowns/funding';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  // eslint-disable-next-line default-case
  switch (type) {
    case ADD_FUNDING:
      return { ...state, ...payload, loading: true };
    case ADD_FUNDING_SUCCESS:
      return { ...state, ...payload, loading: false };
    case ADD_FUNDING_FAILURE:
      return { ...state, ...payload, loading: false };

    case FETCH_FUNDING:
      return { ...state, ...payload, loading: true };
    case FETCH_FUNDING_SUCCESS:
      return { ...state, ...payload, loading: false };
    case FETCH_FUNDING_FAILURE:
      return { ...state, ...payload, loading: false };

    case DELETE_FUNDING:
      return { ...state, ...payload, loading: true };
    case DELETE_FUNDING_SUCCESS:
      return { ...state, ...payload, loading: false };
    case DELETE_FUNDING_FAILURE:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};
