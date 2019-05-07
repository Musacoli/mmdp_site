import {
  COMPLETE_REGISTRATION_USER_START,
  COMPLETE_REGISTRATION_FAIL_OR_SUCCESS,
  COMPLETE_USER_REGISTRATION,
} from '../../../constants/users';

export const completeUserRegistrationStart = () => ({
  type: COMPLETE_REGISTRATION_USER_START,
});

export const completeUserRegistrationFailOrSuccess = (data) => ({
  type: COMPLETE_REGISTRATION_FAIL_OR_SUCCESS,
  payload: data,
});

export const completeRegistration = (data) => ({
  type: COMPLETE_USER_REGISTRATION,
  payload: data,
});
