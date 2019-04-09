import {
  ADD_STATE_SVG_FILE,
  ADD_STATE_SVG_FILE_SUCCESS,
  ADD_STATE_SVG_FILE_FAILURE,
  FETCH_LGA_BOUNDARIES,
  FETCH_LGA_BOUNDARIES_FAILURE,
  FETCH_LGA_BOUNDARIES_SUCCESS,
  UPDATE_LGA,
  UPDATE_LGA_MAP_SUCCESS,
  UPDATE_LGA_MAP_FAILURE,
} from '../../../constants/matrix/lga';

export const addStateMatrix = (data) => ({
  type: ADD_STATE_SVG_FILE,
  payload: data,
});

export const addStateMatrixSuccessful = (data) => ({
  type: ADD_STATE_SVG_FILE_SUCCESS,
  payload: data,
});

export const addStateMatrixFailure = (data) => ({
  type: ADD_STATE_SVG_FILE_FAILURE,
  payload: data,
});

export const getLGAMapRequest = (data) => ({
  type: FETCH_LGA_BOUNDARIES,
  payload: data,
});

export const getLGAMapFailure = (data) => ({
  type: FETCH_LGA_BOUNDARIES_FAILURE,
  payload: data,
});

export const getLGAMapSuccess = (data) => ({
  type: FETCH_LGA_BOUNDARIES_SUCCESS,
  payload: data,
});

export const updateLGAMatrix = (data) => ({
  type: UPDATE_LGA,
  payload: data,
});

export const updateLGAMatrixSuccess = (data) => ({
  type: UPDATE_LGA_MAP_SUCCESS,
  payload: data,
});

export const updateLGAMatrixFailure = (data) => ({
  type: UPDATE_LGA_MAP_FAILURE,
  payload: data,
});
