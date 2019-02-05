import { put, call, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import { ADD_REPORT } from '../../../constants/resources/report';
import * as actions from '../../actions/resources/report';
import * as request from '../../../api/resources/report';

export function* addReport(action) {
  try {
    const response = yield call(request.createReport, action.payload);
    toastr.success(response.data.message);
    const res = { status: response.status };
    yield put(actions.addReportSuccessful({ response: res }));
  } catch (err) {
    let error;
    if (err.message === 'Network Error') {
      error = 'Unable to connect to the server! Please check your connection.';
    } else if (err.response && (err.response.status === 400 || err.response.data.status === 'Validation error')) {
      const { error: errors } = err.response.data;
      const firstError = Object.keys(errors)[0];
      error = errors[firstError];
    } else {
      error = err.response ? err.response.data.message : err.message;
    }
    toastr.warning(error);
    yield put(actions.addReportFailure({ error }));
  }
}

export function* watchAddReport() {
  yield takeLatest(ADD_REPORT, addReport);
}
