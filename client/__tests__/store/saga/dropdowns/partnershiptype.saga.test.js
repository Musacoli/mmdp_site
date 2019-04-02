import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import toastr from 'toastr';
import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/partnershipType';
import {
  fetchPartnershipTypesAsync,
  addPartnershipTypesAsync,
  deletePartnershipTypesAsync,
} from '../../../../store/sagas/dropdowns/partnershipType';

const payload = { data: {}, new: true, id: 'someid' };
describe('Partnership type Saga', () => {
  describe('fetchPartnershipTypesAsync', async () => {
    const it = sagaHelper(fetchPartnershipTypesAsync({ payload }));
    it('should have yield fetch partnershiptype', (result) => {
      expect(result).toEqual(call(api.dropdowns.partnershipType.list));
    });
    it('and then yield dispatch fetchPartnershipTypeSuccess', (result) => {
      expect(result).toEqual(
        put(actions.fetchPartnershipTypeSuccess(payload.data)),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch fetchPartnershipTypeFailure', (result) => {
      expect(result).toEqual(put(actions.fetchPartnershipTypeFailure({})));
    });
    it('and then yield dispatch call toastr warning', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error listing states'));
    });
  });

  describe('addPartnershipTypesAsync', async () => {
    let it = sagaHelper(addPartnershipTypesAsync({ payload }));
    it('should have yield fetch partnership types', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.partnershipType.create, payload.data),
      );
    });
    it('and then yield dispatch addPartnershipTypeSuccess', (result) => {
      expect(result).toEqual(put(actions.addPartnershipTypeSuccess(undefined)));
    });
    it('and then yield dispatch fetchPartnershipType', (result) => {
      expect(result).toEqual(put(actions.fetchPartnershipType(undefined)));
    });

    it('and then yield dispatch toarst success', (result) => {
      expect(result).toEqual(
        call(toastr.success, 'Partnership type(s) added successfully'),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch addPartnershipTypeFailure', (result) => {
      expect(result).toEqual(put(actions.addPartnershipTypeFailure({})));
    });
    it('and then yield call toastr warning', (result) => {
      expect(result).toEqual(
        call(toastr.warning, 'Error adding partnership type'),
      );
    });

    const data = { ...payload, new: false };

    it = sagaHelper(addPartnershipTypesAsync({ payload: data }));
    it('should have yield call update partnership type', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.partnershipType.update, payload.data),
      );
    });
  });

  describe('deletePartnershipTypesAsync', async () => {
    const it = sagaHelper(deletePartnershipTypesAsync({ payload }));
    it('should have yield delete partnership type', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.partnershipType.delete, payload.id),
      );
    });
    it('and then yield dispatch deletePartnershipTypeSuccess', (result) => {
      expect(result).toEqual(put(actions.deletePartnershipTypeSuccess({})));
    });
    it('and then yield dispatch fetchPartnershipType', (result) => {
      expect(result).toEqual(put(actions.fetchPartnershipType({})));
    });
    it('and then yield dispatch call toastr success', (result) => {
      expect(result).toEqual(
        call(toastr.success, 'PartnershipType deleted successfully'),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch deletePartnershipTypeFailure', (result) => {
      expect(result).toEqual(put(actions.deletePartnershipTypeFailure({})));
    });
    it('and then yield dispatch call toastr error', (result) => {
      expect(result).toEqual(
        call(toastr.warning, 'Error deleting partnership type'),
      );
    });
  });
});
