import {
  ADD_USER_RESEARCH,
  ADD_USER_RESEARCH_SUCCESS,
  ADD_USER_RESEARCH_FAILURE,
} from '../../../constants/resources/research';

export const addResearch = data => ({
  type: ADD_USER_RESEARCH,
  payload: data,
});

export const addResearchSuccessfull = data => ({
  type: ADD_USER_RESEARCH_SUCCESS,
  payload: data,
});
