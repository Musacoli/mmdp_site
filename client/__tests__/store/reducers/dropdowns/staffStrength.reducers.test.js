import {
  FETCH_STAFF_STRENGTHS,
  FETCHING_STAFF_STRENGTHS,
  STAFF_STRENGTHS_CREATED_SUCCESS,
  UPDATE_STAFF_STRENGTHS_FAILURE,
  UPDATE_STAFF_STRENGTHS,
  DELETE_STAFF_STRENGTH,
  CREATE_STAFF_STRENGTHS_FAILURE,
  CREATE_STAFF_STRENGTHS,
} from '../../../../constants/dropdowns/staffStrength';
import staffStrengthReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/staffStrength';

describe('staffStrengthReducer Reducer', () => {
  it('should provide an initial state', () => {
    expect(staffStrengthReducer(initialState, {})).toEqual(initialState);
  });
  it('should fetch staffStrengthReducer', () => {
    expect(
      staffStrengthReducer(null, {
        type: FETCH_STAFF_STRENGTHS,
        payload: { isFetching: false },
      }).isFetching,
    ).toEqual(false);
  });
  it('should show fetching staff strengths', () => {
    expect(
      staffStrengthReducer(null, {
        type: FETCHING_STAFF_STRENGTHS,
        payload: { staffStrengths: { staffStrength: [] } },
      }).isFetching,
    ).toEqual(true);
  });
  it('should delete staff strength', () => {
    expect(
      staffStrengthReducer(null, {
        type: DELETE_STAFF_STRENGTH,
        payload: {},
      }),
    ).toEqual({ loading: false });
  });

  it('should create staff strength', () => {
    expect(
      staffStrengthReducer(null, {
        type: CREATE_STAFF_STRENGTHS,
        payload: {},
      }).isFetching,
    ).toEqual(true);
  });

  it('should update staff strength', () => {
    expect(
      staffStrengthReducer(null, {
        type: UPDATE_STAFF_STRENGTHS,
        payload: {},
      }).isFetching,
    ).toEqual(true);
  });

  it('should set staff strength as created successfully', () => {
    expect(
      staffStrengthReducer(null, {
        type: STAFF_STRENGTHS_CREATED_SUCCESS,
        payload: {},
      }).isFetching,
    ).toEqual(false);
  });

  it('should delete a staff strength', () => {
    expect(
      staffStrengthReducer(initialState, {
        type: DELETE_STAFF_STRENGTH,
        payload: {},
      }).isFetching,
    ).toEqual(false);
  });

  it('should show staff strength failure', () => {
    expect(
      staffStrengthReducer(initialState, {
        type: CREATE_STAFF_STRENGTHS_FAILURE,
        payload: {},
      }).isFetching,
    ).toEqual(false);
  });

  it('should show update staff strength failure', () => {
    expect(
      staffStrengthReducer(initialState, {
        type: UPDATE_STAFF_STRENGTHS_FAILURE,
        payload: {},
      }).isFetching,
    ).toEqual(false);
  });
});
