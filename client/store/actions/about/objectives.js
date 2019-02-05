import * as types from '../../../constants/about';

export const createObjectives = payload => ({
  type: types.CREATE_OBJECTIVES_REQUEST,
  payload,
});

export const getObjectives = () => ({
  type: types.GET_OBJECTIVES_REQUEST,
});

export const updateObjectives = payload => ({
  type: types.UPDATE_OBJECTIVES_REQUEST,
  payload,
});
