import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTERING_USER,
  EDIT_USER,
  EDITING_USER,
  USER_EDIT_SUCCESS,
  USER_EDIT_ERROR
} from "../../../constants/users";

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

export const userEditStarted = () => ({
  type: EDIT_USER
});

export const startEditing = payload => ({
  type: EDITING_USER,
  payload
});

export const editUserFailure = payload => ({
  type: USER_EDIT_ERROR,
  payload
});

export const editUserSuccess = payload => ({
  type: USER_EDIT_SUCCESS,
  payload
});
