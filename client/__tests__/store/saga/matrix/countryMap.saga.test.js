import { call, put, takeEvery } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import toastr from 'toastr';
import * as types from '../../../../constants';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/matrix/country';
import * as stateMapActions from '../../../../store/actions/matrix/state';
import {
  fetchCountryMapAsync,
  addCountryMapAsync,
  updateCountryMapAsync,
  watchAddCountryMap,
  watchFetchCountryMap,
  watchUpdateCountryMap,
} from '../../../../store/sagas/matrix/country';
import { getCountries } from '../../../../utils/matrix/state';

const payload = { data: [] };

describe('CountryMap saga tests', () => {
  describe('fetchCountryMap', async () => {
    const it = sagaHelper(fetchCountryMapAsync({ payload: { page: 1 } }));
    it('should have yield fetch country maps', (result) => {
      expect(result).toEqual(call(getCountries, { page: 1 }));
    });
    it('and then yield dispatch fetchCountryMapSuccess', (result) => {
      expect(result).toEqual(put(actions.fetchCountryMapSuccess(payload)));
      return new Error('Some error');
    });
    it('and then yield dispatch fetchCountryMapFailure', (result) => {
      expect(result).toEqual(put(actions.fetchCountryMapFailure({})));
    });
    it('and then toast a message', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error listing maps'));
    });
    describe('addCountryMapAsync', async () => {
      const it = sagaHelper(addCountryMapAsync({ payload }));
      it('should have yield fetch country maps', (result) => {
        expect(result).toEqual(call(api.matrix.national.create, payload));
      });
      it('and then yield dispatch addCountryMapSuccess', (result) => {
        expect(result).toEqual(put(actions.addCountryMapSuccess(undefined)));
      });
      it('and then yield dispatch fetchCountryMap', (result) => {
        expect(result).toEqual(put(actions.fetchCountryMap({ page: 1 })));
        return new Error('an error occurred');
      });
      it('and then yield dispatch addCountryMapFailure', (result) => {
        expect(result).toEqual(put(actions.addCountryMapFailure({})));
      });
      it('and then toast a message', (result) => {
        expect(result).toEqual(call(toastr.warning, 'Error saving svg file'));
      });
    });
  });
  describe('updateCountryMapAsync', async () => {
    const it = sagaHelper(updateCountryMapAsync({ payload }));
    it('should have yield fetch country maps', (result) => {
      expect(result).toEqual(call(api.matrix.national.update, payload));
    });
    it('and then yield dispatch updateCountryMapSuccess', (result) => {
      expect(result).toEqual(put(actions.updateCountryMapSuccess(undefined)));
    });
    it('and then yield dispatch fetchCountryMap', (result) => {
      expect(result).toEqual(
        put(stateMapActions.fetchStateMap({ page: 1, countryName: '' })),
      );
      return new Error('an error occurred');
    });
    it('and then yield dispatch updateCountryMapFailure', (result) => {
      expect(result).toEqual(put(actions.updateCountryMapFailure({})));
    });
    it('and then toast a message', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error updating svg file'));
    });
  });
  // watchers
  describe('Country map saga watcher tests', async () => {
    let it = sagaHelper(watchAddCountryMap({ payload }));
    it('should watch for ADD_COUNTRY_MAP actions ', (result) => {
      expect(result).toEqual(
        takeEvery(types.ADD_COUNTRY_MAP, addCountryMapAsync),
      );
    });
    it = sagaHelper(watchFetchCountryMap({ payload }));
    it('should watch for FETCH_COUNTRY_MAP actions ', (result) => {
      expect(result).toEqual(
        takeEvery(types.FETCH_COUNTRY_MAP, fetchCountryMapAsync),
      );
    });
    it = sagaHelper(watchUpdateCountryMap({ payload }));
    it('should watch for UPDATE_COUNTRY_MAP actions ', (result) => {
      expect(result).toEqual(
        takeEvery(types.UPDATE_COUNTRY_MAP, updateCountryMapAsync),
      );
    });
  });
});
