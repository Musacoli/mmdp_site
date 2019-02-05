import * as types from '../../../constants/about';

const initialState = {
  error: null,
  loading: false,
};

const edoStateApproach = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.EDO_STATE_APPROACH_SUCCESS:
      return {
        ...action.payload,
        loading: false,
      };
    case types.EDO_STATE_APPROACH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.EDO_STATE_APPROACH_FAILURE:
      return {
        error: action.payload,
        loading: false,
      };
    default: return state;
  }
};

export default edoStateApproach;
