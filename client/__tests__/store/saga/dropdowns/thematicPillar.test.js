import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/thematicPillars';
import {
  fetchThematicPillarsAsync,
  addThematicPillarsAsync,
  deleteThematicPillarsAsync,
} from '../../../../store/sagas/dropdowns/thematicPillars';

const payload = { data: {}, create: true, id: 'someid' };
describe('ThematicPillar Saga', () => {
  describe('fetchStatus', async () => {
    const it = sagaHelper(fetchThematicPillarsAsync(null));
    it('should have yield fetch statuses', (result) => {
      expect(result).toEqual(call(api.dropdowns.thematicPillars.list));
    });
    it('and then yield dispatch fetchStatusesSuccess', (result) => {
      expect(result).toEqual(
        put(actions.fetchThematicPillarsSuccess(payload.data)),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch fetchStatusesFailure', (result) => {
      expect(result).toEqual(put(actions.fetchThematicPillarsFailure({})));
    });
  });

  describe('addStatusesAsync', async () => {
    const it = sagaHelper(addThematicPillarsAsync({ payload }));
    it('should have yield fetch statuses', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.thematicPillars.create, payload.data),
      );
    });
    it('and then yield dispatch addStatusesSuccess', (result) => {
      expect(result).toEqual(put(actions.addThematicPillarSuccess(undefined)));
    });
    it('and then yield dispatch fetchStatuses', (result) => {
      expect(result).toEqual(put(actions.fetchThematicPillars(undefined)));
      return new Error('Some error');
    });

    it('and then yield dispatch addStatusesFailure', (result) => {
      expect(result).toEqual(put(actions.addThematicPillarFailure({})));
    });
  });

  describe('deleteStatusesAsync', async () => {
    const it = sagaHelper(deleteThematicPillarsAsync({ payload }));
    it('should have yield delete status', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.thematicPillars.delete, payload.id),
      );
    });
    it('and then yield dispatch deleteStatusSuccess', (result) => {
      expect(result).toEqual(put(actions.deleteThematicPillarSuccess({})));
    });
    it('and then yield dispatch fetchStatuses', (result) => {
      expect(result).toEqual(put(actions.fetchThematicPillars({})));
      return new Error('Some error');
    });

    it('and then yield dispatch deleteStatusFailure', (result) => {
      expect(result).toEqual(put(actions.deleteThematicPillarFailure({})));
    });
  });
});
