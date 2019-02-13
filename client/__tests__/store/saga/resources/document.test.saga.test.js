import sagaHelper from 'redux-saga-testing';
import { put, call } from 'redux-saga/effects';
import { api } from '../../../../utils/api';
<<<<<<< HEAD
import { fetchDocumentFailure } from '../../../../store/actions/resources/document';
=======
import {
  fetchDocumentFailure,
  fetchDocumentSuccess,
} from '../../../../store/actions/resources/document';
>>>>>>> feat(repository-documents): Implement a grid list of documents
import { fetchDocumentsAsync } from '../../../../store/sagas/resources/document';

describe('Document saga', async () => {
  describe('fetchDocumentSuccess', async () => {
    const it = sagaHelper(fetchDocumentsAsync());
    it('should have called api list documents', (result) => {
<<<<<<< HEAD
      expect(result).toEqual(call(api.resources.documents.list));
    });
    it('and then trigger an fetchGroups', (result) => {
=======
      expect(result).toEqual(call(api.resources.document.list));
    });
    it('and then trigger an fetchGroups', (result) => {
      expect(result).toEqual(
        put(
          fetchDocumentSuccess({
            data: { results: {} },
            isFetching: false,
          }),
        ),
      );
      return new Error('Some error');
    });
    it('and then yield dispatch fetchDocumentFailure', (result) => {
>>>>>>> feat(repository-documents): Implement a grid list of documents
      expect(result).toEqual(put(fetchDocumentFailure({})));
    });
  });
});
