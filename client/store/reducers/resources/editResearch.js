import {
  GET_SINGLE_RESEARCH_FAILURE,
  GET_SINGLE_RESEARCH_SUCCESS,
  GET_SINGLE_RESEARCH_REQUEST,
  UPDATE_RESEARCH_REQUEST,
  UPDATE_RESEARCH_FAILURE,
  UPDATE_RESEARCH_SUCCESS,
  UPDATE_INPUT_DATA,
} from '../../../constants/resources/research';

const intialState = {
  loading: false,
  researchItem: {},
  updateInput: {},
  error: {},
};

const UpdateReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_SINGLE_RESEARCH_REQUEST:
      return { ...state, loading: true };
    case GET_SINGLE_RESEARCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_SINGLE_RESEARCH_SUCCESS:
      return { ...state, loading: false, researchItem: action.payload };
    case UPDATE_INPUT_DATA:
      return { ...state, loading: false, updateInput: action.payload };
    case UPDATE_RESEARCH_REQUEST:
      return { ...state, loading: true };
    case UPDATE_RESEARCH_FAILURE:
      return { ...state, loading: false };
    case UPDATE_RESEARCH_SUCCESS:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};

export default UpdateReducer;
