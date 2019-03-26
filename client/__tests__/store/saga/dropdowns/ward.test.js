import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import toastr from 'toastr';
import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/ward';
import {
  fetchWardsAsync,
  addWardsAsync,
  deleteWardsAsync,
} from '../../../../store/sagas/dropdowns/ward';

const payload = { data: {}, new: true, id: 'someId' };
describe('Ward type saga', () => {
  describe('fetchWardsAsync', async () => {
    const it = sagaHelper(fetchWardsAsync({ payload }));
    it('should have yield fetch wards', (result) => {
      expect(result).toEqual(call(api.dropdowns.ward.list));
    });
    it('and then yield dispatch fetchWardsSuccess', (result) => {
      expect(result).toEqual(put(actions.fetchWardsSuccess(payload.data)));
      return new Error('Some error');
    });

    it('and then yield dispatch fetchWardsFailure', (result) => {
      expect(result).toEqual(put(actions.fetchWardsFailure({})));
    });
    it('and then yield dispatch call toastr warning', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error listing wards'));
    });
  });

  describe('addWardsAsync', async () => {
    const it = sagaHelper(addWardsAsync({ payload }));
    it('should have yield add wards types', (result) => {
      expect(result).toEqual(call(api.dropdowns.ward.create, payload.data));
    });
    it('and then yield dispatch addWardsSuccess', (result) => {
      expect(result).toEqual(put(actions.addWardsSuccess(undefined)));
    });
    it('and them yield dispatch fetchWards', (result) => {
      expect(result).toEqual(put(actions.fetchWards(undefined)));
    });

    it('and then yield dispatch call toastr success', (result) => {
      expect(result).toEqual(call(toastr.success, 'Ward added successfully'));
      return new Error('Some error');
    });

    it('and then yield dispatch addWardsFailure', (result) => {
      expect(result).toEqual(put(actions.addWardsFailure({})));
    });
    it('and then yield call toastr warning', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error adding wards'));
    });

    const data = { ...payload, new: false };

    it = sagaHelper(addWardsAsync({ payload: data }));
    it('should have yield call update wards', (result) => {
      expect(result).toEqual(call(api.dropdowns.ward.update, payload.data));
    });
  });

  describe('deleteWardsAsync', async () => {
    const it = sagaHelper(deleteWardsAsync({ payload }));
    it('should have yield delete ward type', (result) => {
      expect(result).toEqual(call(api.dropdowns.ward.delete, payload.id));
    });
    it('and then yield dispatch deleteWardTypeSuccess', (result) => {
      expect(result).toEqual(put(actions.deleteWardSuccess({})));
    });
    it('and then yield dispatch fetchWardType', (result) => {
      expect(result).toEqual(put(actions.fetchWards({})));
    });
    it('and then yield dispatch call toastr success', (result) => {
      expect(result).toEqual(call(toastr.success, 'Ward deleted successfully'));
      return new Error('Some error');
    });

    it('and then yield dispatch deleteWardFailure', (result) => {
      expect(result).toEqual(put(actions.deleteWardFailure({})));
    });
    it('and then yield dispatch call toastr error', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error deleting wards'));
    });
  });
});
