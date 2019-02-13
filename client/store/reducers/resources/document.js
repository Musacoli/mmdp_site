import {
  FETCH_DOCUMENTS,
  FETCH_DOCUMENT_FAILURE,
  FETCH_DOCUMENT_SUCCESS,
} from '../../../constants/resources/document';

export const initialState = {
  data: {
    results: [],
    currentPage: 1,
  },
  isFetching: false,
  success: false,
  errors: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_DOCUMENTS:
      return { ...state, ...payload, isFetching: true };
    case FETCH_DOCUMENT_SUCCESS:
      return { ...state, ...payload, isDeleting: false };
    case FETCH_DOCUMENT_FAILURE:
      return { ...state, ...payload, isDeleting: false };
    default:
      return state;
  }
};
