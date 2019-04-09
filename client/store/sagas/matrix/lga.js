import { put, call, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import {
  ADD_STATE_SVG_FILE,
  FETCH_LGA_BOUNDARIES,
  UPDATE_LGA,
} from '../../../constants/matrix/lga';
import { LGAMap, getLGAs } from '../../../utils/matrix/lga';
import * as actions from '../../actions/matrix/lga';
import { api } from '../../../utils/api';

toastr.options = {
  positionClass: 'toast-top-center',
  preventDuplicates: true,
};

export function* addStateMatrix(action) {
  try {
    const response = yield call(LGAMap.update, action.payload);
    yield put(actions.addStateMatrixSuccessful(response.data));
    if (response.data.status === 'success') {
      toastr.success(response.data.message);
    }
  } catch (error) {
    let newError;
    yield put(actions.addStateMatrixFailure({}));
    if (error.response.data.error.files) {
      newError = error.response.data.error.files;
    } else {
      newError = error.response.data.message;
    }
    toastr.warning(newError);
  }
}

export function* getStateMaps(action) {
  try {
    const response = yield call(getLGAs, action.payload);
    const { data } = response;
    yield put(actions.getLGAMapSuccess(data));
  } catch (error) {
    yield put(actions.getLGAMapFailure({}));
    const errorMessage = error.response
      ? error.response.data.message
      : 'Error in retrieving LGA Maps';
    toastr.warning(errorMessage);
  }
}

export function* updateLGAMap(action) {
  const { id, data } = action.payload;
  try {
    const response = yield call(api.matrix.lga.update, id, data);
    let results;
    if (response.data) {
      results = response.data.data;
    }
    yield put(actions.updateLGAMatrixSuccess(results));
    const { lga: payload } = results;
    payload.page = data.page;
    yield put(actions.getLGAMapRequest(payload));
    toastr.success(response.data.message);
  } catch (error) {
    yield put(actions.updateLGAMatrixFailure({}));
    const message = error.response
      ? error.response.data.error
      : 'Error updating LGA ID';
    yield call(toastr.warning, message);
  }
}

/** WATCHERS */
export function* watchLGAMap() {
  yield takeLatest(FETCH_LGA_BOUNDARIES, getStateMaps);
}

export function* watchAddStateSVG() {
  yield takeLatest(ADD_STATE_SVG_FILE, addStateMatrix);
}

export function* watchUpdateLGAMapID() {
  yield takeLatest(UPDATE_LGA, updateLGAMap);
}
