import {
  FETCH_DOCUMENTS,
  FETCH_DOCUMENT_FAILURE,
  FETCH_DOCUMENT_SUCCESS,
} from '../../../constants/resources/document';

export const fetchDocument = (payload) => ({
  type: FETCH_DOCUMENTS,
  payload,
});

export const fetchDocumentFailure = (payload) => ({
  type: FETCH_DOCUMENT_FAILURE,
  payload,
});

export const fetchDocumentSuccess = (payload) => ({
  type: FETCH_DOCUMENT_SUCCESS,
  payload,
});
