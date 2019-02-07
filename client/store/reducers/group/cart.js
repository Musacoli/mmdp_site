import {
  ADD_GROUP_ITEM,
  ADD_ALL_GROUP_ITEM,
  REMOVE_ALL_GROUP_ITEM,
} from '../../../constants';

export const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_GROUP_ITEM: {
      const found = state.find((o) => o === payload);
      if (!found) {
        state.push(payload);
      } else {
        return state.filter((value) => value !== payload);
      }
      return state;
    }
    case ADD_ALL_GROUP_ITEM: {
      const found = state.find((o) => o === payload);
      if (!found) {
        state.push(payload);
      }
      return state;
    }
    case REMOVE_ALL_GROUP_ITEM:
      return [];
    default:
      return state;
  }
};
