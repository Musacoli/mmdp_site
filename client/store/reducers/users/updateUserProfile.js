import {
  UPDATE_USER_PROFILE_COMPLETE,
  UPDATE_USER_PROFILE,
} from '../../../constants/users';

const initialState = {
  response: null,
  isUpdating: false,
  success: false,
};

const updateUserProfile = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE: {
      return {
        ...state,
        isUpdating: true,
        success: false,
        response: null,
      };
    }
    case UPDATE_USER_PROFILE_COMPLETE: {
      return {
        ...state,
        isUpdating: false,
        success: action.payload.status === 'success',
        response: action.payload.message,
      };
    }
    default:
      return state;
  }
};

export default updateUserProfile;
