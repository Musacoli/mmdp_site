import {
  ADD_DOCUMENT,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
  EDIT_DOCUMENT,
  EDIT_DOCUMENT_SUCCESS,
  EDIT_DOCUMENT_FAILURE,
  FETCH_DOCUMENT,
  FETCH_DOCUMENTS,
  FETCH_DOCUMENT_FAILURE,
  FETCH_DOCUMENT_SUCCESS,
} from '../../../constants/resources/document';

const data = {
  results: [],
  pagination: {},
};

export const initialState = {
  loading: false,
  document: {},
  success: false,
  data,
  isFetching: false,
  errors: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_DOCUMENT:
      return { ...state, loading: true };
    case ADD_DOCUMENT_SUCCESS:
      return { ...state, loading: false, success: true, ...payload, data };
    case ADD_DOCUMENT_FAILURE:
      return { ...state, loading: false, success: false, ...payload };
    case FETCH_DOCUMENT:
      return { ...state, loading: true, ...payload };
    case FETCH_DOCUMENT_SUCCESS:
      return { ...state, loading: false, ...payload };
    case EDIT_DOCUMENT:
      return { ...state, loading: true };
    case EDIT_DOCUMENT_SUCCESS:
      return { ...state, loading: false, success: true, ...payload };
    case EDIT_DOCUMENT_FAILURE:
      return { ...state, loading: false, ...payload };
    case FETCH_DOCUMENTS:
      return { ...state, ...payload, isFetching: true };
    case FETCH_DOCUMENT_FAILURE:
      return { ...state, ...payload, isDeleting: false };
    default:
      return state;
  }
};
