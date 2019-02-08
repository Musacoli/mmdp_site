/* eslint-disable no-undef */
import * as types from '../../constants/events';
import * as actions from '../../store/actions/events/event';

describe('List events action creators', () => {
  it('should dispatch LIST_EVENTS_REQUEST action', () => {
    expect(actions.listEvents({}).type).toEqual(types.LIST_EVENTS_REQUEST);
  });

  it('should dispatch LIST_EVENTS_SUCCESS action', () => {
    expect(actions.listEventsSuccess({}).type).toEqual(
      types.LIST_EVENTS_SUCCESS,
    );
  });

  it('should dispatch LIST_EVENTS_FAILURE action', () => {
    expect(actions.listEventsFailure({}).type).toEqual(
      types.LIST_EVENTS_FAILURE,
    );
  });
});

describe('create event action creators', () => {
  it('should dispatch create event request action', () => {
    expect(actions.addEventRequest({}).type).toEqual(types.ADD_EVENT_REQUEST);
  });

  it('should dispatch create event success action', () => {
    expect(actions.eventCreated({}).type).toEqual(types.ADD_EVENT_SUCCESS);
  });

  it('should dispatch create event failure action', () => {
    expect(actions.creationFailed({}).type).toEqual(types.ADD_EVENT_FAILURE);
  });
});

describe('delete event action creators', () => {
  it('should dispatch delete event request action', () => {
    expect(actions.deleteEvent({}).type).toEqual(types.DELETE_EVENT_REQUEST);
  });

  it('should dispatch delete event success action', () => {
    expect(actions.deleteEventSuccess({}).type).toEqual(
      types.DELETE_EVENT_SUCCESS,
    );
  });

  it('should dispatch delete event failure action', () => {
    expect(actions.deleteEventFailure({}).type).toEqual(
      types.DELETE_EVENT_FAILURE,
    );
  });
});

describe('single event action creators', () => {
  it('should dispatch single event request action', () => {
    expect(actions.SingleEventRequest({}).type).toEqual(
      types.SINGLE_EVENT_REQUEST,
    );
  });

  it('should dispatch single event success action', () => {
    expect(actions.SingleEventSuccess({}).type).toEqual(
      types.SINGLE_EVENT_SUCCESS,
    );
  });

  it('should dispatch single event failure action', () => {
    expect(actions.SingleEventFailure({}).type).toEqual(
      types.SINGLE_EVENT_FAILURE,
    );
  });
});

describe('UpdateData action creators', () => {
  it('should dispatch UpdateData request action', () => {
    expect(actions.UpdateEventRequest({}).type).toEqual(
      types.UPDATE_EVENT_REQUEST,
    );
  });

  it('should dispatch UpdateData action', () => {
    expect(actions.UpdateData({}).type).toEqual(types.UPDATE_DATA);
  });

  it('should dispatch UpdateData success action', () => {
    expect(actions.UpdateEventSuccess({}).type).toEqual(
      types.UPDATE_EVENT_SUCCESS,
    );
  });

  it('should dispatch UpdateData failure action', () => {
    expect(actions.UpdateEventFailure({}).type).toEqual(
      types.UPDATE_EVENT_FAILURE,
    );
  });
});
