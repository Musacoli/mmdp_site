import * as types from '../../../constants/about';

const initialState = {
  error: null,
  loading: false,
};

const objectives = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.OBJECTIVES_SUCCESS:
      return {
        ...action.payload,
        loading: false,
      };
    case types.OBJECTIVES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.OBJECTIVES_FAILURE:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default objectives;
