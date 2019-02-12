import { put, call, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import { LOGIN } from '../../../constants/auth';
import { loginSuccessOrFail } from '../../actions/auth/login';
import loginApiRequest from '../../../utils/login';

toastr.options = {
  positionClass: 'toast-top-center',
  preventDuplicates: true,
};

export function* loginuser(action) {
  try {
    const response = yield call(loginApiRequest, action.payload);
    yield put(loginSuccessOrFail(response));
    if (response.status === 'success') {
      const userToken = response.data.user.token;
      toastr.success(response.message);
      localStorage.setItem('userToken', userToken);
    } else {
      toastr.warning(response.message);
    }
  } catch (error) {
    throw error;
  }
}

export default function* loginWatcher() {
  yield takeLatest(LOGIN, loginuser);
}
