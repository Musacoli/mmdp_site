import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import toastr from 'toastr';
import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/amountInvested';
import {
  addAmountAsync,
  fetchAmountAsync,
  deleteAmountAsync,
} from '../../../../store/sagas/dropdowns/amountInvested';

const payload = { data: {}, new: true, id: 'someid' };
describe('Amount iNvested Saga', () => {
  describe('fetchAmount options', async () => {
    const it = sagaHelper(fetchAmountAsync({ payload }));
    it('should have yield fetch amount invested options', (result) => {
      expect(result).toEqual(call(api.dropdowns.amountInvested.list));
    });
    it('and then yield dispatch fetchAmountSuccess', (result) => {
      expect(result).toEqual(put(actions.fetchAmountSuccess(payload.data)));
      return new Error('Some error');
    });

    it('and then yield dispatch fetchAmountFailure', (result) => {
      expect(result).toEqual(put(actions.fetchAmountFailure({})));
    });
    it('and then yield call toastr warning', (result) => {
      expect(result).toEqual(
        call(toastr.warning, 'Error listing Investment options'),
      );
    });
  });

  describe('addAmountAsync', async () => {
    const it = sagaHelper(addAmountAsync({ payload }));
    it('should have yield fetch Amount invested', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.amountInvested.create, payload.data),
      );
    });
    it('and then yield dispatch addAmountSuccess', (result) => {
      expect(result).toEqual(put(actions.addAmountSuccess(undefined)));
    });
    it('and then yield dispatch fetchAmount', (result) => {
      expect(result).toEqual(put(actions.fetchAmount(undefined)));
    });
    it('should yield dispatch call toaster message', (result) => {
      expect(result).toEqual(
        call(toastr.success, 'Investment option added successfully'),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch addAmountFailure', (result) => {
      expect(result).toEqual(put(actions.addAmountFailure({})));
    });
    it('and then yield call toastr warning', (result) => {
      expect(result).toEqual(
        call(toastr.warning, 'Error adding Investment option'),
      );
    });
  });

  describe('deleteAmountAsync', async () => {
    const it = sagaHelper(deleteAmountAsync({ payload }));
    it('should have yield delete Amount Invested', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.amountInvested.delete, payload.id),
      );
    });
    it('and then yield dispatch deleteAmountSuccess', (result) => {
      expect(result).toEqual(put(actions.deleteAmountSuccess({})));
    });
    it('and then yield dispatch fetchAmount', (result) => {
      expect(result).toEqual(put(actions.fetchAmount({})));
    });
    it('should yield dispatch call toaster message', (result) => {
      expect(result).toEqual(
        call(toastr.success, 'Investment option deleted successfully'),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch deleteAmountFailure', (result) => {
      expect(result).toEqual(put(actions.deleteAmountFailure({})));
    });

    it('and then it yields dispatch call toaster message', (result) => {
      expect(result).toEqual(
        call(toastr.warning, 'Error deleting Investment option'),
      );
    });
  });
});
