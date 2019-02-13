import {
<<<<<<< HEAD
  FETCH_DOCUMENTS,
=======
  FETCH_DOCUMENT,
>>>>>>> feat(repository-documents): Implement a grid list of documents
  FETCH_DOCUMENT_FAILURE,
  FETCH_DOCUMENT_SUCCESS,
} from '../../../../constants/resources/document';

import {
  fetchDocument,
  fetchDocumentFailure,
  fetchDocumentSuccess,
} from '../../../../store/actions/resources/document';

describe('Documents Actions Creators', () => {
<<<<<<< HEAD
  it('should dispatch FETCH_DOCUMENTS', () => {
    expect(fetchDocument({}).type).toEqual(FETCH_DOCUMENTS);
=======
  it('should dispatch FETCH_DOCUMENT', () => {
    expect(fetchDocument({}).type).toEqual(FETCH_DOCUMENT);
>>>>>>> feat(repository-documents): Implement a grid list of documents
  });
  it('should dispatch FETCH_DOCUMENT_FAILURE', () => {
    expect(fetchDocumentFailure({}).type).toEqual(FETCH_DOCUMENT_FAILURE);
  });
  it('should dispatch ADD_ALL_GROUP_ITEM', () => {
    expect(fetchDocumentSuccess({}).type).toEqual(FETCH_DOCUMENT_SUCCESS);
  });
});
