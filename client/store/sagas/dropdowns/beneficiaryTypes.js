import { call, put, takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import { api } from '../../../utils/api';
import {
  ADD_TYPES,
  FETCH_TYPES,
  DELETE_TYPE,
  UPDATE_TYPE,
} from '../../../constants/dropdowns/beneficiaryType';
import * as actions from '../../actions/dropdowns/beneficiaryType';

toastr.options = {
  preventDuplicates: true,
};

export function* addTypesAsync({ payload }) {
  try {
    const response = yield call(api.dropdowns.beneficiaryType.create, payload);
    yield put(actions.addTypesSuccess());
    yield put(actions.fetchTypes());
    toastr.success(response.data.message);
  } catch (error) {
    yield put(actions.addTypesFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error adding types';
    yield call(toastr.warning, message);
  }
}

export function* updateTypesAsync({ payload }) {
  try {
    const response = yield call(api.dropdowns.beneficiaryType.update, payload);
    yield put(actions.updateTypeSuccess(response.data));
    yield put(actions.fetchTypes());
    const message = response
      ? response.data.message
      : 'Beneficiary type(s) added successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.updateTypeFailure(error.response));
    const message = error.response
      ? error.response.data.message
      : 'An Error Occured Trying Again Later';
    yield call(toastr.error, message);
  }
}

export function* fetchTypesAsync() {
  try {
    const response = yield call(api.dropdowns.beneficiaryType.list);
    const data = response ? response.data.data : {};
    yield put(actions.fetchTypesSuccess(data));
  } catch (error) {
    yield put(actions.fetchTypesFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error listing types';
    yield call(toastr.warning, message);
  }
}

export function* deleteTypesAsync({ payload }) {
  try {
    const response = yield call(
      api.dropdowns.beneficiaryType.delete,
      payload.id,
    );
    yield put(actions.deleteTypeSuccess(response.data));
    yield put(actions.fetchTypes({}));
    const message = response
      ? response.data.message
      : 'Beneficiary type has been deleted successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.deleteTypeFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error deleting beneficiary type';
    yield call(toastr.error, message);
  }
}

/** WATCHERS */

export function* watchAddTypes() {
  yield takeEvery(ADD_TYPES, addTypesAsync);
}

export function* watchUpdateTypes() {
  yield takeEvery(UPDATE_TYPE, updateTypesAsync);
}

export function* watchFetchTypes() {
  yield takeEvery(FETCH_TYPES, fetchTypesAsync);
}

export function* watchDeleteTypes() {
  yield takeEvery(DELETE_TYPE, deleteTypesAsync);
}
