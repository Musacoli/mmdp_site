import {
  ADD_AMOUNT,
  ADD_AMOUNT_SUCCESS,
  ADD_AMOUNT_FAILURE,
  FETCH_AMOUNT,
  FETCH_AMOUNT_SUCCESS,
  FETCH_AMOUNT_FAILURE,
  DELETE_AMOUNT,
  DELETE_AMOUNT_SUCCESS,
  DELETE_AMOUNT_FAILURE,
} from '../../../constants/dropdowns/amountInvested';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_AMOUNT:
      return { ...state, ...payload, loading: true };
    case ADD_AMOUNT_SUCCESS:
      return { ...state, ...payload, loading: false };
    case ADD_AMOUNT_FAILURE:
      return { ...state, ...payload, loading: false };

    case FETCH_AMOUNT:
      return { ...state, ...payload, loading: true };
    case FETCH_AMOUNT_SUCCESS:
      return { ...state, ...payload, loading: false };
    case FETCH_AMOUNT_FAILURE:
      return { ...state, ...payload, loading: false };

    case DELETE_AMOUNT:
      return { ...state, ...payload, loading: true };
    case DELETE_AMOUNT_SUCCESS:
      return { ...state, ...payload, loading: false };
    case DELETE_AMOUNT_FAILURE:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};
