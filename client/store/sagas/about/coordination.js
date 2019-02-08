import { call, put, takeLatest } from 'redux-saga/effects';
import * as aboutApi from '../../../utils/about';
import toastr from '../../../utils/toastr';
import * as types from '../../../constants/about';
import showErrorMessage from './showErrorMessage';

export function* createCoordination(action) {
  yield put({ type: types.COORDINATION_LOADING });
  toastr.remove();
  try {
    const { data } = yield call(aboutApi.createCoordination, action.payload);
    yield put({ type: types.COORDINATION_SUCCESS, payload: data.item });
    toastr.success('"Coordination" created successfully');
  } catch (e) {
    const error = showErrorMessage(e);
    error.reverse().forEach((err) => toastr.error(err));
    yield put({ type: types.COORDINATION_FAILURE, error });
  }
}

export function* updateCoordination(action) {
  yield put({ type: types.COORDINATION_LOADING });
  toastr.remove();
  try {
    const { data } = yield call(aboutApi.updateCoordination, action.payload);
    yield put({ type: types.COORDINATION_SUCCESS, payload: data.item });
    toastr.success('"Coordination" updated successfully');
  } catch (e) {
    const error = showErrorMessage(e);
    error.reverse().forEach((err) => toastr.error(err));
    yield put({ type: types.COORDINATION_FAILURE, error });
  }
}

export function* getCoordination(action) {
  yield put({ type: types.COORDINATION_LOADING });
  try {
    const { data } = yield call(aboutApi.getCoordination, action);
    yield put({ type: types.COORDINATION_SUCCESS, payload: data.items[0] });
  } catch (e) {
    const error = showErrorMessage(e);
    error.reverse().forEach((err) => toastr.error(err));
    yield put({ type: types.COORDINATION_FAILURE, error });
  }
}

export function* createCoordinationWatcher() {
  yield takeLatest(types.CREATE_COORDINATION_REQUEST, createCoordination);
}

export function* updateCoordinationWatcher() {
  yield takeLatest(types.UPDATE_COORDINATION_REQUEST, updateCoordination);
}

export function* getCoordinationWatcher() {
  yield takeLatest(types.GET_COORDINATION_REQUEST, getCoordination);
}
