import { call, put, takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import { FETCH_COUNTRY, ADD_COUNTRY, DELETE_COUNTRY } from '../../../constants';

import { api } from '../../../utils/api';

import * as actions from '../../actions/dropdowns/country';

toastr.options = {
  preventDuplicates: true,
};
export function* fetchCountryAsync() {
  try {
    const response = yield call(api.dropdowns.country.list);
    const data = response ? response.data : {};
    yield put(actions.fetchCountrySuccess(data.data));
  } catch (error) {
    yield put(actions.fetchCountryFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error listing countries';
    yield call(toastr.warning, message);
  }
}

export function* addCountryAsync({ payload }) {
  try {
    const data = payload ? payload.data : {};
    const create = payload ? payload.new : {};
    let response;
    if (create) {
      response = yield call(api.dropdowns.country.create, data);
    } else {
      response = yield call(api.dropdowns.country.update, data);
    }
    yield put(actions.addCountrySuccess());
    const res = yield call(api.dropdowns.country.list);
    yield put(actions.fetchCountrySuccess(res.data.data));
    const message = response
      ? response.data.message
      : 'Country added successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.addCountryFailure({}));
    const message = error.response
      ? error.response.data.error
      : 'Error adding countries';
    yield call(toastr.warning, message.data);
  }
}

export function* deleteCountryAsync({ payload }) {
  try {
    const response = yield call(api.dropdowns.country.delete, payload.id);
    const data = response ? response.data : {};
    yield put(actions.deleteCountrySuccess(data));
    const res = yield call(api.dropdowns.country.list);
    yield put(actions.fetchCountrySuccess(res.data.data));
    const message = response
      ? response.data.message
      : 'Country deleted successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.deleteCountryFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error deleting countries';
    yield call(toastr.warning, message);
  }
}

export function* watchFetchCountry() {
  yield takeEvery(FETCH_COUNTRY, fetchCountryAsync);
}

export function* watchAddCountries() {
  yield takeEvery(ADD_COUNTRY, addCountryAsync);
}

export function* watchDeleteCountry() {
  yield takeEvery(DELETE_COUNTRY, deleteCountryAsync);
}
