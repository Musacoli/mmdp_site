import {
  ADD_STATE_MAP,
  ADD_STATE_MAP_SUCCESS,
  ADD_STATE_MAP_FAILURE,
  FETCH_STATE_MAP,
  FETCH_STATE_MAP_FAILURE,
  FETCH_STATE_MAP_SUCCESS,
  UPDATE_STATE_MAP,
  UPDATE_STATE_MAP_SUCCESS,
  UPDATE_STATE_MAP_FAILURE,
} from '../../../constants';

/** FETCH STATE MAP */
export const fetchStateMap = (payload) => ({
  type: FETCH_STATE_MAP,
  payload,
});

export const fetchStateMapSuccess = (payload) => ({
  type: FETCH_STATE_MAP_SUCCESS,
  payload,
});

export const fetchStateMapFailure = (payload) => ({
  type: FETCH_STATE_MAP_FAILURE,
  payload,
});
/** CREATE STATE MAP */
export const addStateMap = (payload) => ({
  type: ADD_STATE_MAP,
  payload,
});

export const addStateMapSuccess = (payload) => ({
  type: ADD_STATE_MAP_SUCCESS,
  payload,
});

export const addStateMapFailure = (payload) => ({
  type: ADD_STATE_MAP_FAILURE,
  payload,
});

/** UPDATING STATE MAP */
export const updateStateMap = (payload) => ({
  type: UPDATE_STATE_MAP,
  payload,
});

export const updateStateMapSuccess = (payload) => ({
  type: UPDATE_STATE_MAP_SUCCESS,
  payload,
});

export const updateStateMapFailure = (payload) => ({
  type: UPDATE_STATE_MAP_FAILURE,
  payload,
});
