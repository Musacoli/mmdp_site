import {
  ADD_ORGANIZATION_TYPE_REQUEST,
  ADD_ORGANIZATION_TYPE_FAILURE,
  ADD_ORGANIZATION_TYPE_SUCCESS,
  GET_ORGANIZATION_TYPE_REQUEST,
  GET_ORGANIZATION_TYPE_FAILURE,
  GET_ORGANIZATION_TYPE_SUCCESS,
  DELETE_ORGANIZATION_TYPE_REQUEST,
  DELETE_ORGANIZATION_TYPE_FAILURE,
  DELETE_ORGANIZATION_TYPE_SUCCESS,
  UPDATE_ORGANIZATION_TYPE_FAILURE,
  UPDATE_ORGANIZATION_TYPE_REQUEST,
  UPDATE_ORGANIZATION_TYPE_SUCCESS,
} from '../../../constants/dropdowns/organizationType';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ORGANIZATION_TYPE_REQUEST:
      return { loading: true };
    case ADD_ORGANIZATION_TYPE_SUCCESS:
      return { loading: false };
    case ADD_ORGANIZATION_TYPE_FAILURE:
      return { loading: false };

    case DELETE_ORGANIZATION_TYPE_REQUEST:
      return { loading: true };
    case DELETE_ORGANIZATION_TYPE_SUCCESS:
      return { loading: false };
    case DELETE_ORGANIZATION_TYPE_FAILURE:
      return { loading: false };

    case UPDATE_ORGANIZATION_TYPE_REQUEST:
      return { loading: true };
    case UPDATE_ORGANIZATION_TYPE_SUCCESS:
      return { loading: false };
    case UPDATE_ORGANIZATION_TYPE_FAILURE:
      return { loading: false };

    case GET_ORGANIZATION_TYPE_REQUEST:
      return { loading: true };
    case GET_ORGANIZATION_TYPE_SUCCESS:
      return { loading: false, data: payload };
    case GET_ORGANIZATION_TYPE_FAILURE:
      return { loading: false };
    default:
      return state;
  }
};
