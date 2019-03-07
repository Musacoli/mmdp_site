import { put, call, takeLatest } from 'redux-saga/effects';
import { api } from '../../../utils/api';
import { ARCHIVE } from '../../../constants/resources/document';

import {
  archiveFailed,
  archiveSuccess,
  fetchDocuments,
} from '../../actions/resources/document';
import toaster from '../../../utils/toastr';

export function* archiver({ payload }) {
  try {
    const resp = yield call(api.resources.document.archive, payload);
    const { data } = resp;
    yield put(archiveSuccess(data));
    yield put(fetchDocuments());
  } catch (error) {
    yield put(
      archiveFailed(
        error.response
          ? error.response.data
          : {
              message: 'Something went wrong.',
            },
      ),
    );
    error.response
      ? toaster.error(error.response.data.message)
      : toaster.error('Something went wrong.');
  }
}

export function* watchArchive() {
  yield takeLatest(ARCHIVE, archiver);
}
