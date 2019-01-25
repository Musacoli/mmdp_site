import { ADD_GROUP_ITEM, ADD_ALL_GROUP_ITEM, REMOVE_ALL_GROUP_ITEM } from '../../../constants';

export const addGroupItem = payload => ({
  type: ADD_GROUP_ITEM,
  payload,
});

export const addAllGroupsToCart = payload => ({
  type: ADD_ALL_GROUP_ITEM,
  payload,
});

export const removeAllGroupsToCart = payload => ({
  type: REMOVE_ALL_GROUP_ITEM,
  payload,
});
