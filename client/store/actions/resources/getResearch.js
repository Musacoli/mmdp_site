import {
  GET_USER_RESEARCH,
  GET_USER_RESEARCH_SUCCESS,
  GET_USER_RESEARCH_FAILURE,
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
