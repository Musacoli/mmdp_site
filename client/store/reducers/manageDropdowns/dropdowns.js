import {
  FETCH_DROPDOWNS,
  FETCH_DROPDOWNS_SUCCESS,
  FETCH_DROPDOWNS_FAILURE,
} from '../../../constants/manageDropdowns/dropdowns';

export const initialState = {
  loading: false,
  dropdowns: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_DROPDOWNS:
      return { ...state, ...payload, loading: true };
    case FETCH_DROPDOWNS_SUCCESS:
      return { ...state, ...payload, loading: false };
    case FETCH_DROPDOWNS_FAILURE:
      return { ...state, ...payload, loading: false };

    default:
      return state;
  }
};
