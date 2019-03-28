import {
  ADD_TYPES,
  ADD_TYPES_FAILURE,
  ADD_TYPES_SUCCESS,
  FETCH_TYPES,
  FETCH_TYPES_FAILURE,
  FETCH_TYPES_SUCCESS,
  DELETE_TYPE,
  DELETE_TYPE_FAILURE,
  DELETE_TYPE_SUCCESS,
  UPDATE_TYPE,
  UPDATE_TYPE_SUCCESS,
  UPDATE_TYPE_FAILURE,
} from '../../../constants/dropdowns/beneficiaryType';

export const updateType = (payload) => ({
  type: UPDATE_TYPE,
  payload,
});

export const updateTypeSuccess = (payload) => ({
  type: UPDATE_TYPE_SUCCESS,
  payload,
});

export const updateTypeFailure = () => ({
  type: UPDATE_TYPE_FAILURE,
});
/** DELETE STATUS */
export const deleteType = (payload) => ({
  type: DELETE_TYPE,
  payload,
});

export const deleteTypeSuccess = (payload) => ({
  type: DELETE_TYPE_SUCCESS,
  payload,
});

export const deleteTypeFailure = (payload) => ({
  type: DELETE_TYPE_FAILURE,
  payload,
});

/** FETCH STATUSES */
export const fetchTypes = (payload) => ({
  type: FETCH_TYPES,
  payload,
});

export const fetchTypesSuccess = (payload) => ({
  type: FETCH_TYPES_SUCCESS,
  payload,
});

export const fetchTypesFailure = (payload) => ({
  type: FETCH_TYPES_FAILURE,
  payload,
});

/** ADD STATES */
export const addTypes = (payload) => ({
  type: ADD_TYPES,
  payload,
});

export const addTypesSuccess = (payload) => ({
  type: ADD_TYPES_SUCCESS,
  payload,
});

export const addTypesFailure = (payload) => ({
  type: ADD_TYPES_FAILURE,
  payload,
});
