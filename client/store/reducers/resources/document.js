import {
  ADD_DOCUMENT,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
  EDIT_DOCUMENT,
  EDIT_DOCUMENT_SUCCESS,
  EDIT_DOCUMENT_FAILURE,
  FETCH_DOCUMENT,
  FETCH_DOCUMENT_SUCCESS,
} from '../../../constants/resources/document';

export const initialState = {
  loading: false,
  document: {},
  success: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_DOCUMENT:
      return { ...state, loading: true, ...payload };
    case ADD_DOCUMENT_SUCCESS:
      return { ...state, loading: false, success: true, ...payload };
    case ADD_DOCUMENT_FAILURE:
      return { ...state, loading: false, success: false, ...payload };
    case FETCH_DOCUMENT:
      return { ...state, loading: true, ...payload };
    case FETCH_DOCUMENT_SUCCESS:
      return { ...state, loading: false, ...payload };
    case EDIT_DOCUMENT:
      return { ...state, loading: true, ...payload };
    case EDIT_DOCUMENT_SUCCESS:
      return { ...state, loading: false, success: true, ...payload };
    case EDIT_DOCUMENT_FAILURE:
      return { ...state, loading: false, ...payload };
    default:
      return state;
  }
};
