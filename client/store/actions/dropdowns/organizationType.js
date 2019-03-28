import {
  ADD_ORGANIZATION_TYPE_REQUEST,
  ADD_ORGANIZATION_TYPE_FAILURE,
  ADD_ORGANIZATION_TYPE_SUCCESS,
  GET_ORGANIZATION_TYPE_REQUEST,
  GET_ORGANIZATION_TYPE_FAILURE,
  GET_ORGANIZATION_TYPE_SUCCESS,
  DELETE_ORGANIZATION_TYPE_REQUEST,
  DELETE_ORGANIZATION_TYPE_FAILURE,
  DELETE_ORGANIZATION_TYPE_SUCCESS,
  UPDATE_ORGANIZATION_TYPE_FAILURE,
  UPDATE_ORGANIZATION_TYPE_REQUEST,
  UPDATE_ORGANIZATION_TYPE_SUCCESS,
} from '../../../constants/dropdowns/organizationType';

/** DELETE ORGANIZATION_TYPE */
export const deleteOrganizationTypeRequest = (payload) => ({
  type: DELETE_ORGANIZATION_TYPE_REQUEST,
  payload,
});

export const deleteOrganizationTypeSuccess = (payload) => ({
  type: DELETE_ORGANIZATION_TYPE_SUCCESS,
  payload,
});

export const deleteOrganizationTypeFailure = (payload) => ({
  type: DELETE_ORGANIZATION_TYPE_FAILURE,
  payload,
});

/** GET ORGANIZATION_TYPE */
export const getOrganizationTypeRequest = (payload) => ({
  type: GET_ORGANIZATION_TYPE_REQUEST,
  payload,
});

export const getOrganizationTypeSuccess = (payload) => ({
  type: GET_ORGANIZATION_TYPE_SUCCESS,
  payload,
});

export const getOrganizationTypeFailure = (payload) => ({
  type: GET_ORGANIZATION_TYPE_FAILURE,
  payload,
});

/** UPDATE ORGANIZATION_TYPE */
export const updateOrganizationTypeRequest = (payload) => ({
  type: UPDATE_ORGANIZATION_TYPE_REQUEST,
  payload,
});

export const updateOrganizationTypeSuccess = (payload) => ({
  type: UPDATE_ORGANIZATION_TYPE_SUCCESS,
  payload,
});

export const updateOrganizationTypeFailure = (payload) => ({
  type: UPDATE_ORGANIZATION_TYPE_FAILURE,
  payload,
});

/** ADD ORGANIZATION_TYPE */
export const addOrganizationTypeRequest = (payload) => ({
  type: ADD_ORGANIZATION_TYPE_REQUEST,
  payload,
});

export const addOrganizationTypeSuccess = (payload) => ({
  type: ADD_ORGANIZATION_TYPE_SUCCESS,
  payload,
});

export const addOrganizationTypeFailure = (payload) => ({
  type: ADD_ORGANIZATION_TYPE_FAILURE,
  payload,
});
