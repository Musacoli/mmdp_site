import {
  ARCHIVE,
  ARCHIVE_SUCCESS,
  ARCHIVE_FAILURE,
} from '../../../../constants';
import reducer from '../../../../store/reducers/resources/archive';

describe('Archive reducer', () => {
  it('should return initial state', () => {
    expect(reducer({}, ARCHIVE)).toEqual({});
  });

  it('should return document  state with the data passed in', () => {
    const action = {
      type: ARCHIVE,
      payload: {
        id: 'xsssaeowidsuw',
      },
    };
    expect(reducer({}, action)).toEqual({
      loading: true,
      _id: action.payload,
    });
  });

  it('should return ARCHIVE_SUCCESS action with the data passed in', () => {
    const action = {
      type: ARCHIVE_SUCCESS,
      payload: {
        message: 'this is a test',
      },
    };
    expect(reducer({}, action)).toEqual({
      loading: false,
      message: action.payload,
    });
  });

  it('should return ARCHIVE_FAILURE action with the data passed in', () => {
    const action = {
      type: ARCHIVE_FAILURE,
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
