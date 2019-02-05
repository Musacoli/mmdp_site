import toastr from '../../../utils/toastr';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as aboutApi from '../../../api/about';
import * as types from '../../../constants/about';



export function* createGovernorMessage (action){
  yield put({ type: types.GOVERNOR_MESSAGE_LOADING });
  toastr.remove();
  try {
    const { data } = yield call(aboutApi.createGovernorMessage, action.payload);
    yield put({ type: types.GOVERNOR_MESSAGE_SUCCESS, payload:data.item });
    toastr.success('"Governor Message" created successfully');
  } catch(error) {
    yield put({ type: types.GOVERNOR_MESSAGE_FAILURE, error: error.response.data.errors });
    toastr.error(error.response.data.errors.join('\\n'));
  }
}

export function* updateGovernorMessage (action){
  yield put({ type: types.GOVERNOR_MESSAGE_LOADING });
  toastr.remove();
  try {
    const { data } = yield call(aboutApi.updateGovernorMessage, action.payload);
    yield put({ type: types.GOVERNOR_MESSAGE_SUCCESS, payload:data.item });
    toastr.success('"Governor Message" updated successfully');
  } catch(error) {
    yield put({ type: types.GOVERNOR_MESSAGE_FAILURE, error: error.response.data.errors });
    toastr.error(error.response.data.errors.join('\\n'));
  }
}

export function* getGovernorMessage (action){
  yield put({ type: types.GOVERNOR_MESSAGE_LOADING });
  try {
    const { data } = yield call(aboutApi.getGovernorMessage, action);
    yield put({ type: types.GOVERNOR_MESSAGE_SUCCESS, payload:data.items[0] });
  } catch(error) {
    yield put({ type: types.GOVERNOR_MESSAGE_FAILURE, error: error.response.data.errors });
  }
}

export function* createGovernorMessageWatcher() {
  yield takeLatest(types.CREATE_GOVERNOR_MESSAGE_REQUEST, createGovernorMessage);
}

export function* updateGovernorMessageWatcher() {
  yield takeLatest(types.UPDATE_GOVERNOR_MESSAGE_REQUEST, updateGovernorMessage);
}

export function* getGovernorMessageWatcher() {
  yield takeLatest(types.GET_GOVERNOR_MESSAGE_REQUEST, getGovernorMessage);
}

