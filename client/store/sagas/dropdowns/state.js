import { call, put, takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import { api } from '../../../utils/api';
import { ADD_STATES, FETCH_STATES, DELETE_STATE } from '../../../constants';
import * as actions from '../../actions/dropdowns/state';

toastr.options = {
  preventDuplicates: true,
};

export function* addStatesAsync({ payload }) {
  try {
    const data = payload ? payload.data : {};
    const create = payload ? payload.new : {};
    let response;
    if (create) {
      response = yield call(api.dropdowns.state.create, data);
    } else {
      response = yield call(api.dropdowns.state.update, data);
    }
    yield put(actions.addStatesSuccess());
    yield put(actions.fetchStates());
    const message = response
      ? response.data.message
      : 'State added successfully';
    toastr.success(message);
  } catch (error) {
    yield put(actions.addStatesFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error adding states';
    toastr.warning(message);
  }
}

export function* fetchStatesAsync() {
  try {
    const response = yield call(api.dropdowns.state.list);
    const data = response ? response.data.data : {};
    yield put(actions.fetchStatesSuccess(data));
  } catch (error) {
    yield put(actions.fetchStatesFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error listing states';
    toastr.warning(message);
  }
}

export function* deleteStatesAsync({ payload }) {
  try {
    const response = yield call(api.dropdowns.state.delete, payload.id);
    const data = response ? response.data : {};
    yield put(actions.deleteStateSuccess(data));
    yield put(actions.fetchStates({}));
    const message = response
      ? response.data.message
      : 'State deleted successfully';
    toastr.success(message);
  } catch (error) {
    yield put(actions.deleteStateFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error deleting states';
    toastr.warning(message);
  }
}

/** WATCHERS */
export function* watchAddStates() {
  yield takeEvery(ADD_STATES, addStatesAsync);
}

export function* watchFetchStates() {
  yield takeEvery(FETCH_STATES, fetchStatesAsync);
}

export function* watchDeleteStates() {
  yield takeEvery(DELETE_STATE, deleteStatesAsync);
}
