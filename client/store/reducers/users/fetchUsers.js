import {
  FETCHING_STARTED,
  FETCHING_USERS_SUCCESS,
  FETCHING_USERS_ERROR
} from "../../../constants/users/";

const initialState = {
  users:[],
  isFetching: false,
  success: false,
  error: false
};

const fetchUsers = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_STARTED: {
      return {
        ...state,
        isFetching: true,
        success: false,
        error: false
      };
    }
    case FETCHING_USERS_SUCCESS: {
      return {
        ...state,
        success: true,
        error: false,
        users: action.payload
      };
    }
    case FETCHING_USERS_ERROR: {
      return {
        ...state,
        success: false,
        error: true,
        errors: action.payload
      };
    }
    default:
      return state;
  }
};

export default fetchUsers;
