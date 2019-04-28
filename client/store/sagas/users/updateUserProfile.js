import { call, takeLatest, put } from 'redux-saga/effects';
import { UPDATE_USER_PROFILE } from '../../../constants/users';
import { updateUserProfileComplete } from '.';
import { api } from '../../../utils/api';
import toastr from '../../../utils/toastr';

export function* updateUserProfile({ payload }) {
  try {
    const response = yield call(api.users.updateProflie, payload);
    const { data } = response;
    yield put(updateUserProfileComplete(data));
    toastr.success(data.message);
  } catch (error) {
    error.response
      ? toastr.error(error.response.data.message)
      : toastr.error('Something went wrong');
  }
}

export function* watchUpdateUserProfile() {
  yield takeLatest(UPDATE_USER_PROFILE, updateUserProfile);
}
