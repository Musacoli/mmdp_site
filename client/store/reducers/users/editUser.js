import {
  EDIT_USER,
  USER_EDIT_ERROR,
  USER_EDIT_SUCCESS
} from "../../../constants/users";

const initialState = {
  status: false,
  success: false,
  isEditing: false
};
const editingReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER: {
      return { ...state, isEditing: true, status: false };
    }
    case USER_EDIT_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        status: false,
        success: true,
        isEditing: false
      };
    }
    case USER_EDIT_ERROR: {
      return {
        ...state,
        errors: action.payload,
        isEditing: false,
        status: true
      };
    }

    default:
      return state;
  }
};

export default editingReducer;
