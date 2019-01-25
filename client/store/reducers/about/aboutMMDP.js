import * as types from '../../../constants/about';

const initialState = {
  error: null,
  loading: false,
};

const aboutMMDP = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.ABOUT_MMDP_SUCCESS:
      return {
        ...action.payload,
        loading: false,
      };
    case types.ABOUT_MMDP_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.ABOUT_MMDP_FAILURE:
      return {
        error: action.payload,
        loading: false,
      };
    default: return state;
  }
};

export default aboutMMDP;
