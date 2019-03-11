import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { api } from '../../../../utils/api';
import { FETCHING_STAFF_STRENGTHS } from '../../../../constants/dropdowns/staffStrength';
import {
  loadStaffStrengths,
  createStaffStrengths,
  deleteStaffStrength,
  updateStaffStrengths,
} from '../../../../store/sagas/dropdowns/staffStrength';
import {
  fetchStaffStrengths,
  staffStrengthsCreatedSuccessfully,
} from '../../../../store/actions';

const id = 1;
const payload = { id };
const updatePayload = {
  staffStrength: [
    {
      _id: '5c989d6840be251ad7a602cf',
      __v: 0,
      staffStrength: '30 - 40',
      description: 'testing',
    },
    {
      _id: '5c989d6840be251ad7a602d0',
      __v: 0,
      staffStrength: '40 - 55',
      description: 'testing2',
    },
  ],
};

describe('Staff Strengths saga', async () => {
  describe('loadStaffStrengths', async () => {
    const it = sagaHelper(loadStaffStrengths());
    it('should have called api list staff strength', (result) => {
      expect(result).toEqual(call(api.dropdowns.staffStrength.list));
    });
    it('and then trigger a load staff Strengths', (result) => {
      expect(result).toEqual(put(fetchStaffStrengths(undefined)));
    });
  });
  describe('createStaffStrength', async () => {
    const it = sagaHelper(createStaffStrengths({ payload: null }));
    it('should have called the create staff strength', (result) => {
      expect(result).toEqual(call(api.dropdowns.staffStrength.create, null));
    });
    it('and then trigger a staff strength created successfully', (result) => {
      expect(result).toEqual(put(staffStrengthsCreatedSuccessfully(undefined)));
    });
  });
  describe('updateStaffStrengths', async () => {
    const it = sagaHelper(updateStaffStrengths({ updatePayload }));
    it('should have called api put staff strength', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.staffStrength.update, undefined),
      );
    });
    it(' and then trigger staff strength created successfully', (result) => {
      expect(result).toEqual(put(staffStrengthsCreatedSuccessfully(undefined)));
    });
  });
  describe('deleteStaffStrength', async () => {
    const it = sagaHelper(deleteStaffStrength({ payload }));
    it('should have called the delete staff strength', (result) => {
      expect(result).toEqual(call(api.dropdowns.staffStrength.delete, 1));
    });
    it('and then trigger a FETCHING_STAFF_STRENGTH action', (result) => {
      expect(result).toEqual(
        put({
          type: FETCHING_STAFF_STRENGTHS,
        }),
      );
    });
  });
});
