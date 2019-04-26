import {
  COMPLETE_REGISTRATION_USER_START,
  COMPLETE_REGISTRATION_FAIL_OR_SUCCESS,
} from '../../../constants/users';

const initialState = {
  message: '',
  isRegistering: false,
  success: false,
  groups: null,
};

const registerUser = (state = initialState, action) => {
  const { payload } = action;
  let groups = null;
  if (payload && payload.user) {
    groups = payload.user.groups;
  }
  switch (action.type) {
    case COMPLETE_REGISTRATION_FAIL_OR_SUCCESS: {
      return {
        ...state,
        isRegistering: false,
        success: payload.status === 'success',
        message: payload.message,
        groups,
      };
    }
    case COMPLETE_REGISTRATION_USER_START: {
      return {
        ...state,
        isRegistering: true,
        success: false,
        message: '',
        groups: null,
      };
    }
    default:
      return state;
  }
};

export default registerUser;
