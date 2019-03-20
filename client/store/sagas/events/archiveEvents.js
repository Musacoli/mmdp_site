import { put, call, takeLatest } from 'redux-saga/effects';
import { api } from '../../../utils/events';
import { ARCHIVE_EVENT } from '../../../constants/events';

import {
  archiveFailed,
  archiveSuccess,
  listEvents,
} from '../../actions/events/event';
import toaster from '../../../utils/toastr';

export function* archiver({ payload }) {
  try {
    const resp = yield call(api.archive, payload);
    const { data } = resp;
    yield put(archiveSuccess(data));
    yield put(listEvents({ page: 1, search: '' }));
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

export function* archiveEventWatcher() {
  yield takeLatest(ARCHIVE_EVENT, archiver);
}
