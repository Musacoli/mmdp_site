import * as types from '../../../constants/about';

export const createCoordination = (payload) => ({
  type: types.CREATE_COORDINATION_REQUEST,
  payload,
});

export const getCoordination = () => ({
  type: types.GET_COORDINATION_REQUEST,
});

export const updateCoordination = (payload) => ({
  type: types.UPDATE_COORDINATION_REQUEST,
  payload,
});
