import {
  DELETE_DROPDOWNS,
  DELETE_DROPDOWNS_SUCCESS,
  DELETE_DROPDOWNS_FAILURE,
  FETCH_DROPDOWNS,
  FETCH_DROPDOWNS_SUCCESS,
  FETCH_DROPDOWNS_FAILURE,
} from '../../../constants/manageDropdowns/dropdowns';

/** DELETE DROPDOWNS */
export const deleteDropdowns = (payload) => ({
  type: DELETE_DROPDOWNS,
  payload,
});

export const deleteDropdownsSuccess = (payload) => ({
  type: DELETE_DROPDOWNS_SUCCESS,
  payload,
});

export const deleteDropdownsFailure = (payload) => ({
  type: DELETE_DROPDOWNS_FAILURE,
  payload,
});

/** FETCH DROPDOWNS */
export const fetchDropdowns = (payload) => ({
  type: FETCH_DROPDOWNS,
  payload,
});

export const fetchDropdownsSuccess = (payload) => ({
  type: FETCH_DROPDOWNS_SUCCESS,
  payload,
});

export const fetchDropdownsFailure = (payload) => ({
  type: FETCH_DROPDOWNS_FAILURE,
  payload,
});
