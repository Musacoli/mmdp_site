import {
  ADD_REPORT,
  ADD_REPORT_SUCCESS,
  ADD_REPORT_FAILURE,
  DELETE_REPORT,
  DELETE_REPORT_SUCCESS,
  DELETE_REPORT_FAILURE,
  EDIT_REPORT,
  EDIT_REPORT_SUCCESS,
  EDIT_REPORT_FAILURE,
  FETCH_REPORT,
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_FAILURE,
  FETCH_REPORTS,
  FETCH_REPORTS_SUCCESS,
  FETCH_REPORTS_FAILURE,
  ARCHIVE_REPORT,
  ARCHIVE_REPORT_SUCCESS,
  ARCHIVE_REPORT_FAILURE,
} from '../../../constants/resources/report';

export const addReport = (payload) => ({
  type: ADD_REPORT,
  payload,
});

export const addReportSuccessful = (payload) => ({
  type: ADD_REPORT_SUCCESS,
  payload,
});

export const addReportFailure = (payload) => ({
  type: ADD_REPORT_FAILURE,
  payload,
});

export const editReport = (payload) => ({
  type: EDIT_REPORT,
  payload,
});

export const editReportSuccessful = (payload) => ({
  type: EDIT_REPORT_SUCCESS,
  payload,
});

export const editReportFailure = (payload) => ({
  type: EDIT_REPORT_FAILURE,
  payload,
});

export const fetchReport = (payload) => ({
  type: FETCH_REPORT,
  payload,
});

export const fetchReportSuccessful = (payload) => ({
  type: FETCH_REPORT_SUCCESS,
  payload,
});

export const fetchReportFailure = (payload) => ({
  type: FETCH_REPORT_FAILURE,
  payload,
});

export const fetchReports = (payload) => ({
  type: FETCH_REPORTS,
  payload,
});

export const fetchReportsSuccessful = (payload) => ({
  type: FETCH_REPORTS_SUCCESS,
  payload,
});

export const fetchReportsFailure = (payload) => ({
  type: FETCH_REPORTS_FAILURE,
  payload,
});

export const deleteReport = (payload) => ({
  type: DELETE_REPORT,
  payload,
});

export const deleteReportSuccessful = (payload) => ({
  type: DELETE_REPORT_SUCCESS,
  payload,
});

export const deleteReportFailure = (payload) => ({
  type: DELETE_REPORT_FAILURE,
  payload,
});

export const archiveReport = (payload) => ({
  type: ARCHIVE_REPORT,
  payload,
});

export const archiveReportSuccessful = (payload) => ({
  type: ARCHIVE_REPORT_SUCCESS,
  payload,
});

export const archiveReportFailure = (payload) => ({
  type: ARCHIVE_REPORT_FAILURE,
  payload,
});
