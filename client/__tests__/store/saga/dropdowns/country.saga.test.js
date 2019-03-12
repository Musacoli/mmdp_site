import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/country';
import { fetchCountryAsync } from '../../../../store/sagas/dropdowns/country';

const payload = { data: {}, new: true, id: 'someid' };
describe('State Saga', () => {
  describe('fetchState', async () => {
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
  });
});
