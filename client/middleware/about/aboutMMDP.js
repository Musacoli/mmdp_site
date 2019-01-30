import toastr from '../../utils/toastr';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as aboutApi from '../../api/about';
import * as types from '../../constants/about';



export function* createAboutMMDP (action){
  yield put({ type: types.ABOUT_MMDP_LOADING });
  toastr.remove();
  try {
    const { data } = yield call(aboutApi.createAboutMMDP, action.payload);
    yield put({ type: types.ABOUT_MMDP_SUCCESS, payload:data.item });
    toastr.success('"About MMDP" created successfully');
  } catch(error) {
    yield put({ type: types.ABOUT_MMDP_FAILURE, error: error.response.data.errors });
    error.reverse().forEach(err => toastr.error(err));
  }
}

export function* updateAboutMMDP (action){
  yield put({ type: types.ABOUT_MMDP_LOADING });
  toastr.remove();
  try {
    const { data } = yield call(aboutApi.updateAboutMMDP, action.payload);
    yield put({ type: types.ABOUT_MMDP_SUCCESS, payload:data.item });
    toastr.success('"About MMDP" updated successfully');
  } catch(error) {
    yield put({ type: types.ABOUT_MMDP_FAILURE, error: error.response.data.errors });
    error.reverse().forEach(err => toastr.error(err));
  }
}

export function* getAboutMMDP (action){
  yield put({ type: types.ABOUT_MMDP_LOADING });
  try {
    const { data } = yield call(aboutApi.getAboutMMDP, action);
    yield put({ type: types.ABOUT_MMDP_SUCCESS, payload:data.items[0] });
  } catch(error) {
    yield put({ type: types.ABOUT_MMDP_FAILURE, error: error.response.data.errors });
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

