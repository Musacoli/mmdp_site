import { REGISTER_USER, REGISTER_SUCCESS, REGISTER_ERROR, REGISTERING_USER} from "../../../constants/users";

export const registrationStarted = () => ({
  type: REGISTER_USER
});

export const startRegistration = (payload) => ({
  type: REGISTERING_USER,
  payload
});

export const registerUserSuccess = payload => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const registerUserFailure = payload => ({
  type: REGISTER_ERROR,
  payload,
});
