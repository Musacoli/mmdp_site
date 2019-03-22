import {
  FETCH_FOCUS_AREA,
  FETCH_FOCUS_AREA_SUCCESS,
  ADD_FOCUS_AREA,
  ADD_FOCUS_AREA_FAILURE,
  ADD_FOCUS_AREA_SUCCESS,
  DELETE_FOCUS_AREA,
  DELETE_FOCUS_AREA_SUCCESS,
  DELETE_FOCUS_AREA_FAILURE,
} from '../../../../constants/dropdowns/focusArea';
import focusAreaReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/focusArea';

describe('focusAreaReducer Reducer', () => {
  it('should provide an initial state', () => {
    expect(focusAreaReducer(initialState, {})).toEqual(initialState);
  });
  it('should fetch focusAreaReducer', () => {
    expect(
      focusAreaReducer(null, {
        type: FETCH_FOCUS_AREA,
        payload: { loading: true },
      }).loading,
    ).toEqual(true);
  });
  it('should show fetching Focus Area options', () => {
    expect(
      focusAreaReducer(null, {
        type: FETCH_FOCUS_AREA_SUCCESS,
        payload: { focusAreas: { data: [] } },
      }).loading,
    ).toEqual(false);
  });
  it('should delete Focus Area option', () => {
    expect(
      focusAreaReducer(null, {
        type: DELETE_FOCUS_AREA,
        payload: {},
      }),
    ).toEqual({ loading: true });
  });

  it('should show create Focus Area option', () => {
    expect(
      focusAreaReducer(null, {
        type: ADD_FOCUS_AREA,
        payload: {},
      }).loading,
    ).toEqual(true);
  });

  it('should successfully add Focus Area option', () => {
    expect(
      focusAreaReducer(null, {
        type: ADD_FOCUS_AREA_SUCCESS,
        payload: {},
      }).loading,
    ).toEqual(false);
  });

  it('should show error while adding Focus Area options', () => {
    expect(
      focusAreaReducer(null, {
        type: ADD_FOCUS_AREA_FAILURE,
        payload: {},
      }).loading,
    ).toEqual(false);
  });

  it('should show success while fetching Focus Area options', () => {
    expect(
      focusAreaReducer(initialState, {
        type: FETCH_FOCUS_AREA_SUCCESS,
        payload: {},
      }).loading,
    ).toEqual(false);
  });

  it('should show fail when deleting Focus Area option', () => {
    expect(
      focusAreaReducer(null, {
        type: DELETE_FOCUS_AREA_FAILURE,
        payload: {},
      }).loading,
    ).toEqual(false);
  });

  it('should show delete Focus Area option', () => {
    expect(
      focusAreaReducer(initialState, {
        type: DELETE_FOCUS_AREA_SUCCESS,
        payload: {},
      }).loading,
    ).toEqual(false);
  });
});
