import {
  FETCH_STAFF_STRENGTHS,
  FETCHING_STAFF_STRENGTHS,
  CREATE_STAFF_STRENGTHS,
  CREATE_STAFF_STRENGTHS_FAILURE,
  DELETE_STAFF_STRENGTH,
  STAFF_STRENGTHS_CREATED_SUCCESS,
} from '../../../constants/staffStrength';

export const initialState = {
  staffStrengths: [],
  isFetching: false,
  success: false,
  errors: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_STAFF_STRENGTHS:
      return {
        ...payload,
        isFetching: false,
        errors: '',
        success: true,
      };

    case FETCHING_STAFF_STRENGTHS:
      return {
        ...state,
        ...payload,
        isFetching: true,
      };

    case CREATE_STAFF_STRENGTHS:
      return { ...state, ...payload, isFetching: true };

    case STAFF_STRENGTHS_CREATED_SUCCESS:
      return {
        ...state,
        ...payload,
        isFetching: false,
        success: true,
      };

    case CREATE_STAFF_STRENGTHS_FAILURE:
      return { ...state, ...payload, isFetching: false };

    case DELETE_STAFF_STRENGTH: {
      let staffStrengths = state.staffStrengths.slice();
      staffStrengths = staffStrengths.filter(
        (option) => option.id !== payload._id,
      );
      return { ...state, staffStrengths };
    }

    default:
      return state;
  }
};
