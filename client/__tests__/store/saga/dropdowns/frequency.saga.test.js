import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import toastr from 'toastr';
import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/frequency';
import {
  addFrequencyAsync,
  fetchFrequencyAsync,
  deleteFrequencyAsync,
} from '../../../../store/sagas/dropdowns/frequency';

const payload = { data: {}, new: true, id: 'someid' };
describe('Frequency Saga', () => {
  describe('fetchFrequency options', async () => {
    const it = sagaHelper(fetchFrequencyAsync({ payload }));
    it('should have yield fetch frequency options', (result) => {
      expect(result).toEqual(call(api.dropdowns.frequency.list));
    });
    it('and then yield dispatch fetchfrequencySuccess', (result) => {
      expect(result).toEqual(put(actions.fetchFrequencySuccess(payload.data)));
      return new Error('Some error');
    });

    it('and then yield dispatch fetchFrequencyFailure', (result) => {
      expect(result).toEqual(put(actions.fetchFrequencyFailure({})));
    });
    it('and then yield call toastr warning', (result) => {
      expect(result).toEqual(
        call(toastr.warning, 'Error listing frequency options'),
      );
    });
  });

  describe('addFrequencyAsync', async () => {
    const it = sagaHelper(addFrequencyAsync({ payload }));
    it('should have yield fetch frequency', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.frequency.create, payload.data),
      );
    });
    it('and then yield dispatch addFrequencySuccess', (result) => {
      expect(result).toEqual(put(actions.addFrequencySuccess(undefined)));
    });
    it('and then yield dispatch fetchFrequency', (result) => {
      expect(result).toEqual(put(actions.fetchFrequency(undefined)));
    });
    it('should yield dispatch call toaster message', (result) => {
      expect(result).toEqual(
        call(toastr.success, 'Frequency option added successfully'),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch addFrequencyFailure', (result) => {
      expect(result).toEqual(put(actions.addFrequencyFailure({})));
    });
    it('and then yield call toastr warning', (result) => {
      expect(result).toEqual(
        call(toastr.warning, 'Error adding frequency option'),
      );
    });
  });

  describe('deleteFrequencyAsync', async () => {
    const it = sagaHelper(deleteFrequencyAsync({ payload }));
    it('should have yield delete funding', (result) => {
      expect(result).toEqual(call(api.dropdowns.frequency.delete, payload.id));
    });
    it('and then yield dispatch deleteFrequencySuccess', (result) => {
      expect(result).toEqual(put(actions.deleteFrequencySuccess({})));
    });
    it('and then yield dispatch fetchFrequency', (result) => {
      expect(result).toEqual(put(actions.fetchFrequency({})));
    });
    it('should yield dispatch call toaster message', (result) => {
      expect(result).toEqual(
        call(toastr.success, 'Frequency option deleted successfully'),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch deleteFrequencyFailure', (result) => {
      expect(result).toEqual(put(actions.deleteFrequencyFailure({})));
    });

    it('and then it yields dispatch call toaster message', (result) => {
      expect(result).toEqual(
        call(toastr.warning, 'Error deleting frequency option'),
      );
    });
  });
});
