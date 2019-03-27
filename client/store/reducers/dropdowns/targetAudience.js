import {
  FETCH_TARGET_AUDIENCES,
  FETCHING_TARGET_AUDIENCES,
  CREATE_TARGET_AUDIENCES,
  UPDATE_TARGET_AUDIENCES,
  UPDATE_TARGET_AUDIENCES_FAILURE,
  CREATE_TARGET_AUDIENCES_FAILURE,
  DELETE_TARGET_AUDIENCE,
  TARGET_AUDIENCES_CREATED_SUCCESS,
} from '../../../constants/dropdowns/targetAudience';

export const initialState = {
  TargetAudiences: [],
  isFetching: false,
  success: false,
  errors: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TARGET_AUDIENCES:
      return {
        ...payload,
        isFetching: false,
        errors: '',
        success: true,
      };

    case FETCHING_TARGET_AUDIENCES:
      return {
        ...state,
        ...payload,
        isFetching: true,
      };

    case CREATE_TARGET_AUDIENCES:
      return { ...state, ...payload, isFetching: true };

    case UPDATE_TARGET_AUDIENCES:
      return { ...state, ...payload, isFetching: true };

    case TARGET_AUDIENCES_CREATED_SUCCESS:
      return {
        ...state,
        ...payload,
        isFetching: false,
        success: true,
      };

    case CREATE_TARGET_AUDIENCES_FAILURE:
      return { ...state, ...payload, isFetching: false };

    case UPDATE_TARGET_AUDIENCES_FAILURE:
      return { ...state, ...payload, isFetching: false };

    case DELETE_TARGET_AUDIENCE: {
      return { ...state, ...payload, loading: false };
    }

    default:
      return state;
  }
};
