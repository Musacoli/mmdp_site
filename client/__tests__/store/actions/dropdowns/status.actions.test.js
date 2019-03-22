import {
  ADD_STATUSES,
  ADD_STATUSES_FAILURE,
  ADD_STATUSES_SUCCESS,
  FETCH_STATUSES,
  FETCH_STATUSES_FAILURE,
  FETCH_STATUSES_SUCCESS,
  DELETE_STATUS,
  DELETE_STATUS_FAILURE,
  DELETE_STATUS_SUCCESS,
} from '../../../../constants/dropdowns/statuses';
import * as statusActions from '../../../../store/actions/dropdowns/statuses';
import statusReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/status';

const actions = [
  {
    type: ADD_STATUSES,
    action: statusActions.addStatuses,
    expected: true,
  },
  {
    type: ADD_STATUSES_FAILURE,
    action: statusActions.addStatusesFailure,
    expected: false,
  },
  {
    type: ADD_STATUSES_SUCCESS,
    action: statusActions.addStatusesSuccess,
    expected: false,
  },
  {
    type: FETCH_STATUSES,
    action: statusActions.fetchStatuses,
    expected: true,
  },
  {
    type: FETCH_STATUSES_FAILURE,
    action: statusActions.fetchStatusesFailure,
    expected: false,
  },
  {
    type: FETCH_STATUSES_SUCCESS,
    action: statusActions.fetchStatusesSuccess,
    expected: false,
  },
  {
    type: DELETE_STATUS,
    action: statusActions.deleteStatus,
    expected: true,
  },
  {
    type: DELETE_STATUS_FAILURE,
    action: statusActions.deleteStatusFailure,
    expected: false,
  },
  {
    type: DELETE_STATUS_SUCCESS,
    action: statusActions.deleteStatusSuccess,
    expected: false,
  },
];

describe('Registration status dropdown actions', () => {
  actions.map((action) =>
    it(`should dispatch ${action.type}`, () => {
      expect(action.action({}).type).toEqual(action.type);
    }),
  );
});

describe('statusReducer', () => {
  actions.map((action) =>
    it(`should set ${action.type}`, () => {
      expect(statusReducer(initialState, action).loading).toEqual(
        action.expected,
      );
    }),
  );
  it('should provide an initial state', () => {
    expect(statusReducer(initialState, {})).toEqual(initialState);
  });
});
