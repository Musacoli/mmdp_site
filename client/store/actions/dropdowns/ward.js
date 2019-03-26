import {
  ADD_WARDS,
  ADD_WARDS_FAILURE,
  ADD_WARDS_SUCCESS,
  FETCH_WARDS,
  FETCH_WARDS_FAILURE,
  FETCH_WARDS_SUCCESS,
  DELETE_WARD,
  DELETE_WARD_FAILURE,
  DELETE_WARD_SUCCESS,
} from '../../../constants/dropdowns/ward';

/** DELETE WARD */
export const deleteWard = (payload) => ({
  type: DELETE_WARD,
  payload,
});

export const deleteWardSuccess = (payload) => ({
  type: DELETE_WARD_SUCCESS,
  payload,
});

export const deleteWardFailure = (payload) => ({
  type: DELETE_WARD_FAILURE,
  payload,
});

/** FETCH WARDS */
export const fetchWards = (payload) => ({
  type: FETCH_WARDS,
  payload,
});

export const fetchWardsSuccess = (payload) => ({
  type: FETCH_WARDS_SUCCESS,
  payload,
});

export const fetchWardsFailure = (payload) => ({
  type: FETCH_WARDS_FAILURE,
  payload,
});

/** ADD WARDS */
export const addWards = (payload) => ({
  type: ADD_WARDS,
  payload,
});

export const addWardsSuccess = (payload) => ({
  type: ADD_WARDS_SUCCESS,
  payload,
});

export const addWardsFailure = (payload) => ({
  type: ADD_WARDS_FAILURE,
  payload,
});
