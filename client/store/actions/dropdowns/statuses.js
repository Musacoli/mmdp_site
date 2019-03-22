import {
  ADD_STATUSES,
  ADD_STATUSES_FAILURE,
  ADD_STATUSES_SUCCESS,
  FETCH_STATUSES,
  FETCH_STATUSES_FAILURE,
  FETCH_STATUSES_SUCCESS,
  DELETE_STATUS,
  DELETE_STATUS_FAILURE,
  DELETE_STATUS_SUCCESS,
} from '../../../constants/dropdowns/statuses';

/** DELETE STATUS */
export const deleteStatus = (payload) => ({
  type: DELETE_STATUS,
  payload,
});

export const deleteStatusSuccess = (payload) => ({
  type: DELETE_STATUS_SUCCESS,
  payload,
});

export const deleteStatusFailure = (payload) => ({
  type: DELETE_STATUS_FAILURE,
  payload,
});

/** FETCH STATUSES */
export const fetchStatuses = (payload) => ({
  type: FETCH_STATUSES,
  payload,
});

export const fetchStatusesSuccess = (payload) => ({
  type: FETCH_STATUSES_SUCCESS,
  payload,
});

export const fetchStatusesFailure = (payload) => ({
  type: FETCH_STATUSES_FAILURE,
  payload,
});

/** ADD STATES */
export const addStatuses = (payload) => ({
  type: ADD_STATUSES,
  payload,
});

export const addStatusesSuccess = (payload) => ({
  type: ADD_STATUSES_SUCCESS,
  payload,
});

export const addStatusesFailure = (payload) => ({
  type: ADD_STATUSES_FAILURE,
  payload,
});
