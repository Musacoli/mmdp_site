import { takeLatest, call, put } from 'redux-saga/effects';
import { api } from '../../../utils/events';
import toastr from '../../../utils/toastr';

function* deleteSaga(_id) {
  try {
    const response = yield call(api.delete, _id.payload);
    const item = { _id: _id.payload };
    yield put({ type: 'DELETE_EVENT_SUCCESS', response });
    yield put({ type: 'UPDATE_EVENTS_LIST', item });
  } catch (error) {
    yield put({ type: 'DELETE_EVENT_FAILURE', error });
    const errorMessage = error.response
      ? error.response.data.message || error.response
      : 'Network error';
    toastr.error(errorMessage);
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watcherDeleteEvent() {
  yield takeLatest('DELETE_EVENT_REQUEST', deleteSaga);
}
