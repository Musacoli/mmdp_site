import { call, put, takeLatest } from 'redux-saga/effects';
import toastr from '../../../utils/toastr';
import * as aboutApi from '../../../utils/about';
import * as types from '../../../constants/about';
import showErrorMessage from './showErrorMessage';

export function* createAboutMMDP(action) {
  yield put({ type: types.ABOUT_MMDP_LOADING });
  toastr.remove();
  try {
    const { data } = yield call(aboutApi.createAboutMMDP, action.payload);
    yield put({ type: types.ABOUT_MMDP_SUCCESS, payload: data.item });
    toastr.success('"About MMDP" created successfully');
  } catch (e) {
    const error = showErrorMessage(e);
    error.reverse().forEach((err) => toastr.error(err));
    yield put({ type: types.ABOUT_MMDP_FAILURE, error });
  }
}

export function* updateAboutMMDP(action) {
  yield put({ type: types.ABOUT_MMDP_LOADING });
  toastr.remove();
  try {
    const { data } = yield call(aboutApi.updateAboutMMDP, action.payload);
    yield put({ type: types.ABOUT_MMDP_SUCCESS, payload: data.item });
    toastr.success('"About MMDP" updated successfully');
  } catch (e) {
    const error = showErrorMessage(e);
    error.reverse().forEach((err) => toastr.error(err));
    yield put({ type: types.ABOUT_MMDP_FAILURE, error });
  }
}

export function* getAboutMMDP(action) {
  yield put({ type: types.ABOUT_MMDP_LOADING });
  try {
    const { data } = yield call(aboutApi.getAboutMMDP, action);
    yield put({ type: types.ABOUT_MMDP_SUCCESS, payload: data.items[0] });
  } catch (e) {
    const error = showErrorMessage(e);
    error.reverse().forEach((err) => toastr.error(err));
    yield put({ type: types.ABOUT_MMDP_FAILURE, error });
  }
}

export function* createAboutMMDPWatcher() {
  yield takeLatest(types.CREATE_ABOUT_MMDP_REQUEST, createAboutMMDP);
}

export function* updateAboutMMDPWatcher() {
  yield takeLatest(types.UPDATE_ABOUT_MMDP_REQUEST, updateAboutMMDP);
}

export function* getAboutMMDPWatcher() {
  yield takeLatest(types.GET_ABOUT_MMDP_REQUEST, getAboutMMDP);
}
