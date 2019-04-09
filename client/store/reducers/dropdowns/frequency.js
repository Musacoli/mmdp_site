import {
  ADD_FREQUENCY,
  ADD_FREQUENCY_SUCCESS,
  ADD_FREQUENCY_FAILURE,
  FETCH_FREQUENCY,
  FETCH_FREQUENCY_SUCCESS,
  FETCH_FREQUENCY_FAILURE,
  DELETE_FREQUENCY,
  DELETE_FREQUENCY_SUCCESS,
  DELETE_FREQUENCY_FAILURE,
} from '../../../constants/dropdowns/frequency';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FREQUENCY:
      return { ...state, ...payload, loading: true };
    case ADD_FREQUENCY_SUCCESS:
      return { ...state, ...payload, loading: false };
    case ADD_FREQUENCY_FAILURE:
      return { ...state, ...payload, loading: false };

    case FETCH_FREQUENCY:
      return { ...state, ...payload, loading: true };
    case FETCH_FREQUENCY_SUCCESS:
      return { ...state, ...payload, loading: false };
    case FETCH_FREQUENCY_FAILURE:
      return { ...state, ...payload, loading: false };

    case DELETE_FREQUENCY:
      return { ...state, ...payload, loading: true };
    case DELETE_FREQUENCY_SUCCESS:
      return { ...state, ...payload, loading: false };
    case DELETE_FREQUENCY_FAILURE:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};
