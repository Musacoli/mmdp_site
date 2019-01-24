import { LOGIN, LOGIN_SUCCESS_OR_FAILURE } from '../../../constants/auth';
import { loginUser, loginSuccessOrFail } from '../../../store/actions/auth/login';

describe('Login user action', () => {
  it('should create an action to login a user', () => {
    const userData = {
      username: 'admin',
      password: 'admin',
    };
    const expectedAction = {
      type: LOGIN,
      payload: userData,
    };
    expect(loginUser(userData)).toEqual(expectedAction);
  });
});

describe('Login success of failure user action', () => {
  it('should create an action to update the state when the reponse is returned', () => {
    const userResponse = {
      message: 'Login successful',
    };
    const expectedAction = {
      type: LOGIN_SUCCESS_OR_FAILURE,
      payload: userResponse,
    };
    expect(loginSuccessOrFail(userResponse)).toEqual(expectedAction);
  });
});
