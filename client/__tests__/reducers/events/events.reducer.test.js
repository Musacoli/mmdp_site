/* eslint-disable no-undef */
import * as types from '../../../constants/events';
import listEvents, {
  initialState,
} from '../../../store/reducers/events/events';

describe('list events reducer', () => {
  it('should provide an initial state', () => {
    expect(listEvents(initialState, {})).toEqual(initialState);
  });

  it('should make list events request', () => {
    expect(
      listEvents(initialState, {
        type: types.LIST_EVENTS_REQUEST,
        payload: { fetching: true },
      }).fetching,
    ).toEqual(true);
  });

  it('should handle list events failure', () => {
    expect(
      listEvents(initialState, {
        type: types.LIST_EVENTS_FAILURE,
        payload: { fetching: false },
      }).fetching,
    ).toEqual(false);
  });
});
