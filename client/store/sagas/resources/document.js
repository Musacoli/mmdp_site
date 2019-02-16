import { put, call, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import { ADD_DOCUMENT } from '../../../constants';
import * as actions from '../../actions/resources/document';
import { api } from '../../../utils/api';

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

export function* watchAddDocument() {
  yield takeLatest(ADD_DOCUMENT, addDocument);
}
