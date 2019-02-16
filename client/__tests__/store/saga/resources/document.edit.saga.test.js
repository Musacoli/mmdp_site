import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/resources/document';
import { editDocument } from '../../../../store/sagas/resources/document';

const payload = { data: {}, id: 1 };
describe('Document Saga', () => {
  describe('editDocument', async () => {
    const it = sagaHelper(editDocument({ payload }));
    it('should have yield edit resource document', (result) => {
      expect(result).toEqual(
        call(api.resources.document.update, payload.data, payload.id),
      );
    });
    it('and then yield dispatch editDocumentSuccess', (result) => {
      expect(result).toEqual(put(actions.editDocumentSuccess(payload.data)));
      return new Error('Some error');
    });

    it('and then yield dispatch editDocumentFailure', (result) => {
      expect(result).toEqual(
        put(actions.editDocumentFailure({ error: 'Some error' })),
      );
    });
  });
});
