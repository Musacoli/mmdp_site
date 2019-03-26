import {
  ADD_IMPACT_TYPES,
  ADD_IMPACT_TYPES_FAILURE,
  ADD_IMPACT_TYPES_SUCCESS,
  FETCH_IMPACT_TYPES,
  FETCH_IMPACT_TYPES_FAILURE,
  FETCH_IMPACT_TYPES_SUCCESS,
  DELETE_IMPACT_TYPE,
  DELETE_IMPACT_TYPE_FAILURE,
  DELETE_IMPACT_TYPE_SUCCESS,
} from '../../../constants';

/** DELETE ImpactType */
export const deleteImpactType = (payload) => ({
  type: DELETE_IMPACT_TYPE,
  payload,
});

export const deleteImpactTypeSuccess = (payload) => ({
  type: DELETE_IMPACT_TYPE_SUCCESS,
  payload,
});

export const deleteImpactTypeFailure = (payload) => ({
  type: DELETE_IMPACT_TYPE_FAILURE,
  payload,
});
/** FETCH ImpactTypes */
export const fetchImpactTypes = (payload) => ({
  type: FETCH_IMPACT_TYPES,
  payload,
});

export const fetchImpactTypesSuccess = (payload) => ({
  type: FETCH_IMPACT_TYPES_SUCCESS,
  payload,
});

export const fetchImpactTypesFailure = (payload) => ({
  type: FETCH_IMPACT_TYPES_FAILURE,
  payload,
});

/** ADD ImpactTypes */
export const addImpactTypes = (payload) => ({
  type: ADD_IMPACT_TYPES,
  payload,
});

export const addImpactTypesSuccess = (payload) => ({
  type: ADD_IMPACT_TYPES_SUCCESS,
  payload,
});

export const addImpactTypesFailure = (payload) => ({
  type: ADD_IMPACT_TYPES_FAILURE,
  payload,
});
