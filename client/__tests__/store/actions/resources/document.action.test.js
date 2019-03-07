import {
  ADD_DOCUMENT,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
  FETCH_DOCUMENT,
  FETCH_DOCUMENT_SUCCESS,
  EDIT_DOCUMENT,
  EDIT_DOCUMENT_FAILURE,
  EDIT_DOCUMENT_SUCCESS,
} from '../../../../constants/resources/document';
import {
  DELETE_MEDIA,
  DELETE_MEDIA_FAILURE,
  DELETE_MEDIA_SUCCESS,
} from '../../../../constants/resources/media';

import {
  addDocument,
  addDocumentFailure,
  addDocumentSuccessful,
  fetchDocument,
  fetchDocumentSuccess,
  editDocument,
  editDocumentFailure,
  editDocumentSuccess,
} from '../../../../store/actions/resources/document';
import {
  deleteMedia,
  deleteMediaFailure,
  deleteMediaSuccess,
} from '../../../../store/actions/resources/media';

const documentActions = [
  { type: DELETE_MEDIA, action: deleteMedia },
  { type: DELETE_MEDIA_SUCCESS, action: deleteMediaSuccess },
  { type: DELETE_MEDIA_FAILURE, action: deleteMediaFailure },
  { type: ADD_DOCUMENT, action: addDocument },
  { type: ADD_DOCUMENT_SUCCESS, action: addDocumentSuccessful },
  { type: ADD_DOCUMENT_FAILURE, action: addDocumentFailure },
  { type: FETCH_DOCUMENT, action: fetchDocument },
  { type: FETCH_DOCUMENT_SUCCESS, action: fetchDocumentSuccess },
  { type: EDIT_DOCUMENT, action: editDocument },
  { type: EDIT_DOCUMENT_SUCCESS, action: editDocumentSuccess },
  { type: EDIT_DOCUMENT_FAILURE, action: editDocumentFailure },
];

describe('Resource document actions', () => {
  documentActions.map((action) => {
    return it(`should dispatch ${action.type}`, () => {
      expect(action.action({}).type).toEqual(action.type);
    });
  });
});
