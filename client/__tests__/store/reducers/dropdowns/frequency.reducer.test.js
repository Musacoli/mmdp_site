import {
  FETCH_FREQUENCY,
  FETCH_FREQUENCY_SUCCESS,
  ADD_FREQUENCY,
  ADD_FREQUENCY_FAILURE,
  ADD_FREQUENCY_SUCCESS,
  DELETE_FREQUENCY,
  DELETE_FREQUENCY_FAILURE,
  DELETE_FREQUENCY_SUCCESS,
} from '../../../../constants/dropdowns/frequency';
import frequencyReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/frequency';

describe('frequencyReducer Reducer', () => {
  it('should provide an initial state', () => {
    expect(frequencyReducer(initialState, {})).toEqual(initialState);
  });
  it('should fetch frequencyReducer', () => {
    expect(
      frequencyReducer(null, {
        type: FETCH_FREQUENCY,
        payload: { loading: true },
      }).loading,
    ).toEqual(true);
  });
  it('should show fetching frequency options', () => {
    expect(
      frequencyReducer(null, {
        type: FETCH_FREQUENCY_SUCCESS,
        payload: { Frequencies: { data: [] } },
      }).loading,
    ).toEqual(false);
  });
  it('should delete frequency option', () => {
    expect(
      frequencyReducer(null, {
        type: DELETE_FREQUENCY,
        payload: {},
      }),
    ).toEqual({ loading: true });
  });

  it('should show create frequency option', () => {
    expect(
      frequencyReducer(null, {
        type: ADD_FREQUENCY,
        payload: {},
      }).loading,
    ).toEqual(true);
  });

  it('should successfully add frequency option', () => {
    expect(
      frequencyReducer(null, {
        type: ADD_FREQUENCY_SUCCESS,
        payload: {},
      }).loading,
    ).toEqual(false);
  });

  it('should show error while adding frequency options', () => {
    expect(
      frequencyReducer(null, {
        type: ADD_FREQUENCY_FAILURE,
        payload: {},
      }).loading,
    ).toEqual(false);
  });

  it('should show failing while fetching frequncy options', () => {
    expect(
      frequencyReducer(initialState, {
        type: FETCH_FREQUENCY_SUCCESS,
        payload: {},
      }).loading,
    ).toEqual(false);
  });

  it('should show fail when deleting frequency option', () => {
    expect(
      frequencyReducer(null, {
        type: DELETE_FREQUENCY_FAILURE,
        payload: {},
      }).loading,
    ).toEqual(false);
  });

  it('should show delete frequency option', () => {
    expect(
      frequencyReducer(initialState, {
        type: DELETE_FREQUENCY_SUCCESS,
        payload: {},
      }).loading,
    ).toEqual(false);
  });
});
