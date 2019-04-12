import { call, put, takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import {
  FETCH_COUNTRY_MAP,
  ADD_COUNTRY_MAP,
  UPDATE_COUNTRY_MAP,
} from '../../../constants';
import * as actions from '../../actions/matrix/country';
import * as stateMapActions from '../../actions/matrix/state';
import { api } from '../../../utils/api';
import { getCountries } from '../../../utils/matrix/state';

toastr.options = {
  preventDuplicates: true,
};

export function* addCountryMapAsync(action) {
  try {
    const response = yield call(api.matrix.national.create, action.payload);
    yield put(actions.addCountryMapSuccess());
    yield put(actions.fetchCountryMap({ page: 1 }));
    toastr.success(response.data.message);
  } catch (error) {
    yield put(actions.addCountryMapFailure({}));
    let message;
    if (error.response) {
      const res = error.response.data;
      message = res.error ? res.error.files : res.message;
    }
    yield call(toastr.warning, message || 'Error saving svg file');
  }
}
export function* updateCountryMapAsync(action) {
  try {
    const response = yield call(api.matrix.national.update, action.payload);
    const countryName = response.data.countryName;
    yield put(actions.updateCountryMapSuccess());
    yield put(stateMapActions.fetchStateMap({ page: 1, countryName }));
    toastr.success(response.data.message);
  } catch (error) {
    console.log(error);
    yield put(actions.updateCountryMapFailure({}));
    let message;
    if (error.response) {
      const res = error.response.data;
      message = res.error ? res.error.files : res.message;
    }
    yield call(toastr.warning, message || 'Error updating svg file');
  }
}
export function* fetchCountryMapAsync(action) {
  try {
    const response = yield call(getCountries, action.payload);
    const data = response ? response.data : [];
    yield put(actions.fetchCountryMapSuccess({ data }));
  } catch (error) {
    yield put(actions.fetchCountryMapFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error listing maps';
    yield call(toastr.warning, message);
  }
}

/** WATCHERS */
export function* watchFetchCountryMap() {
  yield takeEvery(FETCH_COUNTRY_MAP, fetchCountryMapAsync);
}
export function* watchAddCountryMap() {
  yield takeEvery(ADD_COUNTRY_MAP, addCountryMapAsync);
}
export function* watchUpdateCountryMap() {
  yield takeEvery(UPDATE_COUNTRY_MAP, updateCountryMapAsync);
}
