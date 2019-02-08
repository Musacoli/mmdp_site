import { put, call, takeLatest } from 'redux-saga/effects';
import { SINGLE_EVENT_REQUEST } from '../../../constants/events';
import {
  SingleEventSuccess,
  SingleEventFailure,
  UpdateData,
} from '../../actions/events/event';
import { api } from '../../../utils/events';

export function* singleEvent(inputData) {
  try {
    const event = yield call(api.retrieve, inputData.payload);
    const { data } = event;
    yield put(SingleEventSuccess(data));
    yield put(UpdateData(data.data));
  } catch (error) {
    yield put(SingleEventFailure(error.response));
  }
}

export function* singleEventWatcher() {
  yield takeLatest(SINGLE_EVENT_REQUEST, singleEvent);
}
