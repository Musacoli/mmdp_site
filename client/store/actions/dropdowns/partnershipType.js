import {
  ADD_PARTNERSHIP_TYPES,
  ADD_PARTNERSHIP_TYPES_FAILURE,
  ADD_PARTNERSHIP_TYPES_SUCCESS,
  FETCH_PARTNERSHIP_TYPES,
  FETCH_PARTNERSHIP_TYPES_FAILURE,
  FETCH_PARTNERSHIP_TYPES_SUCCESS,
  DELETE_PARTNERSHIP_TYPE,
  DELETE_PARTNERSHIP_TYPE_FAILURE,
  DELETE_PARTNERSHIP_TYPE_SUCCESS,
} from '../../../constants';

/** DELETE PARTNERSHIP */
export const deletePartnershipType = (payload) => ({
  type: DELETE_PARTNERSHIP_TYPE,
  payload,
});

export const deletePartnershipTypeSuccess = (payload) => ({
  type: DELETE_PARTNERSHIP_TYPE_SUCCESS,
  payload,
});

export const deletePartnershipTypeFailure = (payload) => ({
  type: DELETE_PARTNERSHIP_TYPE_FAILURE,
  payload,
});

/** FETCH PARTNERSHIP */
export const fetchPartnershipType = (payload) => ({
  type: FETCH_PARTNERSHIP_TYPES,
  payload,
});

export const fetchPartnershipTypeSuccess = (payload) => ({
  type: FETCH_PARTNERSHIP_TYPES_SUCCESS,
  payload,
});

export const fetchPartnershipTypeFailure = (payload) => ({
  type: FETCH_PARTNERSHIP_TYPES_FAILURE,
  payload,
});

/** ADD PartnershipType */
export const addPartnershipType = (payload) => ({
  type: ADD_PARTNERSHIP_TYPES,
  payload,
});

export const addPartnershipTypeSuccess = (payload) => ({
  type: ADD_PARTNERSHIP_TYPES_SUCCESS,
  payload,
});

export const addPartnershipTypeFailure = (payload) => ({
  type: ADD_PARTNERSHIP_TYPES_FAILURE,
  payload,
});
