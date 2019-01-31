import { call, takeLatest, put } from 'redux-saga/effects';

import { FETCHING_ONE } from '../../../constants/users';
import { FetchingOneComplete, fetchingOneError } from '.';
import { api } from '../../../utils/api';

export function* loadOneUser({ payload }) {
  try {
    const singleUser = yield call(api.users.getOne, payload);
    const {
      data: { user },
    } = singleUser;
    yield put(FetchingOneComplete(user));
  } catch (error) {
    yield put(
      fetchingOneError(
        error.response
          ? error.response.data
          : {
              message: 'Something went wrong.',
            },
      ),
    );
  }
}
export function* watchFetchingOneUser() {
  yield takeLatest(FETCHING_ONE, loadOneUser);
}
