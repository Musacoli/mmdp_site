import { DELETE, DELETE_SUCCESS, DELETE_FAILURE } from '../../../../constants';
import reducer from '../../../../store/reducers/resources/deleteDoc';

describe('Archive reducer', () => {
  it('should return initial state', () => {
    expect(reducer({}, DELETE)).toEqual({});
  });

  it('should return delete state with the data passed in', () => {
    const action = {
      type: DELETE,
      payload: {
        id: 'xsssaeowidsuw',
      },
    };
    expect(reducer({}, action)).toEqual({
      loading: true,
      _id: action.payload,
    });
  });

  it('should return DELETE_SUCCESS action with the data passed in', () => {
    const action = {
      type: DELETE_SUCCESS,
      payload: {
        message: 'this is a test',
      },
    };
    expect(reducer({}, action)).toEqual({
      loading: false,
      message: action.payload,
    });
  });

  it('should return DELETE_FAILURE action with the data passed in', () => {
    const action = {
      type: DELETE_FAILURE,
      payload: {
        error: 'something went wrong',
      },
    };
    expect(reducer({}, action)).toEqual({
      loading: false,
      error: action.payload,
    });
  });
});
