import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { api } from '../../../../utils/dropdowns/LGA';
import * as actions from '../../../../store/actions/dropdowns/LGA';
import {
  getAllLGAs,
  deleteLGAs,
  addLGAs,
  updateLGAs,
} from '../../../../store/sagas/dropdowns/LGA';

const payload = { data: {} };
describe('LGA Saga', () => {
  describe('Get All Local Government Areas', async () => {
    const it = sagaHelper(getAllLGAs());
    it('should have yield get All Local Government Areas', (result) => {
      expect(result).toEqual(call(api.list));
      return [{}, {}, {}];
    });
    it('and then yield get All Local Government Areas Successfull', (result) => {
      expect(result).toEqual(put(actions.getLGAFailure(undefined)));
    });

    it('and then yield get All Local Government Areas Failure', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('delete Local Government Areas', async () => {
    const it = sagaHelper(deleteLGAs({ payload }));
    it('should have yield delete a Local Government Area', (result) => {
      expect(result).toEqual(call(api.delete, payload.id));
      return payload.data;
    });
    it('and then yield dispatch deleteLGASuccessful', (result) => {
      expect(result).toEqual(put(actions.deleteLGASuccess(undefined)));
    });
    it('and then yield get All Local Government Areas', (result) => {
      expect(result).toEqual(put(actions.getLGARequest(undefined)));
      return new Error('Some error');
    });

    it('and then yield dispatch deleteLGAFailure', (result) => {
      expect(result).toEqual(put(actions.deleteLGAFailure(undefined)));
    });

    it('and then yield Local Government Areas Failure', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('Add Local Government Areas', async () => {
    const it = sagaHelper(addLGAs({ payload }));
    it('should have yield add LGAs', (result) => {
      expect(result).toEqual(call(api.create, payload));
      return payload.data;
    });
    it('and then yield dispatch addLGASuccess', (result) => {
      expect(result).toEqual(put(actions.addLGASuccess(undefined)));
    });
    it('and then yield dispatch getLGARequest', (result) => {
      expect(result).toEqual(put(actions.getLGARequest(undefined)));
      return new Error('Some error');
    });

    it('and then yield dispatch addLGAFailure', (result) => {
      expect(result).toEqual(put(actions.addLGAFailure(undefined)));
    });

    it('and then yield Local Government Areas Failure', (result) => {
      expect(result).toBeUndefined();
    });
  });

  describe('Update Local Government Areas', async () => {
    const it = sagaHelper(updateLGAs({ payload }));
    it('should have yield update LGAs', (result) => {
      expect(result).toEqual(call(api.edit, payload));
      return payload.data;
    });
    it('and then yield dispatch updateLGASuccessfull', (result) => {
      expect(result).toEqual(put(actions.updateLGASuccess(undefined)));
    });
    it('and then yield dispatch getLGARequest', (result) => {
      expect(result).toEqual(put(actions.getLGARequest(undefined)));
      return new Error('Some error');
    });

    it('and then yield dispatch addLGAFailure', (result) => {
      expect(result).toEqual(put(actions.updateLGAFailure(undefined)));
    });
    it('and then yield Local Government Areas Failure', (result) => {
      expect(result).toBeUndefined();
    });
  });
});
