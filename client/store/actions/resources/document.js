import {
  ADD_DOCUMENT,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
  EDIT_DOCUMENT,
  EDIT_DOCUMENT_SUCCESS,
  EDIT_DOCUMENT_FAILURE,
  FETCH_DOCUMENT,
  FETCH_DOCUMENT_SUCCESS,
  FETCH_DOCUMENTS,
  FETCH_DOCUMENT_FAILURE,
  ARCHIVE,
  ARCHIVE_SUCCESS,
  ARCHIVE_FAILURE,
  DELETE,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} from '../../../constants/resources/document';

/** FETCH DOCUMENTS */
export const fetchDocuments = (
  payload = { mediaType: false, page: 1, search: '' },
) => ({
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
export const archiveDoc = (payload) => ({
  type: ARCHIVE,
  payload,
});

export const archiveSuccess = (payload) => ({
  type: ARCHIVE_SUCCESS,
  payload,
});

export const archiveFailed = (payload) => ({
  type: ARCHIVE_FAILURE,
  payload,
});

export const startDelete = (payload) => ({
  type: DELETE,
  payload,
});

export const deleteSuccess = (payload) => ({
  type: DELETE_SUCCESS,
  payload,
});

export const deleteFailed = (payload) => ({
  type: DELETE_FAILURE,
  payload,
});
