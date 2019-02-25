import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/resources/media';
import * as actionsTypes from '../../../../store/actions/resources/document';

import { deleteMediaAsync } from '../../../../store/sagas/resources/media';

const payload = {};
describe('Delete media', () => {
  const it = sagaHelper(deleteMediaAsync({ payload }));
  it('should have yield delete media', (result) => {
    expect(result).toEqual(call(api.resources.media.delete, undefined));
  });
  it('should yield dispatch deleteSuccess', (result) => {
    expect(result).toEqual(put(actions.deleteMediaSuccess(payload)));
  });
  it('should yield dispatch fetch document', (result) => {
    expect(result).toEqual(
      put(actionsTypes.fetchDocuments({ mediaType: 'media' })),
    );
    return new Error('Some error');
  });
  it('should yield dispatch deleteMediaFailure', (result) => {
    expect(result).toEqual(
      put(actions.deleteMediaFailure({ payload: undefined })),
    );
  });
});
