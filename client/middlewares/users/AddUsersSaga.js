import {
  takeLatest,
  put,
  call,
} from "redux-saga/effects";
import {
  REGISTERING_USER
} from "../../constants/users/";
import {
  registerUserSuccess,
  registrationStarted,
  registerUserFailure
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

export function* watchRegistration() {
  yield takeLatest(REGISTERING_USER, registerUser);
}
