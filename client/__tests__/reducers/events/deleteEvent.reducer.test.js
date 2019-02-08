/* eslint-disable no-undef */
import * as types from '../../../constants/events';
import deleteEvent, {
  initialState,
} from '../../../store/reducers/events/deleteEvent';

describe('delete event reducer', () => {
  it('should provide an initial state', () => {
    expect(deleteEvent(initialState, {})).toEqual({
      status: null,
      deleting: false,
      error: null,
    });
  });

  it('should make a delete event request', () => {
    expect(
      deleteEvent(initialState, {
        type: types.DELETE_EVENT_REQUEST,
        payload: { deleting: true },
      }).deleting,
    ).toEqual(true);
  });

  it('should handle delete event failure', () => {
    expect(
      deleteEvent(initialState, {
        type: types.DELETE_EVENT_FAILURE,
        payload: { deleting: false },
      }).deleting,
    ).toEqual(false);
  });
});
