import { call, put, takeEvery } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import toastr from 'toastr';
import * as types from '../../../../constants';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/matrix/state';
import {
  addStateMapAsync,
  fetchStateMapAsync,
  updateStateMapAsync,
  watchAddStateMap,
  watchFetchStateMap,
  watchUpdateStateMap,
} from '../../../../store/sagas/matrix/state';
import { getStates } from '../../../../utils/matrix/state';

const payload = { data: [] };

describe('StateMap saga tests', () => {
  describe('fetchStateMap', async () => {
    const it = sagaHelper(fetchStateMapAsync({ payload: { page: 1 } }));
    it('should have yield fetch state maps', (result) => {
      expect(result).toEqual(call(getStates, { page: 1 }));
    });
    it('and then yield dispatch fetchStateMapSuccess', (result) => {
      expect(result).toEqual(
        put(actions.fetchStateMapSuccess({ data: undefined })),
      );
      return new Error('Some error');
    });
    it('and then yield dispatch fetchStateMapFailure', (result) => {
      expect(result).toEqual(put(actions.fetchStateMapFailure({})));
    });
    it('and then toast a message', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error listing maps'));
    });
  });
  describe('addStateMapAsync', async () => {
    const it = sagaHelper(addStateMapAsync({ payload }));
    it('should have yield fetch state maps', (result) => {
      expect(result).toEqual(call(api.matrix.state.create, payload));
    });
    it('and then yield dispatch addStateMapSuccess', (result) => {
      expect(result).toEqual(put(actions.addStateMapSuccess([])));
    });
    it('and then yield dispatch addStateMapFailure', (result) => {
      expect(result).toEqual(put(actions.addStateMapFailure({})));
    });
    it('and then toast a message', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error adding state map'));
    });
  });
  describe('updateStateMapAsync', async () => {
    const it = sagaHelper(
      updateStateMapAsync({ payload: { id: 1, data: { page: 1 } } }),
    );
    it('should have yield fetch state maps', (result) => {
      expect(result).toEqual(call(api.matrix.state.update, 1, { page: 1 }));
    });
    it('and then yield dispatch updateStateMapSuccess', (result) => {
      expect(result).toEqual(put(actions.updateStateMapSuccess({})));
    });
    it('and then yield dispatch fetchStateMap', (result) => {
      expect(result).toEqual(put(actions.fetchStateMap({ page: 1 })));
      return new Error('an error occurred');
    });
    it('and then yield dispatch updateStateMapFailure', (result) => {
      expect(result).toEqual(put(actions.updateStateMapFailure({})));
    });
    it('and then toast a message', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error updating state map'));
    });
  });
  // watchers
  describe('State map saga watcher tests', async () => {
    let it = sagaHelper(watchAddStateMap({ payload }));
    it('should watch for ADD_STATE_MAP actions ', (result) => {
      expect(result).toEqual(takeEvery(types.ADD_STATE_MAP, addStateMapAsync));
    });
    it = sagaHelper(watchFetchStateMap({ payload }));
    it('should watch for FETCH_STATE_MAP actions ', (result) => {
      expect(result).toEqual(
        takeEvery(types.FETCH_STATE_MAP, fetchStateMapAsync),
      );
    });
    it = sagaHelper(watchUpdateStateMap({ payload }));
    it('should watch for UPDATE_STATE_MAP actions ', (result) => {
      expect(result).toEqual(
        takeEvery(types.UPDATE_STATE_MAP, updateStateMapAsync),
      );
    });
  });
});
