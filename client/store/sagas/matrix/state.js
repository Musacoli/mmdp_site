import { call, put, takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import { api } from '../../../utils/api';
import {
  ADD_STATE_MAP,
  FETCH_STATE_MAP,
  UPDATE_STATE_MAP,
} from '../../../constants';
import * as actions from '../../actions/matrix/state';
import { getStates } from '../../../utils/matrix/state';

export function* addStateMapAsync(action) {
  try {
    const response = yield call(api.matrix.state.create, action.payload);
    let data;
    if (response.data) {
      data = response.data.data;
    }
    yield put(actions.addStateMapSuccess(data));
    toastr.success(response.data.message);
  } catch (error) {
    yield put(actions.addSateMapFailure({}));
    const message = error.response
      ? error.response.data.error
      : 'Error adding state maps';
    yield call(toastr.warning, message);
  }
}
export function* updateStateMapAsync(action) {
  const { id, data } = action.payload;
  try {
    const response = yield call(api.matrix.state.update, id, data);
    let results;
    if (response.data) {
      results = response.data.data;
    }
    yield put(actions.updateStateMapSuccess(results));
    const { state: payload } = results;
    payload.page = data.page;
    yield put(actions.fetchStateMap(payload));
    toastr.success(response.data.message);
  } catch (error) {
    yield put(actions.updateSateMapFailure({}));
    const message = error.response
      ? error.response.data.error
      : 'Error updating state map';
    yield call(toastr.warning, message);
  }
}
export function* fetchSateMapAsync(action) {
  try {
    const response = yield call(getStates, action.payload);
    let data;
    if (response.data) {
      data = response.data || [];
    }
    yield put(actions.fetchStateMapSuccess({ data }));
  } catch (error) {
    yield put(actions.fetchStateMapFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error listing maps';
    toastr.warning(message);
  }
}
/** WATCHERS */
export function* watchAddStateMap() {
  yield takeEvery(ADD_STATE_MAP, addStateMapAsync);
}
export function* watchFetchStateMap() {
  yield takeEvery(FETCH_STATE_MAP, fetchSateMapAsync);
}
export function* watchUpdateStateMap() {
  yield takeEvery(UPDATE_STATE_MAP, updateStateMapAsync);
}
