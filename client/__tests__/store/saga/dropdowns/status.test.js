import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/statuses';
import {
  fetchStatusesAsync,
  addStatusesAsync,
  deleteStatusesAsync,
} from '../../../../store/sagas/dropdowns/status';

const payload = { data: {}, new: true, id: 'someid' };
describe('Status Saga', () => {
  describe('fetchStatus', async () => {
    const it = sagaHelper(fetchStatusesAsync({ payload }));
    it('should have yield fetch statuses', (result) => {
      expect(result).toEqual(call(api.dropdowns.regStatus.list));
    });
    it('and then yield dispatch fetchStatusesSuccess', (result) => {
      expect(result).toEqual(put(actions.fetchStatusesSuccess(payload.data)));
      return new Error('Some error');
    });

    it('and then yield dispatch fetchStatusesFailure', (result) => {
      expect(result).toEqual(put(actions.fetchStatusesFailure({})));
    });
  });

  describe('addStatusesAsync', async () => {
    const it = sagaHelper(addStatusesAsync({ payload }));
    it('should have yield fetch statuses', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.regStatus.create, payload.data),
      );
    });
    it('and then yield dispatch addStatusesSuccess', (result) => {
      expect(result).toEqual(put(actions.addStatusesSuccess(undefined)));
    });
    it('and then yield dispatch fetchStatuses', (result) => {
      expect(result).toEqual(put(actions.fetchStatuses(undefined)));
      return new Error('Some error');
    });

    it('and then yield dispatch addStatusesFailure', (result) => {
      expect(result).toEqual(put(actions.addStatusesFailure({})));
    });
  });

  describe('deleteStatusesAsync', async () => {
    const it = sagaHelper(deleteStatusesAsync({ payload }));
    it('should have yield delete status', (result) => {
      expect(result).toEqual(call(api.dropdowns.regStatus.delete, payload.id));
    });
    it('and then yield dispatch deleteStatusSuccess', (result) => {
      expect(result).toEqual(put(actions.deleteStatusSuccess({})));
    });
    it('and then yield dispatch fetchStatuses', (result) => {
      expect(result).toEqual(put(actions.fetchStatuses({})));
      return new Error('Some error');
    });

    it('and then yield dispatch deleteStatusFailure', (result) => {
      expect(result).toEqual(put(actions.deleteStatusFailure({})));
    });
  });
});
