import registrationPayload from '../../../__mocks__/completeRegistrationData';
import {
  COMPLETE_REGISTRATION_USER_START,
  COMPLETE_REGISTRATION_FAIL_OR_SUCCESS
} from '../../../constants/users';
import registerUser from '../../../store/reducers/users/completeRegistration';
import { completeRegistrationInitialState } from '../../../__mocks__/initialState';

const action = { payload: {} };

describe('Complete User Registration Reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(registerUser(completeRegistrationInitialState, action)).toEqual(
      completeRegistrationInitialState
      );
  });

  it('should handle COMPLETE_REGISTRATION_USER_START', () => {
    action.type = COMPLETE_REGISTRATION_USER_START;
    expect(registerUser(completeRegistrationInitialState, action).isRegistering).toEqual(true);
  });

  it('should handle COMPLETE_REGISTRATION_FAIL_OR_SUCCESS', () => {
    action.type = COMPLETE_REGISTRATION_FAIL_OR_SUCCESS;
    action.payload = registrationPayload;
    expect(registerUser(completeRegistrationInitialState, action).message).toEqual(
      "Congrations! Your account has been activited",
    );
  });
});
