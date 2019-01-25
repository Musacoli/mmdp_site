import { put, takeEvery, all, fork } from "redux-saga/effects";
import { delay } from "redux-saga";
import { watchRegistration, watchUserEdit } from "./users/AddUsersSaga";
import { watchFetchingUsers } from "./users/fetchUsers";
import { LOGIN, LOGIN_SUCCESS } from "../constants/auth";

export function* loginAsync() {
  yield delay(1000);
  yield put({ type: LOGIN_SUCCESS, payload: { msg: 1 } });
}

export function* wathIncrement() {
  yield takeEvery(LOGIN, loginAsync);
}

export default function* root() {
  yield all([
    fork(wathIncrement),
    fork(watchRegistration),
    fork(watchFetchingUsers),
    fork(watchUserEdit)
  ]);
}
