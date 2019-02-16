import {
  ADD_DOCUMENT,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
} from '../../../constants';

export const addDocument = (payload) => ({
  type: ADD_DOCUMENT,
  payload,
});

export const addDocumentSuccessful = (payload) => ({
  type: ADD_DOCUMENT_SUCCESS,
  payload,
});

export const addDocumentFailure = (payload) => ({
  type: ADD_DOCUMENT_FAILURE,
  payload,
});
