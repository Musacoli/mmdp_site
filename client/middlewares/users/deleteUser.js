import { call, takeLatest, put } from "redux-saga/effects";
import { DELETE_USER } from "../../constants/users";
import { api } from "../../utils/api";
import {
  deletingStarted,
  deletingSuccess,
  deletingFailed
} from "../../store/actions/users";
import {FETCHING} from "../../constants/users";

export function* deleteUser({ payload, history }) {
  yield put(deletingStarted());
  try {
    const user = yield call(api.users.delete, payload);
    const { data } = user;
    yield put(deletingSuccess(data));
    yield put({
      type: FETCHING
    })
  } catch (error) {
    yield put(
      deletingFailed(
        error.response
          ? error.response.data
          : {
              message: "Something went wrong."
            }
      )
    );
  }
}

export function* watchDeleteUser() {
  yield takeLatest(DELETE_USER, deleteUser);
}
