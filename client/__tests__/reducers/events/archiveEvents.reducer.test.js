import {
  ARCHIVE_EVENT,
  ARCHIVE_EVENT_SUCCESS,
  ARCHIVE_EVENT_FAILURE,
} from '../../../constants/events';
import reducer from '../../../store/reducers/events/archiveEvents';

describe('Archive reducer', () => {
  it('should return initial state', () => {
    expect(reducer({}, ARCHIVE_EVENT)).toEqual({});
  });

  it('should return event  state with the data passed in', () => {
    const action = {
      type: ARCHIVE_EVENT,
      payload: {
        id: 'xsssaeowidsuw',
      },
    };
    expect(reducer({}, action)).toEqual({
      loading: true,
      _id: action.payload,
    });
  });

  it('should return ARCHIVE_EVENT_SUCCESS action with the data passed in', () => {
    const action = {
      type: ARCHIVE_EVENT_SUCCESS,
      payload: {
        message: 'this is a test',
      },
    };
    expect(reducer({}, action)).toEqual({
      loading: false,
      message: action.payload,
    });
  });

  it('should return ARCHIVE_EVENT_FAILURE action with the data passed in', () => {
    const action = {
      type: ARCHIVE_EVENT_FAILURE,
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
