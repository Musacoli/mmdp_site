import {
  ADD_AMOUNT,
  ADD_AMOUNT_SUCCESS,
  ADD_AMOUNT_FAILURE,
  FETCH_AMOUNT,
  FETCH_AMOUNT_SUCCESS,
  FETCH_AMOUNT_FAILURE,
  DELETE_AMOUNT,
  DELETE_AMOUNT_SUCCESS,
  DELETE_AMOUNT_FAILURE,
} from '../../../constants/dropdowns/amountInvested';

export const addAmount = (payload) => ({
  type: ADD_AMOUNT,
  payload,
});

export const addAmountSuccess = (payload) => ({
  type: ADD_AMOUNT_SUCCESS,
  payload,
});

export const addAmountFailure = (payload) => ({
  type: ADD_AMOUNT_FAILURE,
  payload,
});

export const fetchAmount = (payload) => ({
  type: FETCH_AMOUNT,
  payload,
});

export const fetchAmountSuccess = (payload) => ({
  type: FETCH_AMOUNT_SUCCESS,
  payload,
});

export const fetchAmountFailure = (payload) => ({
  type: FETCH_AMOUNT_FAILURE,
  payload,
});

export const deleteAmount = (payload) => ({
  type: DELETE_AMOUNT,
  payload,
});

export const deleteAmountSuccess = (payload) => ({
  type: DELETE_AMOUNT_SUCCESS,
  payload,
});

export const deleteAmountFailure = (payload) => ({
  type: DELETE_AMOUNT_FAILURE,
  payload,
});
