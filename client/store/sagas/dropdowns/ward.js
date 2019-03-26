import { call, put, takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import { api } from '../../../utils/api';
import {
  ADD_WARDS,
  FETCH_WARDS,
  DELETE_WARD,
} from '../../../constants/dropdowns/ward';
import * as actions from '../../actions/dropdowns/ward';

toastr.options = {
  preventDuplicates: true,
};

export function* addWardsAsync({ payload }) {
  try {
    const data = payload ? payload.data : {};
    const create = payload ? payload.new : {};
    let response;
    if (create) {
      response = yield call(api.dropdowns.ward.create, data);
    } else {
      response = yield call(api.dropdowns.ward.update, data);
    }
    yield put(actions.addWardsSuccess());
    yield put(actions.fetchWards());
    const message = response
      ? response.data.message
      : 'Ward added successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.addWardsFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error adding wards';
    yield call(toastr.warning, message);
  }
}

export function* fetchWardsAsync() {
  try {
    const response = yield call(api.dropdowns.ward.list);
    const data = response ? response.data.data : {};
    yield put(actions.fetchWardsSuccess(data));
  } catch (error) {
    yield put(actions.fetchWardsFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error listing wards';
    yield call(toastr.warning, message);
  }
}

export function* deleteWardsAsync({ payload }) {
  try {
    const response = yield call(api.dropdowns.ward.delete, payload.id);
    const data = response ? response.data : {};
    yield put(actions.deleteWardSuccess(data));
    yield put(actions.fetchWards({}));
    const message = response
      ? response.data.message
      : 'Ward deleted successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.deleteWardFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error deleting wards';
    yield call(toastr.warning, message);
  }
}

/** WATCHERS */
export function* watchAddWards() {
  yield takeEvery(ADD_WARDS, addWardsAsync);
}

export function* watchFetchWards() {
  yield takeEvery(FETCH_WARDS, fetchWardsAsync);
}

export function* watchDeleteWards() {
  yield takeEvery(DELETE_WARD, deleteWardsAsync);
}
