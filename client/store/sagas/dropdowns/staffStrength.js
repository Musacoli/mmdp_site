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
} from '../../../constants/staffStrength';

export function* loadStaffStrengths() {
  const staffStrengths = yield call(
    api.stakeholdersDirectory.staffStrength.list,
  );
  const { data } = staffStrengths !== undefined ? staffStrengths : {};
  yield put(fetchStaffStrengths(data));
}

export function* createStaffStrengths({ payload }) {
  try {
    const staffStrengths = yield call(
      api.stakeholdersDirectory.staffStrength.create,
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
    const { _id } = payload;
    yield call(api.stakeholdersDirectory.staffStrength.delete, _id);
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

export function* watchDeleteStaffStrength() {
  yield takeLatest(DELETE_STAFF_STRENGTH, deleteStaffStrength);
}
