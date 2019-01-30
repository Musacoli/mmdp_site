import * as types from '../../../constants/about';

const initialState = {
  error: null,
  loading: false,
  message: {},
};

const governorMessage = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GOVERNOR_MESSAGE_SUCCESS:
      return {
        ...action.payload,
        loading: false,
      };
    case types.GOVERNOR_MESSAGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.GOVERNOR_MESSAGE_FAILURE:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default governorMessage;
