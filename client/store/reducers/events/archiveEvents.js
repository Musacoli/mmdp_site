import {
  ARCHIVE_EVENT,
  ARCHIVE_EVENT_FAILURE,
  ARCHIVE_EVENT_SUCCESS,
} from '../../../constants/events';

const initialState = {
  loading: false,
  _id: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ARCHIVE_EVENT:
      return { ...state, loading: true, _id: action.payload };
    case ARCHIVE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case ARCHIVE_EVENT_FAILURE:
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
