import * as types from '../../../constants/about';

const initialState = {
  error: null,
  loading: false,
  highlight: [],
  highlightIds: [],
};

const coordination = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.COORDINATION_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case types.COORDINATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.COORDINATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default coordination;
