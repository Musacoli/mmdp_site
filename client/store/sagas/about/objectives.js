import { call, put, takeLatest } from 'redux-saga/effects';
import toastr from '../../../utils/toastr';
import * as aboutApi from '../../../utils/about';
import * as types from '../../../constants/about';


export function* createObjectives(action) {
  yield put({ type: types.OBJECTIVES_LOADING });
  toastr.remove();
  try {
    const { data } = yield call(aboutApi.createObjectives, action.payload);
    yield put({ type: types.OBJECTIVES_SUCCESS, payload: data.item });
    toastr.success('"Objectives" created successfully');
  } catch (error) {
    yield put({ type: types.OBJECTIVES_FAILURE, error: error.response.data.errors });
    error.reverse().forEach(err => toastr.error(err));
  }
}

export function* updateObjectives(action) {
  yield put({ type: types.OBJECTIVES_LOADING });
  toastr.remove();
  try {
    const { data } = yield call(aboutApi.updateObjectives, action.payload);
    yield put({ type: types.OBJECTIVES_SUCCESS, payload: data.item });
    toastr.success('"Objectives" updated successfully');
  } catch (error) {
    yield put({ type: types.OBJECTIVES_FAILURE, error: error.response.data.errors });
    error.reverse().forEach(err => toastr.error(err));
  }
}

export function* getObjectives(action) {
  yield put({ type: types.OBJECTIVES_LOADING });
  try {
    const { data } = yield call(aboutApi.getObjectives, action);
    yield put({ type: types.OBJECTIVES_SUCCESS, payload: data.items[0] });
  } catch (error) {
    yield put({ type: types.OBJECTIVES_FAILURE, error: error.response.data.errors });
  }
}

export function* createObjectivesWatcher() {
  yield takeLatest(types.CREATE_OBJECTIVES_REQUEST, createObjectives);
}

export function* updateObjectivesWatcher() {
  yield takeLatest(types.UPDATE_OBJECTIVES_REQUEST, updateObjectives);
}

export function* getObjectivesWatcher() {
  yield takeLatest(types.GET_OBJECTIVES_REQUEST, getObjectives);
}
