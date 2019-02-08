import { put, call, takeLatest } from 'redux-saga/effects';
import { UPDATE_EVENT_REQUEST } from '../../../constants/events';
import {
  UpdateEventSuccess,
  UpdateEventFailure,
} from '../../actions/events/event';
import { api } from '../../../utils/events';
import toastr from '../../../utils/toastr';

export function* updateEvent(Data) {
  try {
    const { id, inputData } = Data.payload;
    const event = yield call(api.edit, id, inputData);
    const { data } = event;
    yield put(UpdateEventSuccess(data));
    window.location.replace('/list-events');
    toastr.success('Event Successfully Updated');
  } catch (error) {
    yield put(UpdateEventFailure(error.response));
    const errorMessage = error.response
      ? error.response.data.message || error.response.data.data[0]
      : 'Network error';
    toastr.error(errorMessage);
  }
}

export function* updateEventWatcher() {
  yield takeLatest(UPDATE_EVENT_REQUEST, updateEvent);
}
