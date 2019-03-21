import { call, put, takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import { api } from '../../../utils/api';
import {
  ADD_STATUSES,
  FETCH_STATUSES,
  DELETE_STATUS,
} from '../../../constants/dropdowns/statuses';
import * as actions from '../../actions/dropdowns/statuses';

toastr.options = {
  preventDuplicates: true,
};

export function* addStatusesAsync({ payload }) {
  try {
    const data = payload ? payload.data : {};
    const create = payload ? payload.new : {};
    let response;
    if (create) {
      response = yield call(api.dropdowns.regStatus.create, data);
    } else {
      response = yield call(api.dropdowns.regStatus.update, data);
    }
    yield put(actions.addStatusesSuccess());
    yield put(actions.fetchStatuses());
    const message = response
      ? response.data.message
      : 'Status added successfully';
    toastr.success(message);
  } catch (error) {
    yield put(actions.addStatusesFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error adding statuses';
    toastr.warning(message);
  }
}

export function* fetchStatusesAsync() {
  try {
    const response = yield call(api.dropdowns.regStatus.list);
    const data = response ? response.data.data : {};
    yield put(actions.fetchStatusesSuccess(data));
  } catch (error) {
    yield put(actions.fetchStatusesFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error listing statuses';
    toastr.warning(message);
  }
}

export function* deleteStatusesAsync({ payload }) {
  try {
    const response = yield call(api.dropdowns.regStatus.delete, payload.id);
    const data = response ? response.data : {};
    yield put(actions.deleteStatusSuccess(data));
    yield put(actions.fetchStatuses({}));
    const message = response
      ? response.data.message
      : 'Status deleted successfully';
    toastr.success(message);
  } catch (error) {
    yield put(actions.deleteStatusFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error deleting statuses';
    toastr.warning(message);
  }
}

/** WATCHERS */
export function* watchAddStatuses() {
  yield takeEvery(ADD_STATUSES, addStatusesAsync);
}

export function* watchFetchStatuses() {
  yield takeEvery(FETCH_STATUSES, fetchStatusesAsync);
}

export function* watchDeleteStatuses() {
  yield takeEvery(DELETE_STATUS, deleteStatusesAsync);
}
