import { call, takeEvery, put } from 'redux-saga/effects';
import toastr from 'toastr';
import { api } from '../../../utils/api';
import {
  ADD_FREQUENCY,
  FETCH_FREQUENCY,
  DELETE_FREQUENCY,
} from '../../../constants/dropdowns/frequency';

import * as actions from '../../actions/dropdowns/frequency';

toastr.options = {
  preventDuplicates: true,
};

export function* addFrequencyAsync({ payload }) {
  try {
    const data = payload ? payload.data : {};
    const create = payload ? payload.new : {};
    let response;
    if (create) {
      response = yield call(api.dropdowns.frequency.create, data);
    } else {
      response = yield call(api.dropdowns.frequency.update, data);
    }
    yield put(actions.addFrequencySuccess());
    yield put(actions.fetchFrequency());
    const message = response
      ? response.data.message
      : 'Frequency option added successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.addFrequencyFailure({}));
    const message = error.response
      ? error.response.data.error.data
      : 'Error adding frequency option';
    yield call(toastr.warning, message);
  }
}

export function* fetchFrequencyAsync() {
  try {
    const response = yield call(api.dropdowns.frequency.list);
    const data = response ? response.data : {};
    yield put(actions.fetchFrequencySuccess(data));
  } catch (error) {
    yield put(actions.fetchFrequencyFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error listing frequency options';
    yield call(toastr.warning, message);
  }
}

export function* deleteFrequencyAsync({ payload }) {
  try {
    const response = yield call(api.dropdowns.frequency.delete, payload.id);
    const data = response ? response.data : {};
    yield put(actions.deleteFrequencySuccess(data));
    yield put(actions.fetchFrequency({}));
    const message = response
      ? response.data.message
      : 'Frequency option deleted successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.deleteFrequencyFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error deleting frequency option';
    yield call(toastr.warning, message);
  }
}

export function* watchAddFrequency() {
  yield takeEvery(ADD_FREQUENCY, addFrequencyAsync);
}

export function* watchFetchFrequency() {
  yield takeEvery(FETCH_FREQUENCY, fetchFrequencyAsync);
}

export function* watchDeleteFrequency() {
  yield takeEvery(DELETE_FREQUENCY, deleteFrequencyAsync);
}
