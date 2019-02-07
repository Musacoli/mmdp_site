import { LOGIN, LOGIN_SUCCESS_OR_FAILURE } from '../../../constants/auth';

export const loginUser = (data) => ({
  type: LOGIN,
  payload: data,
});

export const loginSuccessOrFail = (data) => ({
  type: LOGIN_SUCCESS_OR_FAILURE,
  payload: data,
});
