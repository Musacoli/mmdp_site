import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from '../../../utils/dropdowns/LGA';
import {
  ADD_LGA_REQUEST,
  GET_LGA_REQUEST,
  DELETE_LGA_REQUEST,
  UPDATE_LGA_REQUEST,
} from '../../../constants/dropdowns/LGA';
import {
  getLGARequest,
  getLGASuccess,
  getLGAFailure,
  updateLGAFailure,
  updateLGASuccess,
  deleteLGAFailure,
  deleteLGASuccess,
  addLGAFailure,
  addLGASuccess,
} from '../../actions/dropdowns/LGA';
import toastr from '../../../utils/toastr';

toastr.options = {
  preventDuplicates: true,
};

export function* addLGAs({ payload }) {
  try {
    const response = yield call(api.create, payload);
    yield put(addLGASuccess(response.data));
    yield put(getLGARequest());
    toastr.success(response.data.message);
  } catch (error) {
    yield put(addLGAFailure(error.response));
    const message = error.response
      ? error.response.data.message
      : 'An Error Occured Trying Again Later';
    toastr.error(message);
  }
}

export function* updateLGAs({ payload }) {
  try {
    const response = yield call(api.edit, payload);
    yield put(updateLGASuccess(response.data));
    yield put(getLGARequest());
    toastr.success(response.data.message);
  } catch (error) {
    yield put(updateLGAFailure(error.response));
    const message = error.response
      ? error.response.data.message
      : 'An Error Occured Trying Again Later';
    toastr.error(message);
  }
}

export function* getAllLGAs() {
  try {
    const response = yield call(api.list);
    yield put(getLGASuccess(response.data.data));
  } catch (error) {
    yield put(getLGAFailure(error.response));
    const message = error.response
      ? error.response.data.message
      : 'An Error Occured Trying Again Later';
    toastr.error(message);
  }
}

export function* deleteLGAs({ payload }) {
  try {
    const response = yield call(api.delete, payload.id);
    yield put(deleteLGASuccess(response.data));
    yield put(getLGARequest());
    toastr.success(response.data.message);
  } catch (error) {
    yield put(deleteLGAFailure(error.response));
    const message = error.response
      ? error.response.data.message
      : 'An Error Occured Trying Again Later';
    toastr.error(message);
  }
}

/** WATCHERS */
export function* deleteLGAwatcher() {
  yield takeEvery(DELETE_LGA_REQUEST, deleteLGAs);
}

export function* addLGAWatcher() {
  yield takeEvery(ADD_LGA_REQUEST, addLGAs);
}

export function* updateLGAWatcher() {
  yield takeEvery(UPDATE_LGA_REQUEST, updateLGAs);
}
export function* getAllwatcher() {
  yield takeEvery(GET_LGA_REQUEST, getAllLGAs);
}
