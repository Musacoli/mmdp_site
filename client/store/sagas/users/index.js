import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTERING_USER,
  EDIT_USER,
  EDITING_USER,
  USER_EDIT_SUCCESS,
  USER_EDIT_ERROR,
  FETCHING_USERS_SUCCESS,
  FETCHING,
  FETCHING_STARTED,
  FETCHING_USERS_ERROR,
  DELETE_USER,
  DELETING_USER,
  DELETING_SUCCESS,
  DELETING_FAILURE,
  FETCHING_ONE_STARTED,
  FETCHING_ONE,
  FETCHING_ONE_USER_SUCCESS,
  FETCHING_ONE_USER_ERROR,
} from '../../../constants/users';

export const registrationStarted = () => ({
  type: REGISTER_USER,
});

export const startRegistration = (payload) => ({
  type: REGISTERING_USER,
  payload,
});

export const registerUserSuccess = (payload) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const registerUserFailure = (payload) => ({
  type: REGISTER_ERROR,
  payload,
});

export const FetchingComplete = (payload) => ({
  type: FETCHING_USERS_SUCCESS,
  payload,
});

export const fetchingStarted = (
  payload = { page: 1, search: '', selectedOption: '' },
) => ({
  type: FETCHING,
  payload,
});

export const fetchingUsers = () => ({
  type: FETCHING_STARTED,
});

export const fetchingError = (payload) => ({
  type: FETCHING_USERS_ERROR,
  payload,
});

export const userEditStarted = () => ({
  type: EDIT_USER,
});

export const startEditing = (payload) => ({
  type: EDITING_USER,
  payload,
});

export const editUserFailure = (payload) => ({
  type: USER_EDIT_ERROR,
  payload,
});

export const editUserSuccess = (payload) => ({
  type: USER_EDIT_SUCCESS,
  payload,
});

export const userDeletingStarted = (payload) => ({
  type: DELETE_USER,
  payload,
});

export const deletingStarted = () => ({
  type: DELETING_USER,
});

export const deletingSuccess = (payload) => ({
  type: DELETING_SUCCESS,
  payload,
});

export const deletingFailed = (payload) => ({
  type: DELETING_FAILURE,
  payload,
});

export const fetchingOne = (payload) => ({
  type: FETCHING_ONE,
  payload,
});

export const fetchingOneStarted = (payload) => ({
  type: FETCHING_ONE_STARTED,
  payload,
});

export const FetchingOneComplete = (payload) => ({
  type: FETCHING_ONE_USER_SUCCESS,
  payload,
});

export const fetchingOneError = (payload) => ({
  type: FETCHING_ONE_USER_ERROR,
  payload,
});
