import { call, takeLatest, put } from 'redux-saga/effects';

import { FETCHING_ONE, FETCH_USER_BY_TOKEN } from '../../../constants/users';
import { FetchingOneComplete, fetchingOneError } from '.';
import { api } from '../../../utils/api';
import userApi from '../../../utils/users/api';

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

export function* fetchUserByToken() {
  try {
    const data = yield call(userApi.get);
    const { user } = data;
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

export function* watchFetchingUserByToken() {
  yield takeLatest(FETCH_USER_BY_TOKEN, fetchUserByToken);
}
