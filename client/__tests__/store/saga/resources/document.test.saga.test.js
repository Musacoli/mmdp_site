import sagaHelper from 'redux-saga-testing';
import { put, call } from 'redux-saga/effects';
import { api } from '../../../../utils/api';
import {
  fetchDocumentFailure,
  fetchDocumentSuccess,
} from '../../../../store/actions/resources/document';
import { fetchDocumentsAsync } from '../../../../store/sagas/resources/document';

// const payload = {};
describe('Document saga', async () => {
  describe('fetchDocumentSuccess', async () => {
    const filters = { page: 1, search: '' };
    const it = sagaHelper(fetchDocumentsAsync({ payload: filters }));
    it('should have called api list documents', (result) => {
      expect(result).toEqual(call(api.resources.document.list, filters));
    });
    it('and then trigger an fetchDocument', (result) => {
      expect(result).toEqual(
        put(
          fetchDocumentSuccess({
            data: { results: {}, pagination: {} },
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
