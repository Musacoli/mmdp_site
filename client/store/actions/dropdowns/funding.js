import {
  ADD_FUNDING,
  ADD_FUNDING_SUCCESS,
  ADD_FUNDING_FAILURE,
  FETCH_FUNDING,
  FETCH_FUNDING_SUCCESS,
  FETCH_FUNDING_FAILURE,
  DELETE_FUNDING,
  DELETE_FUNDING_SUCCESS,
  DELETE_FUNDING_FAILURE,
} from '../../../constants/dropdowns/funding';

export const addFunding = (payload) => ({
  type: ADD_FUNDING,
  payload,
});

export const addFundingSuccess = (payload) => ({
  type: ADD_FUNDING_SUCCESS,
  payload,
});

export const addFundingFailure = (payload) => ({
  type: ADD_FUNDING_FAILURE,
  payload,
});

export const fetchFunding = (payload) => ({
  type: FETCH_FUNDING,
  payload,
});

export const fetchFundingSuccess = (payload) => ({
  type: FETCH_FUNDING_SUCCESS,
  payload,
});

export const fetchFundingFailure = (payload) => ({
  type: FETCH_FUNDING_FAILURE,
  payload,
});

export const deleteFunding = (payload) => ({
  type: DELETE_FUNDING,
  payload,
});

export const deleteFundingSuccess = (payload) => ({
  type: DELETE_FUNDING_SUCCESS,
  payload,
});

export const deleteFundingFailure = (payload) => ({
  type: DELETE_FUNDING_FAILURE,
  payload,
});
