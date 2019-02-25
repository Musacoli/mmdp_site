import { put, call, takeLatest } from 'redux-saga/effects';
import { api } from '../../../utils/api';
import { DELETE } from '../../../constants/resources/document';
import toaster from '../../../utils/toastr';

import {
  deleteSuccess,
  deleteFailed,
  fetchDocuments,
} from '../../actions/resources/document';

export function* deleteDoc({ payload }) {
  try {
    const resp = yield call(api.resources.document.delete, payload);
    const { data } = resp;
    yield put(deleteSuccess(data));
    toaster.success(data.message);
    yield put(fetchDocuments());
  } catch (error) {
    yield put(
      deleteFailed(
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

export function* watchDelete() {
  yield takeLatest(DELETE, deleteDoc);
}
