import { put, takeEvery, takeLatest, call } from 'redux-saga/effects';
import { api } from '../../../utils/api';
import {
  fetchStaffStrengths,
  staffStrengthsCreatedSuccessfully,
} from '../../actions/dropdowns/staffStrength';
import {
  FETCHING_STAFF_STRENGTHS,
  CREATE_STAFF_STRENGTHS_FAILURE,
  CREATE_STAFF_STRENGTHS,
  DELETE_STAFF_STRENGTH,
  UPDATE_STAFF_STRENGTHS_FAILURE,
  UPDATE_STAFF_STRENGTHS,
} from '../../../constants/dropdowns/staffStrength';

export function* loadStaffStrengths() {
  const staffStrengths = yield call(api.dropdowns.staffStrength.list);
  const { data } = staffStrengths !== undefined ? staffStrengths : {};
  yield put(fetchStaffStrengths(data));
}

export function* updateStaffStrengths({ payload }) {
  try {
    const staffStrengths = yield call(
      api.dropdowns.staffStrength.update,
      payload,
    );
    const { data } = staffStrengths !== undefined ? staffStrengths : {};
    yield put(staffStrengthsCreatedSuccessfully(data));
  } catch (err) {
    yield put({
      type: UPDATE_STAFF_STRENGTHS_FAILURE,
      payload: { error: err.response.data.message },
    });
  }
}

export function* createStaffStrengths({ payload }) {
  try {
    const staffStrengths = yield call(
      api.dropdowns.staffStrength.create,
      payload,
    );
    const { data } = staffStrengths !== undefined ? staffStrengths : {};
    yield put(staffStrengthsCreatedSuccessfully(data));
  } catch (err) {
    yield put({
      type: CREATE_STAFF_STRENGTHS_FAILURE,
      payload: { error: err.response.data.message },
    });
  }
}

export function* deleteStaffStrength({ payload }) {
  try {
    const { id } = payload;
    yield call(api.dropdowns.staffStrength.delete, id);
    yield put({
      type: FETCHING_STAFF_STRENGTHS,
    });
  } catch (err) {
    yield put({
      type: 'DELETE_STAFF_STRENGTH_FAILURE',
      payload: { error: err.response.data.message },
    });
  }
}

export function* watchFetchingStaffStrengths() {
  yield takeEvery(FETCHING_STAFF_STRENGTHS, loadStaffStrengths);
}

export function* watchCreateStaffStrengths() {
  yield takeLatest(CREATE_STAFF_STRENGTHS, createStaffStrengths);
}

export function* watchUpdateStaffStrengths() {
  yield takeLatest(UPDATE_STAFF_STRENGTHS, updateStaffStrengths);
}

export function* watchDeleteStaffStrength() {
  yield takeLatest(DELETE_STAFF_STRENGTH, deleteStaffStrength);
}
