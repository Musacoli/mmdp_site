import * as types from '../../../constants/about';

export const createEdoStateApproach = payload => ({
  type: types.CREATE_EDO_STATE_APPROACH_REQUEST,
  payload,
});

export const getEdoStateApproach = () => ({
  type: types.GET_EDO_STATE_APPROACH_REQUEST,
});

export const updateEdoStateApproach = payload => ({
  type: types.UPDATE_EDO_STATE_APPROACH_REQUEST,
  payload,
});
