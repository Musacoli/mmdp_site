import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/beneficiaryType';
import {
  fetchTypesAsync,
  addTypesAsync,
  deleteTypesAsync,
} from '../../../../store/sagas/dropdowns/beneficiaryTypes';

const payload = { data: {} };

describe('Beneficiary type Saga', () => {
  describe('fetchType', async () => {
    const it = sagaHelper(fetchTypesAsync({ payload }));
    it('should have yield fetch types', (result) => {
      expect(result).toEqual(call(api.dropdowns.beneficiaryType.list));
    });
    it('and then yield dispatch fetchTypesSuccess', (result) => {
      expect(result).toEqual(put(actions.fetchTypesSuccess(payload.data)));
      return new Error('Some error');
    });

    it('and then yield dispatch fetchTypesFailure', (result) => {
      expect(result).toEqual(put(actions.fetchTypesFailure({})));
    });
  });

  describe('addTypesAsync', async () => {
    const it = sagaHelper(addTypesAsync({ payload }));
    it('should have yield fetch types', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.beneficiaryType.create, payload),
      );
    });
    it('and then yield dispatch addTypesSuccess', (result) => {
      expect(result).toEqual(put(actions.addTypesSuccess(undefined)));
    });
    it('and then yield dispatch fetchTypes', (result) => {
      expect(result).toEqual(put(actions.fetchTypes(undefined)));
      return new Error('Some error');
    });

    it('and then yield dispatch addStatusesFailure', (result) => {
      expect(result).toEqual(put(actions.addTypesFailure({})));
    });
  });

  describe('deleteTypesAsync', async () => {
    const it = sagaHelper(deleteTypesAsync({ payload }));
    it('should have yield delete type', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.beneficiaryType.delete, payload.id),
      );
      return payload.data;
    });
    it('and then yield dispatch deleteTypeSuccess', (result) => {
      expect(result).toEqual(put(actions.deleteTypeSuccess(undefined)));
    });
    it('and then yield dispatch fetchTypes', (result) => {
      expect(result).toEqual(put(actions.fetchTypes({})));
      return new Error('Some error');
    });

    it('and then yield dispatch deleteTypeFailure', (result) => {
      expect(result).toEqual(put(actions.deleteTypeFailure({})));
    });
  });
});
