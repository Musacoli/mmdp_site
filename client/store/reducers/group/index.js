/* eslint-disable no-underscore-dangle */
import {
  FETCH_GROUPS,
  FETCHING_GROUPS,
  TOGGLE_DELETE_GROUP,
  CREATE_GROUP,
  GROUP_CREATED_SUCCESS,
  DELETE_GROUP,
  CREATE_GROUP_FAILURE,
  TOGGLE_SELECT_GROUPS,
  CLEAR_GROUP_ERRORS,
  SET_GROUP,
  EDIT_GROUP,
} from '../../../constants';

export const initialState = {
  groups: [],
  isFetching: false,
  success: false,
  errors: '',
  group: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_GROUPS:
      return {
        ...payload,
        isFetching: false,
        group: {},
        errors: '',
        success: true,
      };

    case FETCHING_GROUPS:
      return { ...state, ...payload, isFetching: true };

    case CREATE_GROUP:
      return { ...state, ...payload, isFetching: true };

    case GROUP_CREATED_SUCCESS:
      return {
        ...state,
        ...payload,
        isFetching: false,
        success: true,
      };

    case CREATE_GROUP_FAILURE:
      return { ...state, ...payload, isFetching: false };

    case CLEAR_GROUP_ERRORS:
      return {
        ...state,
        ...payload,
        errors: '',
        success: false,
      };
    case SET_GROUP: {
      return {
        ...state,
        ...payload,
      };
    }

    case TOGGLE_SELECT_GROUPS: {
      const groups = state.groups.map((group) => {
        const modifiedGroup = group;
        modifiedGroup.selected = payload.selected;
        return modifiedGroup;
      });
      return { ...state, ...groups };
    }
    case TOGGLE_DELETE_GROUP: {
      return state;
    }
    case EDIT_GROUP: {
      let groups = state.groups.slice();
      const findItem = (element) => element._id === payload._id;
      const index = groups.findIndex(findItem);
      groups = groups.filter((item) => item._id !== payload._id);
      groups.splice(index, 0, payload);
      return { ...state, groups };
    }

    case DELETE_GROUP: {
      let groups = state.groups.slice();
      groups = groups.filter((item) => item._id !== payload._id);
      return { ...state, groups };
    }

    default:
      return state;
  }
};
