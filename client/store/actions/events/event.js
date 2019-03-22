import {
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  LIST_EVENTS_REQUEST,
  LIST_EVENTS_SUCCESS,
  LIST_EVENTS_FAILURE,
  SINGLE_EVENT_REQUEST,
  SINGLE_EVENT_FAILURE,
  SINGLE_EVENT_SUCCESS,
  UPDATE_DATA,
  UPDATE_EVENT_FAILURE,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  ARCHIVE_EVENT,
  ARCHIVE_EVENT_SUCCESS,
  ARCHIVE_EVENT_FAILURE,
} from '../../../constants/events';

export const eventCreated = (payload) => ({
  type: ADD_EVENT_SUCCESS,
  payload,
});

export const creationFailed = (payload) => ({
  type: ADD_EVENT_FAILURE,
  payload,
});

export const addEventRequest = (payload) => ({
  type: ADD_EVENT_REQUEST,
  payload,
});
export const listEvents = (payload) => ({
  type: LIST_EVENTS_REQUEST,
  payload,
});

export const listEventsSuccess = (payload) => ({
  type: LIST_EVENTS_SUCCESS,
  payload,
});

export const listEventsFailure = (payload) => ({
  type: LIST_EVENTS_FAILURE,
  payload,
});

export const deleteEvent = (payload) => ({
  type: DELETE_EVENT_REQUEST,
  payload,
});

export const deleteEventSuccess = (payload) => ({
  type: DELETE_EVENT_SUCCESS,
  payload,
});

export const deleteEventFailure = (payload) => ({
  type: DELETE_EVENT_FAILURE,
  payload,
});

export const SingleEventRequest = (payload) => ({
  type: SINGLE_EVENT_REQUEST,
  payload,
});

export const SingleEventFailure = (payload) => ({
  type: SINGLE_EVENT_FAILURE,
  payload,
});

export const SingleEventSuccess = (payload) => ({
  type: SINGLE_EVENT_SUCCESS,
  payload,
});

export const UpdateData = (payload) => ({
  type: UPDATE_DATA,
  payload,
});

export const UpdateEventRequest = (payload) => ({
  type: UPDATE_EVENT_REQUEST,
  payload,
});

export const UpdateEventFailure = (payload) => ({
  type: UPDATE_EVENT_FAILURE,
  payload,
});

export const UpdateEventSuccess = (payload) => ({
  type: UPDATE_EVENT_SUCCESS,
  payload,
});

export const archiveEvent = (payload) => ({
  type: ARCHIVE_EVENT,
  payload,
});

export const archiveSuccess = (payload) => ({
  type: ARCHIVE_EVENT_SUCCESS,
  payload,
});

export const archiveFailed = (payload) => ({
  type: ARCHIVE_EVENT_FAILURE,
  payload,
});
