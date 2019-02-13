import { put, takeEvery, call } from 'redux-saga/effects';
import { api } from '../../../utils/api';
import { FETCH_DOCUMENTS } from '../../../constants/resources/document';
import {
  fetchDocumentFailure,
  fetchDocumentSuccess,
} from '../../actions/resources/document';

/** Fetch documents */
export function* fetchDocumentsAsync() {
  try {
    const documents = yield call(api.resources.documents.list);
    const data = { results: documents.data.data.documents };
    yield put(fetchDocumentSuccess({ data, isFetching: false }));
  } catch (error) {
    yield put(fetchDocumentFailure({}));
  }
}
/** WATCHERS */
export function* watchFetchDocuments() {
  yield takeEvery(FETCH_DOCUMENTS, fetchDocumentsAsync);
}
