import { delay } from 'redux-saga';
import { put, call, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import {
  ADD_REPORT,
  EDIT_REPORT,
  DELETE_REPORT,
  FETCH_REPORT,
  FETCH_REPORTS,
  ARCHIVE_REPORT,
} from '../../../constants/resources/report';
import * as actions from '../../actions/resources/report';
import * as request from '../../../utils/resources/report';
import { deriveError } from '../../../utils/helper';

export function* sendReport({ payload }) {
  try {
    const { id, formData, mode } = payload;
    let response;
    let successAction;
    if (mode === 'edit') {
      response = yield call(request.updateReport, id, formData);
      successAction = actions.editReportSuccessful;
    } else {
      response = yield call(request.createReport, formData);
      successAction = actions.addReportSuccessful;
    }
    toastr.success(response.data.message);
    yield delay(500);
    const res = {
      statusCode: response.status,
      report: response.data.data.report,
    };
    yield put(successAction({ response: res }));
  } catch (err) {
    const error = deriveError(err);
    toastr.warning(error);
    yield put(actions.addReportFailure({ error }));
  }
}

export function* fetchReport({ payload }) {
  try {
    const res = yield call(request.fetchReport, payload);
    const response = {
      statusCode: res.status,
      status: res.data.status,
      report: res.data.data.report,
    };
    yield put(actions.fetchReportSuccessful({ response }));
  } catch (err) {
    const error = deriveError(err);
    toastr.warning(error);
    yield put(actions.fetchReportFailure(error));
  }
}

export function* fetchReports({ payload }) {
  try {
    const res = yield call(request.fetchReports, payload);
    const response = {
      statusCode: res.status,
      status: res.data.status,
      reports: res.data.data.reports,
      pagination: res.data.data.pagination,
    };
    yield delay(1000);
    yield put(actions.fetchReportsSuccessful({ response }));
  } catch (err) {
    const error = deriveError(err);
    toastr.warning(error);
    yield put(actions.fetchReportsFailure(error));
  }
}

export function* deleteReport({ payload }) {
  try {
    const { id } = payload;
    const res = yield call(request.deleteReport, id);
    toastr.success(res.data.message);
    const response = {
      statusCode: res.status,
      status: res.data.status,
    };
    yield put(actions.deleteReportSuccessful({ response }));
  } catch (err) {
    const error = deriveError(err);
    toastr.warning(error);
    yield put(actions.deleteReportFailure(error));
  }
}

export function* archiveReport({ payload }) {
  try {
    const { id, action } = payload;
    const res = yield call(request.archiveReport, id, action);
    toastr.success(res.data.message);
    const response = {
      statusCode: res.status,
      status: res.data.status,
      report: res.data.data.report,
    };
    yield put(actions.archiveReportSuccessful({ response }));
  } catch (err) {
    const error = deriveError(err);
    toastr.warning(error);
    yield put(actions.archiveReportFailure(error));
  }
}

export function* watchReport() {
  yield takeLatest(ADD_REPORT, sendReport);
  yield takeLatest(EDIT_REPORT, sendReport);
  yield takeLatest(DELETE_REPORT, deleteReport);
  yield takeLatest(FETCH_REPORT, fetchReport);
  yield takeLatest(FETCH_REPORTS, fetchReports);
  yield takeLatest(ARCHIVE_REPORT, archiveReport);
}
