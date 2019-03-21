import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/state';
import {
  fetchStatesAsync,
  addStatesAsync,
  deleteStatesAsync,
} from '../../../../store/sagas/dropdowns/state';

const payload = { data: {}, new: true, id: 'someid' };
describe('State Saga', () => {
  describe('fetchState', async () => {
    const it = sagaHelper(fetchStatesAsync({ payload }));
    it('should have yield fetch states', (result) => {
      expect(result).toEqual(call(api.dropdowns.state.list));
    });
    it('and then yield dispatch fetchStatesSuccess', (result) => {
      expect(result).toEqual(put(actions.fetchStatesSuccess(payload.data)));
      return new Error('Some error');
    });

    it('and then yield dispatch fetchStatesFailure', (result) => {
      expect(result).toEqual(put(actions.fetchStatesFailure({})));
    });
  });

  describe('addStatesAsync', async () => {
    const it = sagaHelper(addStatesAsync({ payload }));
    it('should have yield fetch states', (result) => {
      expect(result).toEqual(call(api.dropdowns.state.create, payload.data));
    });
    it('and then yield dispatch addStatesSuccess', (result) => {
      expect(result).toEqual(put(actions.addStatesSuccess(undefined)));
    });
    it('and then yield dispatch fetchStates', (result) => {
      expect(result).toEqual(put(actions.fetchStates(undefined)));
      return new Error('Some error');
    });

    it('and then yield dispatch addStatesFailure', (result) => {
      expect(result).toEqual(put(actions.addStatesFailure({})));
    });
  });

  describe('deleteStatesAsync', async () => {
    const it = sagaHelper(deleteStatesAsync({ payload }));
    it('should have yield delete state', (result) => {
      expect(result).toEqual(call(api.dropdowns.state.delete, payload.id));
    });
    it('and then yield dispatch deleteStateSuccess', (result) => {
      expect(result).toEqual(put(actions.deleteStateSuccess({})));
    });
    it('and then yield dispatch fetchStates', (result) => {
      expect(result).toEqual(put(actions.fetchStates({})));
      return new Error('Some error');
    });

    it('and then yield dispatch deleteStateFailure', (result) => {
      expect(result).toEqual(put(actions.deleteStateFailure({})));
    });
  });
});
