import {
  DELETE_DROPDOWNS,
  DELETE_DROPDOWNS_SUCCESS,
  DELETE_DROPDOWNS_FAILURE,
} from '../../../constants/manageDropdowns/dropdowns';

export const initialState = {
  loading: false,
  _id: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_DROPDOWNS:
      return { ...state, loading: true, _id: action.payload };
    case DELETE_DROPDOWNS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case DELETE_DROPDOWNS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
