import {
  ADD_AMOUNT,
  ADD_AMOUNT_FAILURE,
  ADD_AMOUNT_SUCCESS,
  FETCH_AMOUNT,
  FETCH_AMOUNT_FAILURE,
  FETCH_AMOUNT_SUCCESS,
  DELETE_AMOUNT,
  DELETE_AMOUNT_FAILURE,
  DELETE_AMOUNT_SUCCESS,
} from '../../../../constants/dropdowns/amountInvested';
import * as InvestmentActions from '../../../../store/actions/dropdowns/amountInvested';
import investmentReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/amountInvested';

const actions = [
  {
    type: ADD_AMOUNT,
    action: InvestmentActions.addAmount,
    expected: true,
  },
  {
    type: ADD_AMOUNT_FAILURE,
    action: InvestmentActions.addAmountFailure,
    expected: false,
  },
  {
    type: ADD_AMOUNT_SUCCESS,
    action: InvestmentActions.addAmountSuccess,
    expected: false,
  },
  {
    type: FETCH_AMOUNT,
    action: InvestmentActions.fetchAmount,
    expected: true,
  },
  {
    type: FETCH_AMOUNT_FAILURE,
    action: InvestmentActions.fetchAmountFailure,
    expected: false,
  },
  {
    type: FETCH_AMOUNT_SUCCESS,
    action: InvestmentActions.fetchAmountSuccess,
    expected: false,
  },
  {
    type: DELETE_AMOUNT,
    action: InvestmentActions.deleteAmount,
    expected: true,
  },
  {
    type: DELETE_AMOUNT_FAILURE,
    action: InvestmentActions.deleteAmountFailure,
    expected: false,
  },
  {
    type: DELETE_AMOUNT_SUCCESS,
    action: InvestmentActions.deleteAmountSuccess,
    expected: false,
  },
];

describe('Dropdown Amount Investment actions', () => {
  actions.map((action) =>
    it(`should dispatch ${action.type}`, () => {
      expect(action.action({}).type).toEqual(action.type);
    }),
  );
});

describe('AmounInvestmentReducer', () => {
  actions.map((action) =>
    it(`should set ${action.type}`, () => {
      expect(investmentReducer(initialState, action).loading).toEqual(
        action.expected,
      );
    }),
  );
  it('should provide an initial state', () => {
    expect(investmentReducer(initialState, {})).toEqual(initialState);
  });
});
