import loginReducer from '../../../store/reducers/auth/login';
import {
  LOGIN,
  LOGOUT,
  LOGIN_SUCCESS_OR_FAILURE,
} from '../../../constants/auth';

describe('Login reducer', () => {
  it('should return the initial state', () => {
    expect(loginReducer({}, LOGIN)).toEqual({});
  });

  it('should return the user state with the data passed in', () => {
    const action = {
      type: LOGIN,
      payload: {
        username: 'user',
        password: 'userAdmin',
      },
    };
    expect(loginReducer({}, action)).toEqual({
      payload: {
        username: 'user',
        password: 'userAdmin',
      },
    });
  });

  it('should return login_success_or_failure', () => {
    const action = {
      type: LOGIN_SUCCESS_OR_FAILURE,
      payload: {
        message: 'user login successful',
      },
    };

    expect(loginReducer({}, action)).toEqual({
      payload: {
        message: 'user login successful',
      },
    });
  });

  it('should return logout', () => {
    const action = {
      type: LOGOUT,
      payload: {
        status: 'logged out',
      },
    };

    expect(loginReducer({}, action)).toEqual({
      payload: {
        status: 'logged out',
      },
    });
  });
});
