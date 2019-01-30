import { call, put, takeLatest } from 'redux-saga/effects';
import toastr from '../../../utils/toastr';
import * as aboutApi from '../../../utils/about';
import * as types from '../../../constants/about';
import showErrorMessage from './showErrorMessage';

export function* createGovernorMessage(action) {
  yield put({ type: types.GOVERNOR_MESSAGE_LOADING });
  toastr.remove();
  try {
    const { data } = yield call(aboutApi.createGovernorMessage, action.payload);
    yield put({ type: types.GOVERNOR_MESSAGE_SUCCESS, payload: data.item });
    toastr.success('"Governor Message" created successfully');
  } catch (e) {
    const error = showErrorMessage(e);
    error.reverse().forEach((err) => toastr.error(err));
    yield put({ type: types.GOVERNOR_MESSAGE_FAILURE, error });
  }
}

export function* updateGovernorMessage(action) {
  yield put({ type: types.GOVERNOR_MESSAGE_LOADING });
  toastr.remove();
  try {
    const { data } = yield call(aboutApi.updateGovernorMessage, action.payload);
    yield put({ type: types.GOVERNOR_MESSAGE_SUCCESS, payload: data.item });
    toastr.success('"Governor Message" updated successfully');
  } catch (e) {
    const error = showErrorMessage(e);
    error.reverse().forEach((err) => toastr.error(err));
    yield put({ type: types.GOVERNOR_MESSAGE_FAILURE, error });
  }
}

export function* getGovernorMessage(action) {
  yield put({ type: types.GOVERNOR_MESSAGE_LOADING });
  try {
    const { data } = yield call(aboutApi.getGovernorMessage, action);
    yield put({ type: types.GOVERNOR_MESSAGE_SUCCESS, payload: data.items[0] });
  } catch (e) {
    const error = showErrorMessage(e);
    error.reverse().forEach((err) => toastr.error(err));
    yield put({ type: types.GOVERNOR_MESSAGE_FAILURE, error });
  }
}

export function* createGovernorMessageWatcher() {
  yield takeLatest(
    types.CREATE_GOVERNOR_MESSAGE_REQUEST,
    createGovernorMessage,
  );
}

export function* updateGovernorMessageWatcher() {
  yield takeLatest(
    types.UPDATE_GOVERNOR_MESSAGE_REQUEST,
    updateGovernorMessage,
  );
}

export function* getGovernorMessageWatcher() {
  yield takeLatest(types.GET_GOVERNOR_MESSAGE_REQUEST, getGovernorMessage);
}
