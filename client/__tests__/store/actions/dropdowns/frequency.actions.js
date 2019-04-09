import {
  ADD_FREQUENCY,
  ADD_FREQUENCY_FAILURE,
  ADD_FREQUENCY_SUCCESS,
  FETCH_FREQUENCY,
  FETCH_FREQUENCY_FAILURE,
  FETCH_FREQUENCY_SUCCESS,
  DELETE_FREQUENCY,
  DELETE_FREQUENCY_FAILURE,
  DELETE_FREQUENCY_SUCCESS,
} from '../../../../constants/dropdowns/frequency';
import * as frequencyActions from '../../../../store/actions/dropdowns/frequency';
import frequencyReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/frequency';

const actions = [
  {
    type: ADD_FREQUENCY,
    action: frequencyActions.addFrequency,
    expected: true,
  },
  {
    type: ADD_FREQUENCY_FAILURE,
    action: frequencyActions.addFrequencyFailure,
    expected: false,
  },
  {
    type: ADD_FREQUENCY_SUCCESS,
    action: frequencyActions.addFrequencySuccess,
    expected: false,
  },
  {
    type: FETCH_FREQUENCY,
    action: frequencyActions.fetchFrequency,
    expected: true,
  },
  {
    type: FETCH_FREQUENCY_FAILURE,
    action: frequencyActions.fetchFrequencyFailure,
    expected: false,
  },
  {
    type: FETCH_FREQUENCY_SUCCESS,
    action: frequencyActions.fetchFrequencySuccess,
    expected: false,
  },
  {
    type: DELETE_FREQUENCY,
    action: frequencyActions.deleteFrequency,
    expected: true,
  },
  {
    type: DELETE_FREQUENCY_FAILURE,
    action: frequencyActions.deleteFrequencyFailure,
    expected: false,
  },
  {
    type: DELETE_FREQUENCY_SUCCESS,
    action: frequencyActions.deleteFrequencySuccess,
    expected: false,
  },
];

describe('Dropdown Frequency actions', () => {
  actions.map((action) =>
    it(`should dispatch ${action.type}`, () => {
      expect(action.action({}).type).toEqual(action.type);
    }),
  );
});

describe('FrequencyReducer', () => {
  actions.map((action) =>
    it(`should set ${action.type}`, () => {
      expect(frequencyReducer(initialState, action).loading).toEqual(
        action.expected,
      );
    }),
  );
  it('should provide an initial state', () => {
    expect(frequencyReducer(initialState, {})).toEqual(initialState);
  });
});
