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

/** EDIT A DOCUMENT */
export const editDocument = (payload) => ({
  type: EDIT_DOCUMENT,
  payload,
});

export const editDocumentSuccess = (payload) => ({
  type: EDIT_DOCUMENT_SUCCESS,
  payload,
});

export const editDocumentFailure = (payload) => ({
  type: EDIT_DOCUMENT_FAILURE,
  payload,
});

/** FETCH A DOCUEMNT  */
export const fetchDocument = (payload) => ({
  type: FETCH_DOCUMENT,
  payload,
});

export const fetchDocumentSuccess = (payload) => ({
  type: FETCH_DOCUMENT_SUCCESS,
  payload,
});

/** CREATE DOCUMENT */
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
