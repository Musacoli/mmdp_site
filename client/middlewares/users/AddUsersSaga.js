import {
  takeEvery,
  takeLatest,
  put,
  call,
  all,
  fork
} from "redux-saga/effects";
import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTERING_USER,
  EDITING_USER,
} from "../../constants/users/";
import {
  registerUserSuccess,
  registrationStarted,
  registerUserFailure,
  editUserSuccess,
  userEditStarted,
  editUserFailure
} from "../../store/actions/users";
import { api } from "../../utils/api";

export function* registerUser({ payload }) {
  try {
    yield put(registrationStarted());
    const user = yield call(api.users.create, payload);
    const { data } = user;
    yield put(registerUserSuccess(data));
  } catch (error) {
    yield put(
      registerUserFailure(
        error.response
          ? error.response.data
          : {
              message: "Something went wrong."
            }
      )
    );
  }
}

export function* editUser({payload}) {
  try {
    yield put(userEditStarted());
    const user = yield call(api.users.edit, payload);
    const { data } = user;
    yield put(editUserSuccess(data));
  }
  catch (e) {
    yield put(
      editUserFailure(
        e.response
          ? e.response.data
          : {
            message: "Something went wrong."
          }
      )
    );
  }
}


export function* watchRegistration() {
  yield takeLatest(REGISTERING_USER, registerUser);
}

export function* watchUserEdit() {
  yield takeLatest(EDITING_USER, editUser);
}


