import { put, call, takeLatest } from 'redux-saga/effects';
import { DELETE_MEDIA } from '../../../constants/resources/media';
import {
  deleteMediaSuccess,
  deleteMediaFailure,
} from '../../actions/resources/media';
import { fetchDocuments } from '../../actions/resources/document';
import { api } from '../../../utils/api';

export function* deleteMediaAsync({ payload }) {
  try {
    yield call(api.resources.media.delete, payload._id);
    yield put(deleteMediaSuccess({}));
    yield put(fetchDocuments({ mediaType: 'media' }));
  } catch (error) {
    yield put(deleteMediaFailure({}));
  }
}

/** WATCHERS */
export function* watchDeleteMedia() {
  yield takeLatest(DELETE_MEDIA, deleteMediaAsync);
}
