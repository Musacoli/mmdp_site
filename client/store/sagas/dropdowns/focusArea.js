import { call, takeEvery, put } from 'redux-saga/effects';
import toastr from 'toastr';
import { api } from '../../../utils/api';
import {
  ADD_FOCUS_AREA,
  FETCH_FOCUS_AREA,
  DELETE_FOCUS_AREA,
} from '../../../constants/dropdowns/focusArea';

import * as actions from '../../actions/dropdowns/focusArea';

toastr.options = {
  preventDuplicates: true,
};

export function* addFocusAreaAsync({ payload }) {
  try {
    const data = payload ? payload.data : {};
    const create = payload ? payload.new : {};
    let response;
    if (create) {
      response = yield call(api.dropdowns.focusArea.create, data);
    } else {
      response = yield call(api.dropdowns.focusArea.update, data);
    }
    yield put(actions.addFocusAreaSuccess());
    yield put(actions.fetchFocusArea());
    const message = response
      ? response.data.message
      : 'Focus Area option added successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.addFocusAreaFailure({}));
    const message = error.response
      ? error.response.data.error.data
      : 'Error adding Focus Area option';
    yield call(toastr.warning, message);
  }
}

export function* fetchFocusAreaAsync() {
  try {
    const response = yield call(api.dropdowns.focusArea.list);
    const data = response ? response.data.data : {};
    yield put(actions.fetchFocusAreaSuccess(data));
  } catch (error) {
    yield put(actions.fetchFocusAreaFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error listing Focus Area options';
    yield call(toastr.warning, message);
  }
}

export function* deleteFocusAreaAsync({ payload }) {
  try {
    const response = yield call(api.dropdowns.focusArea.delete, payload.id);
    const data = response ? response.data : {};
    yield put(actions.deleteFocusAreaSuccess(data));
    yield put(actions.fetchFocusArea({}));
    const message = response
      ? response.data.message
      : 'Focus Area option deleted successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.deleteFocusAreaFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error deleting Focus Area option';
    yield call(toastr.warning, message);
  }
}

export function* watchAddFocusArea() {
  yield takeEvery(ADD_FOCUS_AREA, addFocusAreaAsync);
}

export function* watchFetchFocusArea() {
  yield takeEvery(FETCH_FOCUS_AREA, fetchFocusAreaAsync);
}

export function* watchDeleteFocusArea() {
  yield takeEvery(DELETE_FOCUS_AREA, deleteFocusAreaAsync);
}
