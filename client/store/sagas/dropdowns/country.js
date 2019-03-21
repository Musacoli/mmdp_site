import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_COUNTRY } from '../../../constants';

import { api } from '../../../utils/api';

import * as actions from '../../actions/dropdowns/country';

export function* fetchCountryAsync() {
  try {
    const response = yield call(api.dropdowns.country.list);
    const data = response ? response.data : {};
    yield put(actions.fetchCountrySuccess(data.data));
  } catch (error) {
    yield put(actions.fetchCountryFailure({}));
  }
}
/** WATCHERS */
export function* watchFetchCountry() {
  yield takeEvery(FETCH_COUNTRY, fetchCountryAsync);
}
