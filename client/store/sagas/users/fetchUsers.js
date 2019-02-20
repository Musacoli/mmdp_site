import { call, takeLatest, put } from 'redux-saga/effects';

import { FETCHING } from '../../../constants/users';
import { FetchingComplete, fetchingUsers, fetchingError } from '.';
import { api } from '../../../utils/api';

export function* loadUsers({ payload }) {
  try {
    yield put(fetchingUsers());
    const usersList = yield call(api.users.list, payload);
    const { data } = usersList;
    yield put(FetchingComplete(data));
  } catch (error) {
    yield put(
      fetchingError(
        error.response
          ? error.response.data
          : {
              message: 'Something went wrong.',
            },
      ),
    );
  }
}
export function* watchFetchingUsers() {
  yield takeLatest(FETCHING, loadUsers);
}
