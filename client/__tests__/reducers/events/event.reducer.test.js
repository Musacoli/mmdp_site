/* eslint-disable no-undef */
import * as types from '../../../constants/events';
import createEvent, {
  initialState,
} from '../../../store/reducers/events/event';

describe('create event reducer', () => {
  it('should provide an initial state', () => {
    expect(createEvent(initialState, {})).toEqual({
      response: null,
      adding: false,
      error: null,
    });
  });

  it('should make a create event request', () => {
    expect(
      createEvent(initialState, {
        type: types.ADD_EVENT_REQUEST,
        payload: { adding: true },
      }).adding,
    ).toEqual(true);
  });

  it('should add event successfully', () => {
    expect(
      createEvent(initialState, {
        type: types.ADD_EVENT_SUCCESS,
        payload: { adding: false },
      }).adding,
    ).toEqual(false);
  });

  it('should handle add event failure', () => {
    expect(
      createEvent(initialState, {
        type: types.ADD_EVENT_FAILURE,
        payload: { adding: false },
      }).adding,
    ).toEqual(false);
  });
});
