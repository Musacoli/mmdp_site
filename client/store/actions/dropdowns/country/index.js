import {
  GET_COUNTRY_DROPDOWN_REQUEST,
  GET_COUNTRY_DROPDOWN_SUCCESS,
  GET_COUNTRY_DROPDOWN_FAILURE,
  UPDATE_COUNTRY_DROPDOWN_REQUEST,
  UPDATE_COUNTRY_DROPDOWN_FAILURE,
  UPDATE_COUNTRY_DROPDOWN_SUCCESS,
  DELETE_USER_COUNTRY_DROPDOWN,
  DELETE_USER_COUNTRY_DROPDOWN_SUCCESS,
  DELETE_USER_COUNTRY_DROPDOWN_FAILURE,
} from '../../../../constants/dropdowns/country';

export const getCountryDropDown = (data) => ({
  type: GET_COUNTRY_DROPDOWN_REQUEST,
  payload: data,
});

export const getCountryDropDownSuccess = (data) => ({
  type: GET_COUNTRY_DROPDOWN_SUCCESS,
  payload: data,
});

export const getCountryDropDownFailure = (data) => ({
  type: GET_COUNTRY_DROPDOWN_FAILURE,
  payload: data,
});
export const updateCountryDropDown = (data) => ({
  type: UPDATE_COUNTRY_DROPDOWN_REQUEST,
  payload: data,
});

export const updateCountryDropDownSuccess = (data) => ({
  type: UPDATE_COUNTRY_DROPDOWN_SUCCESS,
  payload: data,
});

export const updateCountryDropDownFailure = (data) => ({
  type: UPDATE_COUNTRY_DROPDOWN_FAILURE,
  payload: data,
});

export const deleteCountryDropDown = (data) => ({
  type: DELETE_USER_COUNTRY_DROPDOWN,
  payload: data,
});

export const deleteCountryDropDownSuccess = (data) => ({
  type: DELETE_USER_COUNTRY_DROPDOWN_SUCCESS,
  payload: data,
});

export const deleteCountryDropDownFailure = (data) => ({
  type: DELETE_USER_COUNTRY_DROPDOWN_FAILURE,
  payload: data,
});
