import { call, takeLatest, put } from 'redux-saga/effects';
import { DELETE_USER } from '../../../constants/users';
import { api } from '../../../utils/api';
import {
  deletingStarted,
  deletingSuccess,
  deletingFailed,
  fetchingStarted,
} from '.';

export function* deleteUser({ payload }) {
  yield put(deletingStarted());
  try {
    const user = yield call(api.users.delete, payload);
    const { data } = user;
    yield put(deletingSuccess(data));
    yield put(fetchingStarted());
  } catch (error) {
    yield put(
      deletingFailed(
        error.response
          ? error.response.data
          : {
              message: 'Something went wrong.',
            },
      ),
    );
  }
}

export function* watchDeleteUser() {
  yield takeLatest(DELETE_USER, deleteUser);
}
