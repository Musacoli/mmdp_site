import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import toastr from 'toastr';
import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/manageDropdowns/dropdowns';
import {
  fetchDropdownsAsync,
  deleteDropdownsAsync,
} from '../../../../store/sagas/manageDropdowns/dropdowns';

let payload;
describe('Dropdowns type saga', () => {
  describe('fetchDropdownsAsync', async () => {
    const it = sagaHelper(fetchDropdownsAsync());
    it('should have yield fetch dropdowns', (result) => {
      expect(result).toEqual(call(api.dropdowns.manageDropdowns.list));
    });
    it('and then yield dispatch fetchDropdownsSuccess', (result) => {
      expect(result).toEqual(put(actions.fetchDropdownsSuccess([])));
      return new Error('Some error');
    });

    it('and then yield dispatch fetchDropdownsFailure', (result) => {
      expect(result).toEqual(put(actions.fetchDropdownsFailure([])));
    });
    it('and then yield dispatch call toastr warning', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error listing dropdowns'));
    });
  });

  describe('deleteDropdownsAsync', async () => {
    const it = sagaHelper(deleteDropdownsAsync({ payload }));
    it('should have yield delete dropdowns type', (result) => {
      expect(result).toEqual(
        call(api.manageDropdowns.truncate.delete, payload),
      );
    });
    it('and then yield dispatch deleteDropdownsSuccess', (result) => {
      expect(result).toEqual(put(actions.deleteDropdownsSuccess({})));
    });
    it('and then yield dispatch fetchDropdowns', (result) => {
      expect(result).toEqual(put(actions.fetchDropdowns({})));
    });
    it('and then yield dispatch call toastr success', (result) => {
      expect(result).toEqual(
        call(toastr.success, 'Dropdown entries deleted successfully'),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch deleteDropdownsFailure', (result) => {
      expect(result).toEqual(put(actions.deleteDropdownsFailure({})));
    });
    it('and then yield dispatch call toastr error', (result) => {
      expect(result).toEqual(
        call(toastr.warning, 'Error deleting dropdown entries'),
      );
    });
  });
});
