import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import {
  ADD_DOCUMENT,
  FETCH_DOCUMENT,
  EDIT_DOCUMENT,
  FETCH_DOCUMENTS,
} from '../../../constants/resources/document';
import * as actions from '../../actions/resources/document';
import { api } from '../../../utils/api';

export function* fetchDocument({ payload }) {
  try {
    const response = yield call(api.resources.document.retrieve, payload.id);
    yield put(actions.fetchDocumentSuccess(response.data.data));
  } catch (err) {
    yield put(actions.fetchDocumentSuccess({}));
  }
}

export function* editDocument({ payload }) {
  try {
    const response = yield call(
      api.resources.document.update,
      payload.data,
      payload.id,
    );
    const message = response !== undefined ? response.data.message : {};
    toastr.success(message);
    yield put(actions.editDocumentSuccess({}));
  } catch (err) {
    let error;
    if (
      err.response &&
      (err.response.status === 400 ||
        err.response.data.status === 'Validation error')
    ) {
      const { error: errors } = err.response.data;
      const firstError = Object.keys(errors)[0];
      error = errors[firstError];
    } else {
      error = err.response ? err.response.data.message : err.message;
    }
    toastr.warning(error);
    yield put(actions.editDocumentFailure({ error }));
  }
}
export function* addDocument(action) {
  try {
    const response = yield call(api.resources.document.create, action.payload);
    const message = response !== undefined ? response.data.message : {};
    toastr.success(message);
    const status = response ? response.status : {};
    const res = { status };
    yield put(actions.addDocumentSuccessful({ payload: res }));
  } catch (err) {
    let error;
    if (
      err.response &&
      (err.response.status === 400 ||
        err.response.data.status === 'Validation error')
    ) {
      const { error: errors } = err.response.data;
      const firstError = Object.keys(errors)[0];
      error = errors[firstError];
    } else {
      error = err.response ? err.response.data.message : err.message;
    }
    toastr.warning(error);
    yield put(actions.addDocumentFailure({ error }));
  }
}

/** Fetch documents */
export function* fetchDocumentsAsync() {
  try {
    const response = yield call(api.resources.document.list);
    let data = response ? response.data.data.documents : {};
    data = { results: data };
    yield put(actions.fetchDocumentSuccess({ data, isFetching: false }));
  } catch (error) {
    yield put(actions.fetchDocumentFailure({}));
  }
}
/** WATCHERS */
export function* watchFetchDocuments() {
  yield takeEvery(FETCH_DOCUMENTS, fetchDocumentsAsync);
}

export function* watchAddDocument() {
  yield takeLatest(ADD_DOCUMENT, addDocument);
}

export function* watchFetchDocument() {
  yield takeLatest(FETCH_DOCUMENT, fetchDocument);
}

export function* watchEditDocument() {
  yield takeLatest(EDIT_DOCUMENT, editDocument);
}
