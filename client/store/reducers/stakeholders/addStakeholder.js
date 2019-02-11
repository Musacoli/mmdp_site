import {
  ADD_STAKEHOLDER_REQUEST,
  ADD_STAKEHOLDER_SUCCESS,
  ADD_STAKEHOLDER_FAILURE,
} from '../../../constants/stakeholderDirectory';

export const initialState = {
  response: null,
  adding: false,
  error: null,
};

const addStakeholder = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_STAKEHOLDER_REQUEST:
      return {
        ...state,
        adding: true,
        error: null,
      };
    case ADD_STAKEHOLDER_SUCCESS:
      return {
        ...state,
        response: action.payload,
        adding: false,
        error: null,
      };
    case ADD_STAKEHOLDER_FAILURE:
      return {
        ...state,
        adding: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default addStakeholder;
