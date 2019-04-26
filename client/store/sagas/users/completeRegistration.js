import { put, call, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import { COMPLETE_USER_REGISTRATION } from '../../../constants/users';
import {
  completeUserRegistrationFailOrSuccess,
  completeUserRegistrationStart,
} from '../../actions/auth/completeRegistration';
import apiCall from '../../../utils/completeRegistration';

toastr.options = {
  positionClass: 'toast-top-center',
  preventDuplicates: true,
};

export function* completeUserRegistration({ payload }) {
  yield put(completeUserRegistrationStart());
  try {
    const response = yield call(apiCall.put, payload);
    yield put(completeUserRegistrationFailOrSuccess(response));
    if (response.status === 'success') {
      toastr.success(response.message);
    } else if (response.status === 'fail' && response.message) {
      toastr.warning(response.message);
    } else {
      toastr.warning(response.error);
    }
  } catch (error) {
    toastr.warning(error);
    throw error;
  }
}

export function* watchCompleteUserRegistration() {
  yield takeLatest(COMPLETE_USER_REGISTRATION, completeUserRegistration);
}
