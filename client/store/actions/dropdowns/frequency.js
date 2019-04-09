import {
  ADD_FREQUENCY,
  ADD_FREQUENCY_SUCCESS,
  ADD_FREQUENCY_FAILURE,
  FETCH_FREQUENCY,
  FETCH_FREQUENCY_SUCCESS,
  FETCH_FREQUENCY_FAILURE,
  DELETE_FREQUENCY,
  DELETE_FREQUENCY_SUCCESS,
  DELETE_FREQUENCY_FAILURE,
} from '../../../constants/dropdowns/frequency';

export const addFrequency = (payload) => ({
  type: ADD_FREQUENCY,
  payload,
});

export const addFrequencySuccess = (payload) => ({
  type: ADD_FREQUENCY_SUCCESS,
  payload,
});

export const addFrequencyFailure = (payload) => ({
  type: ADD_FREQUENCY_FAILURE,
  payload,
});

export const fetchFrequency = (payload) => ({
  type: FETCH_FREQUENCY,
  payload,
});

export const fetchFrequencySuccess = (payload) => ({
  type: FETCH_FREQUENCY_SUCCESS,
  payload,
});

export const fetchFrequencyFailure = (payload) => ({
  type: FETCH_FREQUENCY_FAILURE,
  payload,
});

export const deleteFrequency = (payload) => ({
  type: DELETE_FREQUENCY,
  payload,
});

export const deleteFrequencySuccess = (payload) => ({
  type: DELETE_FREQUENCY_SUCCESS,
  payload,
});

export const deleteFrequencyFailure = (payload) => ({
  type: DELETE_FREQUENCY_FAILURE,
  payload,
});
