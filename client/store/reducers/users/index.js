import {
  REGISTER_USER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from '../../../constants/users';

const initialState = {
  status: false,
  success: false,
  isRegistering: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      return { ...state, isRegistering: true,  status: false,};
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        status: false,
        success: true,
        isRegistering: false,
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        errors: action.payload,
        isRegistering: false,
        status: true
      };
    }

    default:
      return state;
  }
};

export default reducer;
