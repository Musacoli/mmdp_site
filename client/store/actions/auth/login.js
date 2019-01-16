import { LOGIN, LOGIN_SUCCESS } from '../../constants/auth';

export const loginLoading = () => ({
  type: LOGIN,
});

export const loginSuccessful = payload => ({
  type: LOGIN_SUCCESS,
  payload
});
