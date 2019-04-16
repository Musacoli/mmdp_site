import * as types from '../../../constants/manageDropdowns/dropdowns';
import reducer, {
  initialState,
} from '../../../store/reducers/manageDropdowns/dropdowns';

describe('Fetch dropdowns reducer tests', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });
  it('should update state with FETCH_DROPDOWNS_SUCCESS payload', () => {
    const action = {
      type: types.FETCH_DROPDOWNS_SUCCESS,
      payload: { data: [] },
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      dropdowns: [],
      loading: false,
    });
  });
  it('should return loading as false with FETCH_DROPDOWNS_FAILURE', () => {
    const action = {
      type: types.FETCH_DROPDOWNS_FAILURE,
    };
    expect(reducer(initialState, action).loading).toBe(false);
  });
  it('should return loading as true with FETCH_DROPDOWNS', () => {
    const action = {
      type: types.FETCH_DROPDOWNS,
    };
    expect(reducer(initialState, action).loading).toBe(true);
  });
});
