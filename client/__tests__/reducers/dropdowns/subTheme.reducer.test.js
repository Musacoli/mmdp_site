import * as types from '../../../constants/dropdowns/subTheme';
import reducer, {
  initialState,
} from '../../../store/reducers/dropdowns/subTheme';

describe('Fetch subThemes reducer tests', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });
  it('should update state with FETCH_SUBTHEMES_SUCCESS payload', () => {
    const action = {
      type: types.FETCH_SUBTHEMES_SUCCESS,
      payload: { data: [] },
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      loading: false,
    });
  });
  it('should return loading as false with FETCH_SUBTHEMES_FAILURE', () => {
    const action = {
      type: types.FETCH_SUBTHEMES_FAILURE,
    };
    expect(reducer(initialState, action).loading).toBe(false);
  });
  it('should return loading as true with FETCH_SUBTHEMES', () => {
    const action = {
      type: types.FETCH_SUBTHEMES,
    };
    expect(reducer(initialState, action).loading).toBe(true);
  });
});

describe('create subThemes reducer tests', () => {
  it('should update state with ADD_SUBTHEMES_SUCCESS payload', () => {
    const action = {
      type: types.ADD_SUBTHEMES_SUCCESS,
      payload: { data: [] },
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      loading: false,
    });
  });
  it('should return loading as false with ADD_SUBTHEMES_FAILURE', () => {
    const action = {
      type: types.ADD_SUBTHEMES_FAILURE,
    };
    expect(reducer(initialState, action).loading).toBe(false);
  });
  it('should return loading as true with ADD_SUBTHEMES', () => {
    const action = {
      type: types.ADD_SUBTHEMES,
    };
    expect(reducer(initialState, action).loading).toBe(true);
  });
});

describe('delete subTheme reducer tests', () => {
  it('should update state with DELETE_SUBTHEME_SUCCESS payload', () => {
    const action = {
      type: types.DELETE_SUBTHEME_SUCCESS,
      payload: { data: [] },
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      loading: false,
    });
  });
  it('should return loading as false with DELETE_SUBTHEME_FAILURE', () => {
    const action = {
      type: types.DELETE_SUBTHEME_FAILURE,
    };
    expect(reducer(initialState, action).loading).toBe(false);
  });
  it('should return loading as true with DELETE_SUBTHEME', () => {
    const action = {
      type: types.DELETE_SUBTHEME,
    };
    expect(reducer(initialState, action).loading).toBe(true);
  });
});
