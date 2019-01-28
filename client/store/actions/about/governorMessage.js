import * as types from '../../../constants/about';

export const createGovernorMessage = payload => ({
  type: types.CREATE_GOVERNOR_MESSAGE_REQUEST,
  payload,
});

export const getGovernorMessage = () => ({
  type: types.GET_GOVERNOR_MESSAGE_REQUEST,
});

export const updateGovernorMessage = payload => ({
  type: types.UPDATE_GOVERNOR_MESSAGE_REQUEST,
  payload,
});
