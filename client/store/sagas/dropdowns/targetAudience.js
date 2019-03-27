import { put, takeEvery, takeLatest, call } from 'redux-saga/effects';
import toastr from 'toastr';
import { api } from '../../../utils/api';
import {
  fetchTargetAudiences,
  targetAudiencesCreatedSuccessfully,
} from '../../actions/dropdowns/targetAudience';
import {
  FETCHING_TARGET_AUDIENCES,
  CREATE_TARGET_AUDIENCES_FAILURE,
  CREATE_TARGET_AUDIENCES,
  DELETE_TARGET_AUDIENCE,
  UPDATE_TARGET_AUDIENCES_FAILURE,
  UPDATE_TARGET_AUDIENCES,
} from '../../../constants/dropdowns/targetAudience';

export function* loadTargetAudiences() {
  const TargetAudiences = yield call(api.dropdowns.targetAudience.list);
  const { data } = TargetAudiences !== undefined ? TargetAudiences : {};
  yield put(fetchTargetAudiences(data));
}

export function* updateTargetAudiences({ payload }) {
  try {
    const TargetAudiences = yield call(
      api.dropdowns.targetAudience.update,
      payload,
    );
    const { data } = TargetAudiences !== undefined ? TargetAudiences : {};
    yield put(targetAudiencesCreatedSuccessfully(data));
    toastr.success(TargetAudiences.data.message);
  } catch (err) {
    yield put({
      type: UPDATE_TARGET_AUDIENCES_FAILURE,
      payload: { error: err.response.data.message },
    });
    const message = err.response.data.message;
    toastr.error(message);
  }
}

export function* createTargetAudiences({ payload }) {
  try {
    const TargetAudiences = yield call(
      api.dropdowns.targetAudience.create,
      payload,
    );
    const { data } = TargetAudiences !== undefined ? TargetAudiences : {};
    yield put(targetAudiencesCreatedSuccessfully(data));
    yield put({
      type: FETCHING_TARGET_AUDIENCES,
    });
    toastr.success(TargetAudiences.data.message);
  } catch (err) {
    yield put({
      type: CREATE_TARGET_AUDIENCES_FAILURE,
      payload: { error: err.response.data.message },
    });
    let message;
    if (err.response.data.error) {
      message = err.response.data.error.TargetAudience;
    } else {
      message = err.response.data.message;
    }
    toastr.error(message);
  }
}

export function* deleteTargetAudience({ payload }) {
  try {
    const { id } = payload;
    yield call(api.dropdowns.targetAudience.delete, id);
    yield put({
      type: FETCHING_TARGET_AUDIENCES,
    });
    toastr.success('Target Audience delete successful');
  } catch (err) {
    yield put({
      type: 'DELETE_TARGET_AUDIENCE_FAILURE',
      payload: { error: err.response.data.message },
    });
    const message = err.response.data.message;
    toastr.error(message);
  }
}

export function* watchFetchingTargetAudiences() {
  yield takeEvery(FETCHING_TARGET_AUDIENCES, loadTargetAudiences);
}

export function* watchCreateTargetAudiences() {
  yield takeLatest(CREATE_TARGET_AUDIENCES, createTargetAudiences);
}

export function* watchUpdateTargetAudiences() {
  yield takeLatest(UPDATE_TARGET_AUDIENCES, updateTargetAudiences);
}

export function* watchDeleteTargetAudience() {
  yield takeLatest(DELETE_TARGET_AUDIENCE, deleteTargetAudience);
}
