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

export const initialState = {
  loading: false,
  response: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_REPORT:
    case EDIT_REPORT:
    case DELETE_REPORT:
    case ARCHIVE_REPORT:
    case FETCH_REPORTS:
      return { ...state, loading: true, ...payload };
    case FETCH_REPORT:
      return { ...state, loading: true };
    case ADD_REPORT_SUCCESS:
    case EDIT_REPORT_SUCCESS:
    case FETCH_REPORT_SUCCESS:
    case FETCH_REPORTS_SUCCESS:
      return { ...state, loading: false, ...payload };
    case ARCHIVE_REPORT_SUCCESS: {
      const { id: archivedReportId, action, ...restState } = state;
      const { report, ...restResponse } = payload.response;
      const reportIndex = state.response.reports.findIndex(
        ({ _id: id }) => id === archivedReportId,
      );
      if (reportIndex > -1) restState.response.reports[reportIndex] = report;
      const response = {
        ...restResponse,
        reports: restState.response.reports,
      };
      return { ...restState, loading: false, response };
    }
    case DELETE_REPORT_SUCCESS: {
      const { id: deletedReportId, ...restState } = state;
      const response = {
        ...payload.response,
        reports: state.response.reports.filter(
          ({ _id: id }) => id !== deletedReportId,
        ),
      };
      return { ...restState, loading: false, response };
    }
    case ADD_REPORT_FAILURE:
    case EDIT_REPORT_FAILURE:
    case DELETE_REPORT_FAILURE:
    case FETCH_REPORT_FAILURE:
    case FETCH_REPORTS_FAILURE:
    case ARCHIVE_REPORT_FAILURE:
      return { ...state, loading: false, ...payload };
    default:
      return state;
  }
};
