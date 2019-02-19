import sagaHelper from 'redux-saga-testing';
import { put, call } from 'redux-saga/effects';
import { api } from '../../../../utils/api';
import {
  fetchDocumentFailure,
  fetchDocumentSuccess,
} from '../../../../store/actions/resources/document';
import { fetchDocumentsAsync } from '../../../../store/sagas/resources/document';

const payload = {};
describe('Document saga', async () => {
  describe('fetchDocumentSuccess', async () => {
    const it = sagaHelper(fetchDocumentsAsync({ payload }));
    it('should have called api list documents', (result) => {
      expect(result).toEqual(call(api.resources.document.list));
    });
    it('and then trigger a media fetchDocumentSuccess', (result) => {
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
      expect(result).toEqual(put(fetchDocumentFailure({})));
    });
  });

  describe('fetchMediaSuccess', async () => {
    const it = sagaHelper(
      fetchDocumentsAsync({ payload: { mediaType: true } }),
    );
    it('should have called api list media', (result) => {
      expect(result).toEqual(call(api.resources.media.list));
    });
  });
});
