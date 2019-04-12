import {
  ADD_COUNTRY_MAP,
  ADD_COUNTRY_MAP_SUCCESS,
  ADD_COUNTRY_MAP_FAILURE,
  FETCH_COUNTRY_MAP,
  FETCH_COUNTRY_MAP_FAILURE,
  FETCH_COUNTRY_MAP_SUCCESS,
  UPDATE_COUNTRY_MAP,
  UPDATE_COUNTRY_MAP_SUCCESS,
  UPDATE_COUNTRY_MAP_FAILURE,
} from '../../../constants';

/** FETCH COUNTRY MAP */
export const fetchCountryMap = (payload) => ({
  type: FETCH_COUNTRY_MAP,
  payload,
});

export const fetchCountryMapSuccess = (payload) => ({
  type: FETCH_COUNTRY_MAP_SUCCESS,
  payload,
});

export const fetchCountryMapFailure = (payload) => ({
  type: FETCH_COUNTRY_MAP_FAILURE,
  payload,
});
/** CREATE COUNTRY MAP */
export const addCountryMap = (payload) => ({
  type: ADD_COUNTRY_MAP,
  payload,
});

export const addCountryMapSuccess = (payload) => ({
  type: ADD_COUNTRY_MAP_SUCCESS,
  payload,
});

export const addCountryMapFailure = (payload) => ({
  type: ADD_COUNTRY_MAP_FAILURE,
  payload,
});

/** UPDATE COUNTRY MAP */
export const updateCountryMap = (payload) => ({
  type: UPDATE_COUNTRY_MAP,
  payload,
});

export const updateCountryMapSuccess = (payload) => ({
  type: UPDATE_COUNTRY_MAP_SUCCESS,
  payload,
});

export const updateCountryMapFailure = (payload) => ({
  type: UPDATE_COUNTRY_MAP_FAILURE,
  payload,
});
