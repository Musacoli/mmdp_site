import {
  ADD_FOCUS_AREA,
  ADD_FOCUS_AREA_SUCCESS,
  ADD_FOCUS_AREA_FAILURE,
  FETCH_FOCUS_AREA,
  FETCH_FOCUS_AREA_SUCCESS,
  FETCH_FOCUS_AREA_FAILURE,
  DELETE_FOCUS_AREA,
  DELETE_FOCUS_AREA_SUCCESS,
  DELETE_FOCUS_AREA_FAILURE,
} from '../../../constants/dropdowns/focusArea';

export const addFocusArea = (payload) => ({
  type: ADD_FOCUS_AREA,
  payload,
});

export const addFocusAreaSuccess = (payload) => ({
  type: ADD_FOCUS_AREA_SUCCESS,
  payload,
});

export const addFocusAreaFailure = (payload) => ({
  type: ADD_FOCUS_AREA_FAILURE,
  payload,
});

export const fetchFocusArea = (payload) => ({
  type: FETCH_FOCUS_AREA,
  payload,
});

export const fetchFocusAreaSuccess = (payload) => ({
  type: FETCH_FOCUS_AREA_SUCCESS,
  payload,
});

export const fetchFocusAreaFailure = (payload) => ({
  type: FETCH_FOCUS_AREA_FAILURE,
  payload,
});

export const deleteFocusArea = (payload) => ({
  type: DELETE_FOCUS_AREA,
  payload,
});

export const deleteFocusAreaSuccess = (payload) => ({
  type: DELETE_FOCUS_AREA_SUCCESS,
  payload,
});

export const deleteFocusAreaFailure = (payload) => ({
  type: DELETE_FOCUS_AREA_FAILURE,
  payload,
});
