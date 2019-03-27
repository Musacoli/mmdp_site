import {
  FETCH_TARGET_AUDIENCES,
  FETCHING_TARGET_AUDIENCES,
  CREATE_TARGET_AUDIENCES,
  DELETE_TARGET_AUDIENCE,
  TARGET_AUDIENCES_CREATED_SUCCESS,
  UPDATE_TARGET_AUDIENCES,
} from '../../../constants/dropdowns/targetAudience';

export const fetchTargetAudiences = (payload) => ({
  type: FETCH_TARGET_AUDIENCES,
  payload,
});

export const fetchingTargetAudiences = (payload) => ({
  type: FETCHING_TARGET_AUDIENCES,
  payload,
});

export const createTargetAudiences = (payload) => ({
  type: CREATE_TARGET_AUDIENCES,
  payload,
});

export const updateTargetAudiences = (payload) => ({
  type: UPDATE_TARGET_AUDIENCES,
  payload,
});

export const targetAudiencesCreatedSuccessfully = (payload) => ({
  type: TARGET_AUDIENCES_CREATED_SUCCESS,
  payload,
});

export const deleteTargetAudience = (payload) => ({
  type: DELETE_TARGET_AUDIENCE,
  payload,
});

export default fetchTargetAudiences;
