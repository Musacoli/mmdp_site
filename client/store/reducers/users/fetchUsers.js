import {
  FETCHING_STARTED,
  FETCHING_USERS_SUCCESS,
  FETCHING_USERS_ERROR,
} from '../../../constants/users';

import { getPaginationData } from '../../../utils/helpers';

const initialState = {
  users: [],
  pagination: {},
  isFetching: false,
  success: false,
  error: false,
};

const fetchUsers = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_STARTED: {
      return {
        ...state,
        isFetching: true,
        success: false,
        error: false,
      };
    }
    case FETCHING_USERS_SUCCESS: {
      return {
        ...state,
        success: true,
        error: false,
        pagination: getPaginationData(action.payload.pagination),
        users: action.payload.users,
      };
    }
    case FETCHING_USERS_ERROR: {
      return {
        ...state,
        success: false,
        error: true,
        pagination: {},
        errors: action.payload,
      };
    }
    default:
      return state;
  }
};

export default fetchUsers;
