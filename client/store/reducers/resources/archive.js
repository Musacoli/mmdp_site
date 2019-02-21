import {
  ARCHIVE,
  ARCHIVE_SUCCESS,
  ARCHIVE_FAILURE,
} from '../../../constants/resources/document';

const initialState = {
  loading: false,
  _id: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ARCHIVE:
      return { ...state, loading: true, _id: action.payload };
    case ARCHIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case ARCHIVE_FAILURE:
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
