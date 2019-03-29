import {
  ADD_LGA_REQUEST,
  ADD_LGA_FAILURE,
  ADD_LGA_SUCCESS,
  GET_LGA_REQUEST,
  GET_LGA_FAILURE,
  GET_LGA_SUCCESS,
  DELETE_LGA_REQUEST,
  DELETE_LGA_FAILURE,
  DELETE_LGA_SUCCESS,
  UPDATE_LGA_FAILURE,
  UPDATE_LGA_REQUEST,
  UPDATE_LGA_SUCCESS,
} from '../../../constants/dropdowns/LGA';

/** DELETE LGA */
export const deleteLGARequest = (payload) => ({
  type: DELETE_LGA_REQUEST,
  payload,
});

export const deleteLGASuccess = (payload) => ({
  type: DELETE_LGA_SUCCESS,
  payload,
});

export const deleteLGAFailure = (payload) => ({
  type: DELETE_LGA_FAILURE,
  payload,
});

/** GET LGA */
export const getLGARequest = (payload) => ({
  type: GET_LGA_REQUEST,
  payload,
});

export const getLGASuccess = (payload) => ({
  type: GET_LGA_SUCCESS,
  payload,
});

export const getLGAFailure = (payload) => ({
  type: GET_LGA_FAILURE,
  payload,
});

/** UPDATE LGA */
export const updateLGARequest = (payload) => ({
  type: UPDATE_LGA_REQUEST,
  payload,
});

export const updateLGASuccess = (payload) => ({
  type: UPDATE_LGA_SUCCESS,
  payload,
});

export const updateLGAFailure = (payload) => ({
  type: UPDATE_LGA_FAILURE,
  payload,
});

/** ADD LGA */
export const addLGARequest = (payload) => ({
  type: ADD_LGA_REQUEST,
  payload,
});

export const addLGASuccess = (payload) => ({
  type: ADD_LGA_SUCCESS,
  payload,
});

export const addLGAFailure = (payload) => ({
  type: ADD_LGA_FAILURE,
  payload,
});
