import { call, takeLatest, put } from "redux-saga/effects";

import { FETCHING, REGISTERING_USER } from "../../constants/users";
import {
  FetchingComplete,
  fetchingUsers,
  fetchingError
} from "../../store/actions/users";
import { api } from "../../utils/api";

export function* loadUsers() {
  try {
    yield put(fetchingUsers());
    const usersList = yield call(api.users.list);
    const { data: {users} } = usersList;
    yield put(FetchingComplete(users));
  } catch (error) {
    yield put(
      fetchingError(
        error.response
          ? error.response.data
          : {
              message: "Something went wrong."
            }
      )
    );
  }
}
export function* watchFetchingUsers() {
  yield takeLatest(FETCHING, loadUsers);
}
