import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import toastr from 'toastr';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/matrix/country';
import {
  fetchCountryMapAsync,
  addCountryMapAsync,
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
        // expect(result).toEqual(call(toastr.warning, 'Error saving svg file'));
      });
    });
  });
});
