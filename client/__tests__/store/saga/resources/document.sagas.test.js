import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/resources/document';
import { addDocument } from '../../../../store/sagas/resources/document';

const payload = { status: {} };
api.resources.document.create = jest.fn(() => Promise.resolve(payload));
describe('Document Saga', () => {
  describe('addDocuemnt', async () => {
    const it = sagaHelper(addDocument({ payload }));
    it('should have yield list resources', (result) => {
      expect(result).toEqual(call(api.resources.document.create, payload));
    });

    it('and then yield dispatch addDocumentSuccessful', (result) => {
      expect(result).toEqual(put(actions.addDocumentSuccessful({ payload })));
    });
  });
  describe('addDocuemnt unresolved', async () => {
    api.resources.document.create = jest.fn(() => Promise.reject());
    const it = sagaHelper(addDocument());

    it('and then yield dispatch addDocumentFailure', (result) => {
      expect(result).toEqual(
        put(
          actions.addDocumentFailure({
            error: "Cannot read property 'payload' of undefined",
          }),
        ),
      );
    });
  });
});
