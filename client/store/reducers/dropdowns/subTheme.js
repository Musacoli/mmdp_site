import {
  ADD_SUBTHEMES,
  ADD_SUBTHEMES_FAILURE,
  ADD_SUBTHEMES_SUCCESS,
  FETCH_SUBTHEMES,
  FETCH_SUBTHEMES_FAILURE,
  FETCH_SUBTHEMES_SUCCESS,
  DELETE_SUBTHEME,
  DELETE_SUBTHEME_FAILURE,
  DELETE_SUBTHEME_SUCCESS,
} from '../../../constants/dropdowns/subTheme';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_SUBTHEMES:
      return { ...state, ...payload, loading: true };
    case ADD_SUBTHEMES_FAILURE:
      return { ...state, ...payload, loading: false };
    case ADD_SUBTHEMES_SUCCESS:
      return { ...state, ...payload, loading: false };

    case DELETE_SUBTHEME:
      return { ...state, ...payload, loading: true };
    case DELETE_SUBTHEME_FAILURE:
      return { ...state, ...payload, loading: false };
    case DELETE_SUBTHEME_SUCCESS:
      return { ...state, ...payload, loading: false };

    case FETCH_SUBTHEMES:
      return { ...state, ...payload, loading: true };
    case FETCH_SUBTHEMES_SUCCESS:
      return { ...state, ...payload, loading: false };
    case FETCH_SUBTHEMES_FAILURE:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};
