import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/organizationType';
import {
  getAllOrganizationTypes,
  deleteOrganizationType,
  addOrganizationTypes,
  updateOrganizationTypes,
} from '../../../../store/sagas/dropdowns/organizationType';

const payload = { data: {} };
describe('OrganizationType Saga', () => {
  describe('Get All Organization Types', async () => {
    const it = sagaHelper(getAllOrganizationTypes());
    it('should have yield get All Organization Types', (result) => {
      expect(result).toEqual(call(api.dropdowns.organizationType.list));
      return [{}, {}, {}];
    });
    it('and then yield get All Organization Types Successfull', (result) => {
      expect(result).toEqual(
        put(actions.getOrganizationTypeFailure(undefined)),
      );
    });

    it('and then yield get All Organization Types Failure', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('delete Organization Types', async () => {
    const it = sagaHelper(deleteOrganizationType({ payload }));
    it('should have yield delete a Local Government Area', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.organizationType.delete, payload.id),
      );
      return payload.data;
    });
    it('and then yield dispatch deleteOrganizationTypeSuccessful', (result) => {
      expect(result).toEqual(
        put(actions.deleteOrganizationTypeSuccess(undefined)),
      );
    });
    it('and then yield Organization Types', (result) => {
      expect(result).toEqual(
        put(actions.getOrganizationTypeRequest(undefined)),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch deleteOrganizationTypeFailure', (result) => {
      expect(result).toEqual(
        put(actions.deleteOrganizationTypeFailure(undefined)),
      );
    });

    it('and then yield Organization Types Failure', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('Add Organization Types', async () => {
    const it = sagaHelper(addOrganizationTypes({ payload }));
    it('should have yield add OrganizationTypes', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.organizationType.create, payload),
      );
      return payload.data;
    });
    it('and then yield dispatch addOrganizationTypeSuccess', (result) => {
      expect(result).toEqual(
        put(actions.addOrganizationTypeSuccess(undefined)),
      );
    });
    it('and then yield dispatch getOrganizationTypeRequest', (result) => {
      expect(result).toEqual(
        put(actions.getOrganizationTypeRequest(undefined)),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch addOrganizationTypeFailure', (result) => {
      expect(result).toEqual(
        put(actions.addOrganizationTypeFailure(undefined)),
      );
    });

    it('and then yield Organization Types Failure', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('Update Organization Types', async () => {
    const it = sagaHelper(updateOrganizationTypes({ payload }));
    it('should have yield update OrganizationTypes', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.organizationType.update, payload),
      );
      return payload.data;
    });
    it('and then yield dispatch updateOrganizationTypeSuccessfull', (result) => {
      expect(result).toEqual(
        put(actions.updateOrganizationTypeSuccess(undefined)),
      );
    });
    it('and then yield dispatch getOrganizationTypeRequest', (result) => {
      expect(result).toEqual(
        put(actions.getOrganizationTypeRequest(undefined)),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch addOrganizationTypeFailure', (result) => {
      expect(result).toEqual(
        put(actions.updateOrganizationTypeFailure(undefined)),
      );
    });

    it('and then yield Organization Types Failure', (result) => {
      expect(result).toBeUndefined();
    });
  });
});
