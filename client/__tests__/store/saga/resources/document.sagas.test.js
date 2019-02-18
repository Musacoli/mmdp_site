import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/resources/document';
import { addDocument } from '../../../../store/sagas/resources/document';

const payload = { payload: {}, data: {}, mediaType: 'file' };
describe('Document Saga', () => {
  describe('addDocument', async () => {
    const it = sagaHelper(addDocument({ payload }));
    it('should have yield list resources', (result) => {
      expect(result).toEqual(call(api.resources.media.create, {}));
    });
    it('and then yield dispatch addDocumentSuccessful', (result) => {
      expect(result).toEqual(
        put(actions.addDocumentSuccessful({ payload: { status: {} } })),
      );
      return new Error('Some error');
    });
    it('should raise an exception', (result) => {
      expect(result).toEqual(
        put(actions.addDocumentFailure({ error: 'Some error' })),
      );
    });
  });
});
