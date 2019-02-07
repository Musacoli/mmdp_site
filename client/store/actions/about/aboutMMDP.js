import * as types from '../../../constants/about';

export const createAboutMMDP = (payload) => ({
  type: types.CREATE_ABOUT_MMDP_REQUEST,
  payload,
});

export const getAboutMMDP = () => ({
  type: types.GET_ABOUT_MMDP_REQUEST,
});

export const updateAboutMMDP = (payload) => ({
  type: types.UPDATE_ABOUT_MMDP_REQUEST,
  payload,
});
