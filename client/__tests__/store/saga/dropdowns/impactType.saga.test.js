import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/impactTypes';
import {
  fetchImpactTypesAsync,
  addImpactTypeAsync,
  deleteImpactTypeAsync,
} from '../../../../store/sagas/dropdowns/impactTypes';

const payload = { data: {}, new: true, id: 'someid' };
describe('Impact Type Saga', () => {
  describe('fetchImpactType', async () => {
    const it = sagaHelper(fetchImpactTypesAsync({ payload }));
    it('should have yield fetch impact types', (result) => {
      expect(result).toEqual(call(api.dropdowns.impactType.list));
    });
    it('and then yield dispatch fetchImpactTypeSuccess', (result) => {
      expect(result).toEqual(
        put(actions.fetchImpactTypesSuccess(payload.data)),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch fetchImpactTypeFailure', (result) => {
      expect(result).toEqual(put(actions.fetchImpactTypesFailure({})));
    });
  });

  describe('addImpactTypesAsync', async () => {
    const it = sagaHelper(addImpactTypeAsync({ payload }));
    it('should have yield fetch impact types', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.impactType.create, payload.data),
      );
    });
    it('and then yield dispatch addImpactTypeSuccess', (result) => {
      expect(result).toEqual(put(actions.addImpactTypesSuccess(undefined)));
    });
    it('and then yield dispatch fetchImpactTypes', (result) => {
      expect(result).toEqual(put(actions.fetchImpactTypes(undefined)));
      return new Error('Some error');
    });

    it('and then yield dispatch addImpactTypesFailure', (result) => {
      expect(result).toEqual(put(actions.addImpactTypesFailure({})));
    });
  });

  describe('deleteImpactTypeAsync', async () => {
    const it = sagaHelper(deleteImpactTypeAsync({ payload }));
    it('should have yield delete impact type', (result) => {
      expect(result).toEqual(call(api.dropdowns.impactType.delete, payload.id));
    });
    it('and then yield dispatch deleteImpactTypeSuccess', (result) => {
      expect(result).toEqual(put(actions.deleteImpactTypeSuccess({})));
    });
    it('and then yield dispatch fetchImpactTypes', (result) => {
      expect(result).toEqual(put(actions.fetchImpactTypes({})));
      return new Error('Some error');
    });
  });
});
