import {
  ADD_STATES,
  ADD_STATES_FAILURE,
  ADD_STATES_SUCCESS,
  FETCH_STATES,
  FETCH_STATES_FAILURE,
  FETCH_STATES_SUCCESS,
  DELETE_STATE,
  DELETE_STATE_FAILURE,
  DELETE_STATE_SUCCESS,
} from '../../../constants';

/** DELETE STATE */
export const deleteState = (payload) => ({
  type: DELETE_STATE,
  payload,
});

export const deleteStateSuccess = (payload) => ({
  type: DELETE_STATE_SUCCESS,
  payload,
});

export const deleteStateFailure = (payload) => ({
  type: DELETE_STATE_FAILURE,
  payload,
});
/** FETCH STATES */
export const fetchStates = (payload) => ({
  type: FETCH_STATES,
  payload,
});

export const fetchStatesSuccess = (payload) => ({
  type: FETCH_STATES_SUCCESS,
  payload,
});

export const fetchStatesFailure = (payload) => ({
  type: FETCH_STATES_FAILURE,
  payload,
});

/** ADD STATES */
export const addStates = (payload) => ({
  type: ADD_STATES,
  payload,
});

export const addStatesSuccess = (payload) => ({
  type: ADD_STATES_SUCCESS,
  payload,
});

export const addStatesFailure = (payload) => ({
  type: ADD_STATES_FAILURE,
  payload,
});
