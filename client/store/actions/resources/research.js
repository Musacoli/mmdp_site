import {
  ADD_USER_RESEARCH,
  ADD_USER_RESEARCH_SUCCESS,
  ADD_USER_RESEARCH_FAILURE,
  GET_SINGLE_RESEARCH_FAILURE,
  GET_SINGLE_RESEARCH_REQUEST,
  GET_SINGLE_RESEARCH_SUCCESS,
  UPDATE_RESEARCH_FAILURE,
  UPDATE_RESEARCH_REQUEST,
  UPDATE_RESEARCH_SUCCESS,
  UPDATE_INPUT_DATA,
} from '../../../constants/resources/research';

export const addResearch = (data) => ({
  type: ADD_USER_RESEARCH,
  payload: data,
});

export const addResearchSuccessfull = (data) => ({
  type: ADD_USER_RESEARCH_SUCCESS,
  payload: data,
});

export const addResearchFailure = (data) => ({
  type: ADD_USER_RESEARCH_FAILURE,
  payload: data,
});

export const getResearchRequest = (data) => ({
  type: GET_SINGLE_RESEARCH_REQUEST,
  payload: data,
});

export const getResearchFailure = (data) => ({
  type: GET_SINGLE_RESEARCH_FAILURE,
  payload: data,
});

export const getResearchSuccess = (data) => ({
  type: GET_SINGLE_RESEARCH_SUCCESS,
  payload: data,
});

export const updateResearchRequest = (data) => ({
  type: UPDATE_RESEARCH_REQUEST,
  payload: data,
});

export const updateResearchFailure = (data) => ({
  type: UPDATE_RESEARCH_FAILURE,
  payload: data,
});

export const updateResearchSUccess = (data) => ({
  type: UPDATE_RESEARCH_SUCCESS,
  payload: data,
});

export const updateInputData = (date) => ({
  type: UPDATE_INPUT_DATA,
  payload: date,
});
