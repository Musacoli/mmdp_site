import reportReducer, {
  initialState,
} from '../../../store/reducers/resources/report';
import * as actions from '../../../store/actions/resources/report';
import {
  archivedResponse,
  reportsResponse,
} from '../../../__mocks__/mockResponse/report';

const loadingState = { loading: true, response: {} };
const notLoadingState = { loading: false, response: {} };
const itemToModify = '5c5afa15bc8f70175006ff02';

describe('Report reducer', () => {
  it('should return the initial state when action type is not known', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = reportReducer(undefined, action);
    expect(state).toEqual(initialState);
  });
  it('should return handle ADD_REPORT action correctly', () => {
    const state = reportReducer(undefined, actions.addReport());
    expect(state).toEqual(loadingState);
  });
  it('should return handle ADD_REPORT_SUCCESS action correctly', () => {
    const state = reportReducer(loadingState, actions.addReportSuccessful());
    expect(state).toEqual(notLoadingState);
  });
  it('should return handle ADD_REPORT_FAILURE action correctly', () => {
    const state = reportReducer(loadingState, actions.addReportFailure());
    expect(state).toEqual(notLoadingState);
  });
  it('should return handle FETCH_REPORT action correctly', () => {
    const state = reportReducer(notLoadingState, actions.fetchReport());
    expect(state).toEqual(loadingState);
  });
  it('should return handle ARCHIVE_REPORT_SUCCESS action correctly', () => {
    const state = reportReducer(
      {
        id: itemToModify,
        action: 'archive',
        loading: false,
        ...reportsResponse,
      },
      actions.archiveReportSuccessful({
        response: archivedResponse,
      }),
    );
    const archivedReport = state.response.reports.find(
      ({ _id: id }) => id === itemToModify,
    );
    expect(archivedReport.archived).toEqual(true);
    expect(state).toMatchSnapshot();
  });
  it('should return handle DELETE_REPORT_SUCCESS action correctly', () => {
    const state = reportReducer(
      {
        id: itemToModify,
        action: 'delete',
        loading: false,
        ...reportsResponse,
      },
      actions.deleteReportSuccessful({
        response: archivedResponse,
      }),
    );
    const archivedReport = state.response.reports.find(
      ({ _id: id }) => id === itemToModify,
    );
    expect(archivedReport).toBe(undefined);
    expect(state).toMatchSnapshot();
  });
});
