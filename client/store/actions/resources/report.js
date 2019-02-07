import {
  ADD_REPORT,
  ADD_REPORT_SUCCESS,
  ADD_REPORT_FAILURE,
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
