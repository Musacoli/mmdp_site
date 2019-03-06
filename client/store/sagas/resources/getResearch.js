import { put, call, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import {
  GET_USER_RESEARCH,
  DELETE_USER_RESEARCH,
  ARCHIVE_USER_RESEARCH,
} from '../../../constants/resources/research';
import {
  getResearchSuccess,
  getResearchFailure,
  deleteResearchSuccess,
  deleteResearchFailure,
  archiveResearchSuccess,
  archiveResearchFailure,
} from '../../actions/resources/getResearch';
import { research } from '../../../utils/resources/research';

toastr.options = {
  positionClass: 'toast-top-center',
  preventDuplicates: true,
};
export function* getUserResearch(action) {
  try {
    const response = yield call(research.getAll, action.payload);
    yield put(getResearchSuccess(response.data));
  } catch (error) {
    toastr.warning(error.response.data.message);
    yield put(getResearchFailure(error.response.data));
  }
}

export function* getUserResearchWatcher() {
  yield takeLatest(GET_USER_RESEARCH, getUserResearch);
}

export function* deleteUserResearch(action) {
  try {
    const id = action.payload;
    yield call(research.delete, id);
    yield put(deleteResearchSuccess(id));
  } catch (error) {
    toastr.warning(error.response.data.message);
    yield put(deleteResearchFailure(error.response.data));
  }
}

export function* deleteUserResearchWatcher() {
  yield takeLatest(DELETE_USER_RESEARCH, deleteUserResearch);
}
export function* archiveUserResearch(action) {
  try {
    const { _id, data } = action.payload;

    yield call(research.update, data, _id);
    yield put(archiveResearchSuccess(action.payload));
  } catch (error) {
    toastr.warning(error.response.data.message);
    yield put(archiveResearchFailure(error.response.data));
  }
}

export function* archiveUserResearchWatcher() {
  yield takeLatest(ARCHIVE_USER_RESEARCH, archiveUserResearch);
}
