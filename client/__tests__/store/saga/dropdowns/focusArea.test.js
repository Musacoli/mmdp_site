import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import toastr from 'toastr';
import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/focusArea';
import {
  addFocusAreaAsync,
  fetchFocusAreaAsync,
  deleteFocusAreaAsync,
} from '../../../../store/sagas/dropdowns/focusArea';

const payload = { data: {}, new: true, id: 'someid' };
describe('Focus Area Saga', () => {
  describe('fetchFocus Area options', async () => {
    const it = sagaHelper(fetchFocusAreaAsync({ payload }));
    it('should have yield fetch focus area options', (result) => {
      expect(result).toEqual(call(api.dropdowns.focusArea.list));
    });
    it('and then yield dispatch fetchfocusAreaSuccess', (result) => {
      expect(result).toEqual(put(actions.fetchFocusAreaSuccess(payload.data)));
      return new Error('Some error');
    });

    it('and then yield dispatch fetchFocusAreaFailure', (result) => {
      expect(result).toEqual(put(actions.fetchFocusAreaFailure({})));
    });
    it('and then yield call toastr warning', (result) => {
      expect(result).toEqual(
        call(toastr.warning, 'Error listing Focus Area options'),
      );
    });
  });

  describe('addFocusAreaAsync', async () => {
    const it = sagaHelper(addFocusAreaAsync({ payload }));
    it('should have yield create focus area', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.focusArea.create, payload.data),
      );
    });
    it('and then yield dispatch addFocusAreaAsuccess', (result) => {
      expect(result).toEqual(put(actions.addFocusAreaSuccess(undefined)));
    });
    it('and then yield dispatch fetchFocusArea', (result) => {
      expect(result).toEqual(put(actions.fetchFocusArea(undefined)));
    });
    it('should yield dispatch call toaster message', (result) => {
      expect(result).toEqual(
        call(toastr.success, 'Focus Area option added successfully'),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch addFocusAreaFailure', (result) => {
      expect(result).toEqual(put(actions.addFocusAreaFailure({})));
    });
    it('and then yield call toastr warning', (result) => {
      expect(result).toEqual(
        call(toastr.warning, 'Error adding Focus Area option'),
      );
    });
  });

  describe('deleteFocusAreaAsync', async () => {
    const it = sagaHelper(deleteFocusAreaAsync({ payload }));
    it('should have yield delete focus area', (result) => {
      expect(result).toEqual(call(api.dropdowns.focusArea.delete, payload.id));
    });
    it('and then yield dispatch deleteFocusAreaSuccess', (result) => {
      expect(result).toEqual(put(actions.deleteFocusAreaSuccess({})));
    });
    it('and then yield dispatch fetchFocusArea', (result) => {
      expect(result).toEqual(put(actions.fetchFocusArea({})));
    });
    it('should yield dispatch call toaster message', (result) => {
      expect(result).toEqual(
        call(toastr.success, 'Focus Area option deleted successfully'),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch deleteFocusAreaFailure', (result) => {
      expect(result).toEqual(put(actions.deleteFocusAreaFailure({})));
    });

    it('and then it yields dispatch call toaster message', (result) => {
      expect(result).toEqual(
        call(toastr.warning, 'Error deleting Focus Area option'),
      );
    });
  });
});
