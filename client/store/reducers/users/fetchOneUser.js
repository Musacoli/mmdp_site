import {
  FETCHING_ONE,
  FETCHING_ONE_USER_SUCCESS,
  FETCHING_ONE_USER_ERROR,
} from '../../../constants/users';

const initialState = {
  singleUser: null,
  isFetching: false,
  success: false,
  error: false,
};

const fetchOneUser = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_ONE: {
      return {
        ...state,
        isFetching: true,
        success: false,
        error: false,
      };
    }
    case FETCHING_ONE_USER_SUCCESS: {
      return {
        ...state,
        success: true,
        error: false,
        singleUser: action.payload,
      };
    }
    case FETCHING_ONE_USER_ERROR: {
      return {
        ...state,
        success: false,
        error: true,
        errors: action.payload,
      };
    }
    default:
      return state;
  }
};

export default fetchOneUser;
