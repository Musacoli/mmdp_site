import {
  DELETING_USER,
  DELETING_SUCCESS,
  DELETING_FAILURE,
} from '../../../constants/users';

const initialState = {
  message: '',
  error: '',
  isDeleting: false,
  success: false,
};

const deleteUser = (state = initialState, action) => {
  switch (action.type) {
    case DELETING_USER: {
      return {
        ...state,
        isDeleting: true,
        success: false,
      };
    }
    case DELETING_SUCCESS: {
      return {
        ...state,
        isDeleting: false,
        success: true,
        message: action.payload,
      };
    }
    case DELETING_FAILURE: {
      return {
        ...state,
        isDeleting: false,
        success: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default deleteUser;
