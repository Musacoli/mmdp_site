import {
  GET_USER_RESEARCH,
  GET_USER_RESEARCH_SUCCESS,
  GET_USER_RESEARCH_FAILURE,
  DELETE_USER_RESEARCH,
  DELETE_USER_RESEARCH_SUCCESS,
  DELETE_USER_RESEARCH_FAILURE,
  ARCHIVE_USER_RESEARCH,
  ARCHIVE_USER_RESEARCH_SUCCESS,
  ARCHIVE_USER_RESEARCH_FAILURE,
} from '../../../constants/resources/research';

export const getResearch = (data) => ({
  type: GET_USER_RESEARCH,
  payload: data,
});

export const getResearchSuccess = (data) => ({
  type: GET_USER_RESEARCH_SUCCESS,
  payload: data,
});

export const getResearchFailure = (data) => ({
  type: GET_USER_RESEARCH_FAILURE,
  payload: data,
});
export const archiveResearch = (data) => ({
  type: ARCHIVE_USER_RESEARCH,
  payload: data,
});

export const archiveResearchSuccess = (data) => ({
  type: ARCHIVE_USER_RESEARCH_SUCCESS,
  payload: data,
});

export const archiveResearchFailure = (data) => ({
  type: ARCHIVE_USER_RESEARCH_FAILURE,
  payload: data,
});

export const deleteResearch = (data) => ({
  type: DELETE_USER_RESEARCH,
  payload: data,
});

export const deleteResearchSuccess = (data) => ({
  type: DELETE_USER_RESEARCH_SUCCESS,
  payload: data,
});

export const deleteResearchFailure = (data) => ({
  type: DELETE_USER_RESEARCH_FAILURE,
  payload: data,
});
