import { put, call, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import axios from 'axios';
import { LOGIN } from '../../constants/auth';
import { loginSuccessOrFail } from '../../store/actions/auth/login';

toastr.options = {
  positionClass: 'toast-top-center',
  preventDuplicates: true,
};
const apiRequest = (url, data) => axios
  .post(url, data)
  .then(response => response.data)
  .catch((error) => {
    if (error.response) {
      const response = error.response.data;
      return response;
    }
  });

export function* loginuser(action) {
  try {
    const LOGIN_URL = 'http://0.0.0.0:3000/api/v1/auth/login';
    const USERDETAILS = action.payload;
    const response = yield call(apiRequest, LOGIN_URL, USERDETAILS);
    yield put(loginSuccessOrFail(response));
    if (response.status === 'success') {
      const userToken = response.data.user.token;
      toastr.success(response.message);
      localStorage.setItem('userToken', userToken);
      setTimeout(() => {
        window.location.replace('/');
      }, 1000);
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
