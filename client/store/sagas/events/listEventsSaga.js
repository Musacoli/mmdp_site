import { takeLatest, call, put } from 'redux-saga/effects';
import toastr from '../../../utils/toastr';
import { api } from '../../../utils/events';

function* workerSaga({ payload }) {
  try {
    const response = yield call(api.list, payload);
    const events = response.data;
    yield put({ type: 'LIST_EVENTS_SUCCESS', events });
  } catch (error) {
    yield put({ type: 'LIST_EVENTS_FAILURE', error });
    const errorMessage = error.response
      ? error.response.data.message || error.response
      : 'Network error';
    toastr.error(errorMessage);
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watcherListEvent() {
  yield takeLatest('LIST_EVENTS_REQUEST', workerSaga);
}
