/* eslint-disable no-undef */
import * as types from '../../../constants/dropdowns/subTheme';
import * as actions from '../../../store/actions/dropdowns/subTheme';

describe('List subThemes action tests', () => {
  it('should dispatch FETCH_SUBTHEMES', () => {
    expect(actions.fetchSubThemes({}).type).toEqual(types.FETCH_SUBTHEMES);
  });
  it('should dispatch FETCH_SUBTHEMES_SUCCESS', () => {
    expect(actions.fetchSubThemesSuccess({}).type).toEqual(
      types.FETCH_SUBTHEMES_SUCCESS,
    );
  });
  it('should dispatch FETCH_SUBTHEMES_FAILURE', () => {
    expect(actions.fetchSubThemesFailure({}).type).toEqual(
      types.FETCH_SUBTHEMES_FAILURE,
    );
  });
});

describe('create subThemes action tests', () => {
  it('should dispatch ADD_SUBTHEMES', () => {
    expect(actions.addSubThemes({}).type).toEqual(types.ADD_SUBTHEMES);
  });
  it('should dispatch ADD_SUBTHEMES_SUCCESS', () => {
    expect(actions.addSubThemesSuccess({}).type).toEqual(
      types.ADD_SUBTHEMES_SUCCESS,
    );
  });
  it('should dispatch ADD_SUBTHEMES_FAILURE', () => {
    expect(actions.addSubThemesFailure({}).type).toEqual(
      types.ADD_SUBTHEMES_FAILURE,
    );
  });
});
describe('Delete subTheme action tests', () => {
  it('should dispatch DELETE_SUBTHEME', () => {
    expect(actions.deleteSubTheme({}).type).toEqual(types.DELETE_SUBTHEME);
  });
  it('should dispatch DELETE_SUBTHEME_SUCCESS', () => {
    expect(actions.deleteSubThemeSuccess({}).type).toEqual(
      types.DELETE_SUBTHEME_SUCCESS,
    );
  });
  it('should dispatch DELETE_SUBTHEME_FAILURE', () => {
    expect(actions.deleteSubThemeFailure({}).type).toEqual(
      types.DELETE_SUBTHEME_FAILURE,
    );
  });
});
