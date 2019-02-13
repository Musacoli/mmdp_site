import sagaHelper from 'redux-saga-testing';
import { put, call } from 'redux-saga/effects';
import { api } from '../../../../utils/api';
import { fetchDocumentFailure } from '../../../../store/actions/resources/document';
import { fetchDocumentsAsync } from '../../../../store/sagas/resources/document';

describe('Document saga', async () => {
  describe('fetchDocumentSuccess', async () => {
    const it = sagaHelper(fetchDocumentsAsync());
    it('should have called api list documents', (result) => {
      expect(result).toEqual(call(api.resources.documents.list));
    });
    it('and then trigger an fetchGroups', (result) => {
      expect(result).toEqual(put(fetchDocumentFailure({})));
    });
  });
});
