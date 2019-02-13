import {
  ADD_DOCUMENT,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
} from '../../../constants/resources/document';

export const initialState = {
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_DOCUMENT:
      return { ...state, loading: true, ...payload };
    case ADD_DOCUMENT_SUCCESS:
      return { ...state, loading: false, ...payload };
    case ADD_DOCUMENT_FAILURE:
      return { ...state, loading: false, ...payload };
    default:
      return state;
  }
};
