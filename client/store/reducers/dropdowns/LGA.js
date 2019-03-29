import {
  ADD_LGA_REQUEST,
  ADD_LGA_FAILURE,
  ADD_LGA_SUCCESS,
  GET_LGA_REQUEST,
  GET_LGA_FAILURE,
  GET_LGA_SUCCESS,
  DELETE_LGA_REQUEST,
  DELETE_LGA_FAILURE,
  DELETE_LGA_SUCCESS,
  UPDATE_LGA_FAILURE,
  UPDATE_LGA_REQUEST,
  UPDATE_LGA_SUCCESS,
} from '../../../constants/dropdowns/LGA';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_LGA_REQUEST:
      return { loading: true };
    case ADD_LGA_SUCCESS:
      return { loading: false };
    case ADD_LGA_FAILURE:
      return { loading: false };

    case DELETE_LGA_REQUEST:
      return { loading: true };
    case DELETE_LGA_SUCCESS:
      return { loading: false };
    case DELETE_LGA_FAILURE:
      return { loading: false };

    case UPDATE_LGA_REQUEST:
      return { loading: true };
    case UPDATE_LGA_SUCCESS:
      return { loading: false };
    case UPDATE_LGA_FAILURE:
      return { loading: false };

    case GET_LGA_REQUEST:
      return { loading: true };
    case GET_LGA_SUCCESS:
      return { loading: false, data: payload };
    case GET_LGA_FAILURE:
      return { loading: false };
    default:
      return state;
  }
};
