import {
  ADD_FOCUS_AREA,
  ADD_FOCUS_AREA_SUCCESS,
  ADD_FOCUS_AREA_FAILURE,
  FETCH_FOCUS_AREA,
  FETCH_FOCUS_AREA_SUCCESS,
  FETCH_FOCUS_AREA_FAILURE,
  DELETE_FOCUS_AREA,
  DELETE_FOCUS_AREA_SUCCESS,
  DELETE_FOCUS_AREA_FAILURE,
} from '../../../constants/dropdowns/focusArea';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FOCUS_AREA:
      return { ...state, ...payload, loading: true };
    case ADD_FOCUS_AREA_SUCCESS:
      return { ...state, ...payload, loading: false };
    case ADD_FOCUS_AREA_FAILURE:
      return { ...state, ...payload, loading: false };

    case FETCH_FOCUS_AREA:
      return { ...state, ...payload, loading: true };
    case FETCH_FOCUS_AREA_SUCCESS:
      return { ...state, ...payload, loading: false };
    case FETCH_FOCUS_AREA_FAILURE:
      return { ...state, ...payload, loading: false };

    case DELETE_FOCUS_AREA:
      return { ...state, ...payload, loading: true };
    case DELETE_FOCUS_AREA_SUCCESS:
      return { ...state, ...payload, loading: false };
    case DELETE_FOCUS_AREA_FAILURE:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};
