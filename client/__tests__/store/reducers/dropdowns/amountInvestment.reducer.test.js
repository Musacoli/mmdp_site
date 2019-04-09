import {
  FETCH_AMOUNT,
  FETCH_AMOUNT_SUCCESS,
  ADD_AMOUNT,
  ADD_AMOUNT_FAILURE,
  ADD_AMOUNT_SUCCESS,
  DELETE_AMOUNT,
  DELETE_AMOUNT_FAILURE,
  DELETE_AMOUNT_SUCCESS,
} from '../../../../constants/dropdowns/amountInvested';
import investmentReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/amountInvested';

describe('investmentReducer Reducer', () => {
  it('should provide an initial state', () => {
    expect(investmentReducer(initialState, {})).toEqual(initialState);
  });
  it('should fetch investmentReducer', () => {
    expect(
      investmentReducer(null, {
        type: FETCH_AMOUNT,
        payload: { loading: true },
      }).loading,
    ).toEqual(true);
  });
  it('should show fetching amount invested range options', () => {
    expect(
      investmentReducer(null, {
        type: FETCH_AMOUNT_SUCCESS,
        payload: { Investments: { data: [] } },
      }).loading,
    ).toEqual(false);
  });
  it('should delete amount invested range option', () => {
    expect(
      investmentReducer(null, {
        type: DELETE_AMOUNT,
        payload: {},
      }),
    ).toEqual({ loading: true });
  });

  it('should show create amount invested range option', () => {
    expect(
      investmentReducer(null, {
        type: ADD_AMOUNT,
        payload: {},
      }).loading,
    ).toEqual(true);
  });

  it('should successfully add amount invested option', () => {
    expect(
      investmentReducer(null, {
        type: ADD_AMOUNT_SUCCESS,
        payload: {},
      }).loading,
    ).toEqual(false);
  });

  it('should show error while adding amount invested options', () => {
    expect(
      investmentReducer(null, {
        type: ADD_AMOUNT_FAILURE,
        payload: {},
      }).loading,
    ).toEqual(false);
  });

  it('should show failing while fetching amount invested  options', () => {
    expect(
      investmentReducer(initialState, {
        type: FETCH_AMOUNT_SUCCESS,
        payload: {},
      }).loading,
    ).toEqual(false);
  });

  it('should show fail when deleting amount invested option', () => {
    expect(
      investmentReducer(null, {
        type: DELETE_AMOUNT_FAILURE,
        payload: {},
      }).loading,
    ).toEqual(false);
  });

  it('should show delete amount invested option', () => {
    expect(
      investmentReducer(initialState, {
        type: DELETE_AMOUNT_SUCCESS,
        payload: {},
      }).loading,
    ).toEqual(false);
  });
});
