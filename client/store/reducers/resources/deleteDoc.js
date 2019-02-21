import {
  DELETE,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} from '../../../constants/resources/document';

const initialState = {
  loading: false,
  _id: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE:
      return { ...state, loading: true, _id: action.payload };
    case DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
