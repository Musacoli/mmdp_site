/* eslint-disable import/prefer-default-export */
import { put, call, takeLatest } from 'redux-saga/effects';
import toastr from '../../../utils/toastr';
import { ADD_EVENT_REQUEST } from '../../../constants/events';
import { eventCreated, creationFailed } from '../../actions/events/event';
import { api } from '../../../utils/events';

export function* addEvents(inputData) {
  try {
    const event = yield call(api.create, inputData.payload);
    const { data } = event;
    yield put(eventCreated(data));
    window.location.replace('/list-events');
    toastr.success('Event successfully created');
  } catch (error) {
    yield put(creationFailed(error.response));
    const errorMessage = error.response
      ? error.response.data.message || error.response.data.data[0]
      : 'Network error';
    toastr.error(errorMessage);
  }
}

export function* watchAddEventWatcher() {
  yield takeLatest(ADD_EVENT_REQUEST, addEvents);
}
