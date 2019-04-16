import { call, put, takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import { api } from '../../../utils/api';
import {
  FETCH_DROPDOWNS,
  DELETE_DROPDOWNS,
} from '../../../constants/manageDropdowns/dropdowns';

import * as actions from '../../actions/manageDropdowns/dropdowns';

toastr.options = {
  preventDuplicates: true,
};

export function* fetchDropdownsAsync() {
  try {
    const response = yield call(api.dropdowns.manageDropdowns.list);
    const data = response ? response.data : [];
    yield put(actions.fetchDropdownsSuccess(data));
  } catch (err) {
    yield put(actions.fetchDropdownsFailure([]));
    const message = err.response
      ? err.response.data.message
      : 'Error listing dropdowns';
    yield call(toastr.warning, message);
  }
}

export function* deleteDropdownsAsync({ payload }) {
  try {
    const response = yield call(api.manageDropdowns.truncate.delete, payload);
    const data = response ? response.data : {};
    yield put(actions.deleteDropdownsSuccess(data));
    yield put(actions.fetchDropdowns({}));
    const message = response
      ? response.data.message
      : 'Dropdown entries deleted successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.deleteDropdownsFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error deleting dropdown entries';
    yield call(toastr.warning, message);
  }
}

/** WATCHERS */

export function* watchFetchDropdowns() {
  yield takeEvery(FETCH_DROPDOWNS, fetchDropdownsAsync);
}

export function* watchDeleteDropdowns() {
  yield takeEvery(DELETE_DROPDOWNS, deleteDropdownsAsync);
}
