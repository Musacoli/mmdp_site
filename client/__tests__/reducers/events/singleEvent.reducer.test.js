/* eslint-disable no-undef */
import * as types from '../../../constants/events';
import SingleEvent from '../../../store/reducers/events/singleEvent';

describe('single event reducer', () => {
  const initialState = {
    data: {},
    error: {},
    inputData: {},
  };

  const data = { title: 'Empower' };

  it('should make fetch single event request', () => {
    expect(
      SingleEvent(initialState, {
        type: types.SINGLE_EVENT_REQUEST,
        payload: { loading: true },
      }).loading,
    ).toEqual(true);
  });

  it('should fetch single event successfully', () => {
    expect(
      SingleEvent(initialState, {
        type: types.SINGLE_EVENT_SUCCESS,
        payload: data,
      }).data,
    ).toEqual(data);
  });

  it('should handle fetch single event failure', () => {
    expect(
      SingleEvent(initialState, {
        type: types.SINGLE_EVENT_FAILURE,
        payload: { loading: false },
      }).loading,
    ).toEqual(false);
  });

  it('should update data', () => {
    expect(
      SingleEvent(initialState, {
        type: types.UPDATE_DATA,
        payload: { title: 'Empower' },
      }).inputData,
    ).toEqual({ title: 'Empower' });
  });
});
