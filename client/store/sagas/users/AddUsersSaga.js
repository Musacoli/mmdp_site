import { takeLatest, put, call } from 'redux-saga/effects';
import { REGISTERING_USER, EDITING_USER } from '../../../constants/users';
import {
  registerUserSuccess,
  registrationStarted,
  registerUserFailure,
  editUserSuccess,
  userEditStarted,
  editUserFailure,
} from '.';
import { api } from '../../../utils/api';
import toastr from '../../../utils/toastr';

export function* registerUser({ payload }) {
  try {
    yield put(registrationStarted());
    const user = yield call(api.users.create, payload);
    const { data } = user;
    yield put(registerUserSuccess(data));
    toastr.success(data.message);
  } catch (error) {
    yield put(
      registerUserFailure(
        error.response
          ? error.response.data
          : {
              message: 'Something went wrong.',
            },
      ),
    );
    error.response
      ? toastr.error(error.response.data.message)
      : toastr.error('Something went wrong');
  }
}

export function* editUser({ payload }) {
  try {
    yield put(userEditStarted());
    const user = yield call(api.users.edit, payload);
    const { data } = user;
    yield put(editUserSuccess(data));
    toastr.success('Details successfully updated');
  } catch (e) {
    yield put(
      editUserFailure(
        e.response
          ? e.response.data
          : {
              message: 'Something went wrong.',
            },
      ),
    );
    e.response
      ? toastr.error(e.response.data.message)
      : toastr.error('Something went wrong');
  }
}

export function* watchRegistration() {
  yield takeLatest(REGISTERING_USER, registerUser);
}

export function* watchUserEdit() {
  yield takeLatest(EDITING_USER, editUser);
}
