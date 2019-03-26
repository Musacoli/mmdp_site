import {
  ADD_FUNDING,
  ADD_FUNDING_FAILURE,
  ADD_FUNDING_SUCCESS,
  FETCH_FUNDING,
  FETCH_FUNDING_FAILURE,
  FETCH_FUNDING_SUCCESS,
  DELETE_FUNDING,
  DELETE_FUNDING_FAILURE,
  DELETE_FUNDING_SUCCESS,
} from '../../../../constants/dropdowns/funding';
import * as fundingActions from '../../../../store/actions/dropdowns/funding';
import fundingReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/funding';

const actions = [
  {
    type: ADD_FUNDING,
    action: fundingActions.addFunding,
    expected: true,
  },
  {
    type: ADD_FUNDING_FAILURE,
    action: fundingActions.addFundingFailure,
    expected: false,
  },
  {
    type: ADD_FUNDING_SUCCESS,
    action: fundingActions.addFundingSuccess,
    expected: false,
  },
  {
    type: FETCH_FUNDING,
    action: fundingActions.fetchFunding,
    expected: true,
  },
  {
    type: FETCH_FUNDING_FAILURE,
    action: fundingActions.fetchFundingFailure,
    expected: false,
  },
  {
    type: FETCH_FUNDING_SUCCESS,
    action: fundingActions.fetchFundingSuccess,
    expected: false,
  },
  {
    type: DELETE_FUNDING,
    action: fundingActions.deleteFunding,
    expected: true,
  },
  {
    type: DELETE_FUNDING_FAILURE,
    action: fundingActions.deleteFundingFailure,
    expected: false,
  },
  {
    type: DELETE_FUNDING_SUCCESS,
    action: fundingActions.deleteFundingSuccess,
    expected: false,
  },
];

describe('Dropdown Funding actions', () => {
  actions.map((action) =>
    it(`should dispatch ${action.type}`, () => {
      expect(action.action({}).type).toEqual(action.type);
    }),
  );
});

describe('FundingReducer', () => {
  actions.map((action) =>
    it(`should set ${action.type}`, () => {
      expect(fundingReducer(initialState, action).loading).toEqual(
        action.expected,
      );
    }),
  );
  it('should provide an initial state', () => {
    expect(fundingReducer(initialState, {})).toEqual(initialState);
  });
});
