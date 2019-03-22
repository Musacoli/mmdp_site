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

/** DELETE SUBTHEME */
export const deleteSubTheme = (payload) => ({
  type: DELETE_SUBTHEME,
  payload,
});

export const deleteSubThemeSuccess = (payload) => ({
  type: DELETE_SUBTHEME_SUCCESS,
  payload,
});

export const deleteSubThemeFailure = (payload) => ({
  type: DELETE_SUBTHEME_FAILURE,
  payload,
});

/** FETCH SUBTHEMES */
export const fetchSubThemes = (payload) => ({
  type: FETCH_SUBTHEMES,
  payload,
});

export const fetchSubThemesSuccess = (payload) => ({
  type: FETCH_SUBTHEMES_SUCCESS,
  payload,
});

export const fetchSubThemesFailure = (payload) => ({
  type: FETCH_SUBTHEMES_FAILURE,
  payload,
});

/** ADD SUBTHEMES */
export const addSubThemes = (payload) => ({
  type: ADD_SUBTHEMES,
  payload,
});

export const addSubThemesSuccess = (payload) => ({
  type: ADD_SUBTHEMES_SUCCESS,
  payload,
});

export const addSubThemesFailure = (payload) => ({
  type: ADD_SUBTHEMES_FAILURE,
  payload,
});
