import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import toastr from 'toastr';
import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/funding';
import {
  fetchFundingAsync,
  addFundingAsync,
  deleteFundingAsync,
} from '../../../../store/sagas/dropdowns/funding';

const payload = { data: {}, new: true, id: 'someid' };
describe('Funding Saga', () => {
  describe('fetchFunding', async () => {
    const it = sagaHelper(fetchFundingAsync({ payload }));
    it('should have yield fetch funding', (result) => {
      expect(result).toEqual(call(api.dropdowns.funding.list));
    });
    it('and then yield dispatch fetchFundingSuccess', (result) => {
      expect(result).toEqual(put(actions.fetchFundingSuccess(payload.data)));
      return new Error('Some error');
    });

    it('and then yield dispatch fetchFundingFailure', (result) => {
      expect(result).toEqual(put(actions.fetchFundingFailure({})));
    });
    it('and then yield call toastr warning', (result) => {
      expect(result).toEqual(
        call(toastr.warning, 'Error listing source of fundings'),
      );
    });
  });

  describe('addFundingAsync', async () => {
    const it = sagaHelper(addFundingAsync({ payload }));
    it('should have yield fetch funding', (result) => {
      expect(result).toEqual(call(api.dropdowns.funding.create, payload.data));
    });
    it('and then yield dispatch addFundingSuccess', (result) => {
      expect(result).toEqual(put(actions.addFundingSuccess(undefined)));
    });
    it('and then yield dispatch fetchFunding', (result) => {
      expect(result).toEqual(put(actions.fetchFunding(undefined)));
    });
    it('should yield dispatch call toaster message', (result) => {
      expect(result).toEqual(
        call(toastr.success, 'Source of funding added successfully'),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch addFundingFailure', (result) => {
      expect(result).toEqual(put(actions.addFundingFailure({})));
    });
    it('and then yield call toastr warning', (result) => {
      expect(result).toEqual(
        call(toastr.warning, 'Error adding source of funding'),
      );
    });
  });

  describe('deleteFundingAsync', async () => {
    const it = sagaHelper(deleteFundingAsync({ payload }));
    it('should have yield delete funding', (result) => {
      expect(result).toEqual(call(api.dropdowns.funding.delete, payload.id));
    });
    it('and then yield dispatch deleteFundingSuccess', (result) => {
      expect(result).toEqual(put(actions.deleteFundingSuccess({})));
    });
    it('and then yield dispatch fetchFunding', (result) => {
      expect(result).toEqual(put(actions.fetchFunding({})));
    });
    it('should yield dispatch call toaster message', (result) => {
      expect(result).toEqual(
        call(toastr.success, 'Source of funding deleted successfully'),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch deleteFundingFailure', (result) => {
      expect(result).toEqual(put(actions.deleteFundingFailure({})));
    });

    it('and then it yields dispatch call toaster message', (result) => {
      expect(result).toEqual(
        call(toastr.warning, 'Error deleting source of funding'),
      );
    });
  });
});
