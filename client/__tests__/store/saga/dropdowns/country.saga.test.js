import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import toastr from 'toastr';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/country';
import {
  fetchCountryAsync,
  addCountryAsync,
  deleteCountryAsync,
} from '../../../../store/sagas/dropdowns/country';

const payload = { data: {}, new: true, id: 'someid' };
describe('Country Saga', () => {
  describe('Get all countries sagas', async () => {
    const it = sagaHelper(fetchCountryAsync({ payload }));
    it('should have yield fetch country', (result) => {
      expect(result).toEqual(call(api.dropdowns.country.list));
    });
    it('and then yield dispatch fetchCountrySuccess', (result) => {
      expect(result).toEqual(put(actions.fetchCountrySuccess(undefined)));
      return new Error('Some error');
    });

    it('and then yield dispatch fetchCountryFailure', (result) => {
      expect(result).toEqual(put(actions.fetchCountryFailure({})));
    });
    it('and then yield call toastr warning', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error listing countries'));
    });
  });
});

describe('addCountry Saga', async () => {
  const it = sagaHelper(addCountryAsync({ payload }));
  it('should have yield add country', (result) => {
    expect(result).toEqual(call(api.dropdowns.country.create, payload.data));
  });
  it('and then yield dispatch add country Success', (result) => {
    expect(result).toEqual(put(actions.addCountrySuccess(undefined)));
  });
  it('and then yield dispatch get all Countries', (result) => {
    expect(result).toEqual(call(api.dropdowns.country.list));
  });
  it('and then yield dispatch fetch countries dropdown action', (result) => {
    expect(result).toEqual(put(actions.addCountryFailure({})));
  });
});

describe('delete Country Saga', async () => {
  const it = sagaHelper(deleteCountryAsync({ payload }));
  it('should have yield delete Country', (result) => {
    expect(result).toEqual(call(api.dropdowns.country.delete, payload.id));
  });
  it('and then yield dispatch delete a Country', (result) => {
    expect(result).toEqual(put(actions.deleteCountrySuccess({})));
  });
  it('and then yield dispatch get all Countries', (result) => {
    expect(result).toEqual(call(api.dropdowns.country.list));
  });
  it('and then yield dispatch fetch countries dropdown action', (result) => {
    expect(result).toEqual(put(actions.deleteCountryFailure({})));
  });
  it('and then yield call toastr warning', (result) => {
    expect(result).toEqual(call(toastr.warning, 'Error deleting countries'));
  });
});
