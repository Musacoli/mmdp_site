import {
  FETCH_COUNTRY,
  FETCH_COUNTRY_SUCCESS,
  FETCH_COUNTRY_FAILURE,
  ADD_COUNTRY,
  ADD_COUNTRY_SUCCESS,
  ADD_COUNTRY_FAILURE,
  DELETE_COUNTRY,
  DELETE_COUNTRY_SUCCESS,
  DELETE_COUNTRY_FAILURE,
} from '../../../constants';

export const fetchCountry = (payload) => ({
  type: FETCH_COUNTRY,
  payload,
});

export const fetchCountrySuccess = (payload) => ({
  type: FETCH_COUNTRY_SUCCESS,
  payload,
});

export const fetchCountryFailure = (payload) => ({
  type: FETCH_COUNTRY_FAILURE,
  payload,
});

export const addCountry = (payload) => ({
  type: ADD_COUNTRY,
  payload,
});

export const addCountrySuccess = (payload) => ({
  type: ADD_COUNTRY_SUCCESS,
  payload,
});

export const addCountryFailure = (payload) => ({
  type: ADD_COUNTRY_FAILURE,
  payload,
});

export const deleteCountry = (payload) => ({
  type: DELETE_COUNTRY,
  payload,
});

export const deleteCountrySuccess = (payload) => ({
  type: DELETE_COUNTRY_SUCCESS,
  payload,
});

export const deleteCountryFailure = (payload) => ({
  type: DELETE_COUNTRY_FAILURE,
  payload,
});
