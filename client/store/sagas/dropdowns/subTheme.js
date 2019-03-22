import { call, put, takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import { api } from '../../../utils/api';
import {
  ADD_SUBTHEMES,
  FETCH_SUBTHEMES,
  DELETE_SUBTHEME,
} from '../../../constants/dropdowns/subTheme';
import * as actions from '../../actions/dropdowns/subTheme';

toastr.options = {
  preventDuplicates: true,
};

export function* addSubThemesAsync({ payload }) {
  try {
    const data = payload ? payload.data : {};
    const create = payload ? payload.new : {};
    let response;
    if (create) {
      response = yield call(api.dropdowns.subTheme.create, data);
    } else {
      response = yield call(api.dropdowns.subTheme.update, data);
    }
    yield put(actions.addSubThemesSuccess());
    yield put(actions.fetchSubThemes());
    const message = response
      ? response.data.message
      : 'Sub theme added successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.addSubThemesFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error adding sub themes';
    yield call(toastr.warning, message);
  }
}

export function* fetchSubThemesAsync() {
  try {
    const response = yield call(api.dropdowns.subTheme.list);
    const data = response ? response.data.data : {};
    yield put(actions.fetchSubThemesSuccess(data));
  } catch (error) {
    yield put(actions.fetchSubThemesFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error listing sub themes';
    yield call(toastr.warning, message);
  }
}

export function* deleteSubThemesAsync({ payload }) {
  try {
    const response = yield call(api.dropdowns.subTheme.delete, payload.id);
    const data = response ? response.data : {};
    yield put(actions.deleteSubThemeSuccess(data));
    yield put(actions.fetchSubThemes({}));
    const message = response
      ? response.data.message
      : 'Subtheme deleted successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.deleteSubTheme({}));
    const message = error.response
      ? error.response.data.message
      : 'Error deleting sub themes';
    yield call(toastr.warning, message);
  }
}

/** WATCHERS */
export function* watchAddSubThemes() {
  yield takeEvery(ADD_SUBTHEMES, addSubThemesAsync);
}

export function* watchFetchSubThemes() {
  yield takeEvery(FETCH_SUBTHEMES, fetchSubThemesAsync);
}

export function* watchDeleteSubThemes() {
  yield takeEvery(DELETE_SUBTHEME, deleteSubThemesAsync);
}
