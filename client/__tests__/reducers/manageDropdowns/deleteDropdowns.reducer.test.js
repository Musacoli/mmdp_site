import * as types from '../../../constants/manageDropdowns/dropdowns';
import reducer, {
  initialState,
} from '../../../store/reducers/manageDropdowns/deleteD';

describe('Delete dropdowns reducer tests', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });
  it('should update state with DELETE_DROPDOWNS_SUCCESS payload', () => {
    const action = {
      type: types.DELETE_DROPDOWNS_SUCCESS,
      payload: { data: [] },
    };
    expect(reducer(initialState, action)).toEqual({
      _id: '',
      loading: false,
      message: { data: [] },
    });
  });
  it('should return loading as false with DELETE_DROPDOWNS_FAILURE', () => {
    const action = {
      type: types.DELETE_DROPDOWNS_FAILURE,
    };
    expect(reducer(initialState, action).loading).toBe(false);
  });
  it('should return loading as true with DELETE_DROPDOWNS', () => {
    const action = {
      type: types.DELETE_DROPDOWNS,
    };
    expect(reducer(initialState, action).loading).toBe(true);
  });
});
