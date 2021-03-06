import { call, put, takeLatest } from 'redux-saga/effects';
import toastr from '../../../utils/toastr';
import * as aboutApi from '../../../utils/about';
import * as types from '../../../constants/about';
import showErrorMessage from './showErrorMessage';

export function* createEdoStateApproach(action) {
  yield put({ type: types.EDO_STATE_APPROACH_LOADING });
  toastr.remove();
  try {
    const { data } = yield call(
      aboutApi.createEdoStateApproach,
      action.payload,
    );
    yield put({ type: types.EDO_STATE_APPROACH_SUCCESS, payload: data.item });
    toastr.success('"Edo State Approach" created successfully');
  } catch (e) {
    const error = showErrorMessage(e);
    error.reverse().forEach((err) => toastr.error(err));
    yield put({
      type: types.EDO_STATE_APPROACH_FAILURE,
      error,
    });
  }
}

export function* updateEdoStateApproach(action) {
  yield put({ type: types.EDO_STATE_APPROACH_LOADING });
  toastr.remove();
  try {
    const { data } = yield call(
      aboutApi.updateEdoStateApproach,
      action.payload,
    );
    yield put({ type: types.EDO_STATE_APPROACH_SUCCESS, payload: data.item });
    toastr.success('"Edo State Approach" updated successfully');
  } catch (e) {
    const error = showErrorMessage(e);
    error.reverse().forEach((err) => toastr.error(err));
    yield put({
      type: types.EDO_STATE_APPROACH_FAILURE,
      error,
    });
  }
}

export function* getEdoStateApproach(action) {
  yield put({ type: types.EDO_STATE_APPROACH_LOADING });
  try {
    const { data } = yield call(aboutApi.getEdoStateApproach, action);
    yield put({
      type: types.EDO_STATE_APPROACH_SUCCESS,
      payload: data.items[0],
    });
  } catch (e) {
    const error = showErrorMessage(e);
    error.reverse().forEach((err) => toastr.error(err));
    yield put({
      type: types.EDO_STATE_APPROACH_FAILURE,
      error,
    });
  }
}

export function* createEdoStateApproachWatcher() {
  yield takeLatest(
    types.CREATE_EDO_STATE_APPROACH_REQUEST,
    createEdoStateApproach,
  );
}

export function* updateEdoStateApproachWatcher() {
  yield takeLatest(
    types.UPDATE_EDO_STATE_APPROACH_REQUEST,
    updateEdoStateApproach,
  );
}

export function* getEdoStateApproachWatcher() {
  yield takeLatest(types.GET_EDO_STATE_APPROACH_REQUEST, getEdoStateApproach);
}
