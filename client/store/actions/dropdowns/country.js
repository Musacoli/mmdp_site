import {
  FETCH_COUNTRY,
  FETCH_COUNTRY_FAILURE,
  FETCH_COUNTRY_SUCCESS,
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
