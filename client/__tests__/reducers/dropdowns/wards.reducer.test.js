import * as types from '../../../constants/dropdowns/ward';
import reducer, { initialState } from '../../../store/reducers/dropdowns/ward';

describe('Fetch wards reducer tests', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });
  it('should update state with FETCH_WARDS_SUCCESS payload', () => {
    const action = {
      type: types.FETCH_WARDS_SUCCESS,
      payload: { data: [] },
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      loading: false,
    });
  });
  it('should return loading as false with FETCH_WARDS_FAILURE', () => {
    const action = {
      type: types.FETCH_WARDS_FAILURE,
    };
    expect(reducer(initialState, action).loading).toBe(false);
  });
  it('should return loading as true with FETCH_WARDS', () => {
    const action = {
      type: types.FETCH_WARDS,
    };
    expect(reducer(initialState, action).loading).toBe(true);
  });
});

describe('create wards reducer tests', () => {
  it('should update state with ADD_WARDS_SUCCESS payload', () => {
    const action = {
      type: types.ADD_WARDS_SUCCESS,
      payload: { data: [] },
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      loading: false,
    });
  });
  it('should return loading as false with ADD_WARDS_FAILURE', () => {
    const action = {
      type: types.ADD_WARDS_FAILURE,
    };
    expect(reducer(initialState, action).loading).toBe(false);
  });
  it('should return loading as true with ADD_WARDS', () => {
    const action = {
      type: types.ADD_WARDS,
    };
    expect(reducer(initialState, action).loading).toBe(true);
  });
});

describe('delete ward reducer tests', () => {
  it('should update state with DELETE_WARD_SUCCESS payload', () => {
    const action = {
      type: types.DELETE_WARD_SUCCESS,
      payload: { data: [] },
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      loading: false,
    });
  });
  it('should return loading as false with DELETE_WARD_FAILURE', () => {
    const action = {
      type: types.DELETE_WARD_FAILURE,
    };
    expect(reducer(initialState, action).loading).toBe(false);
  });
  it('should return loading as true with DELETE_WARD', () => {
    const action = {
      type: types.DELETE_WARD,
    };
    expect(reducer(initialState, action).loading).toBe(true);
  });
});
