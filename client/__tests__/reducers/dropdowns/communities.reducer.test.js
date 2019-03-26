import * as types from '../../../constants/dropdowns/communities';
import reducer, {
  initialState,
} from '../../../store/reducers/dropdowns/communities';

describe('Fetch communities reducer tests', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });
  it('should update state with FETCH_COMMUNITIES_SUCCESS payload', () => {
    const action = {
      type: types.FETCH_COMMUNITIES_SUCCESS,
      payload: { data: [] },
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isFetched: true,
      loading: false,
      isDeleted: false,
    });
  });
  it('should return loading as false with FETCH_COMMUNITIES_FAILURE', () => {
    const action = {
      type: types.FETCH_COMMUNITIES_FAILURE,
    };
    expect(reducer(initialState, action).loading).toBe(false);
  });
  it('should return loading as true with FETCH_COMMUNITIES', () => {
    const action = {
      type: types.FETCH_COMMUNITIES,
    };
    expect(reducer(initialState, action).loading).toBe(true);
  });
});

describe('create communities reducer tests', () => {
  it('should update state with ADD_COMMUNITIES_SUCCESS payload', () => {
    const action = {
      type: types.ADD_COMMUNITIES_SUCCESS,
      payload: { data: [] },
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isFetched: false,
      loading: false,
      isDeleted: false,
    });
  });
  it('should return loading as false with ADD_COMMUNITIES_FAILURE', () => {
    const action = {
      type: types.ADD_COMMUNITIES_FAILURE,
    };
    expect(reducer(initialState, action).loading).toBe(false);
  });
  it('should return loading as true with ADD_COMMUNITIES', () => {
    const action = {
      type: types.ADD_COMMUNITIES,
    };
    expect(reducer(initialState, action).loading).toBe(true);
  });
});

describe('Delete community reducer tests', () => {
  it('should update state with DELETE_COMMUNITIES_SUCCESS payload', () => {
    const action = {
      type: types.DELETE_COMMUNITY_SUCCESS,
      payload: { data: [] },
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isFetched: false,
      loading: false,
      isDeleted: true,
    });
  });
  it('should return loading as false with DELETE_COMMUNITY_FAILURE', () => {
    const action = {
      type: types.DELETE_COMMUNITY_FAILURE,
    };
    expect(reducer(initialState, action).loading).toBe(false);
  });
  it('should return loading as true with DELETE_COMMUNITIES', () => {
    const action = {
      type: types.DELETE_COMMUNITY,
    };
    expect(reducer(initialState, action).loading).toBe(true);
  });
});
