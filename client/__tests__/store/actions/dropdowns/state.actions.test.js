import {
  ADD_STATES,
  ADD_STATES_FAILURE,
  ADD_STATES_SUCCESS,
  FETCH_STATES,
  FETCH_STATES_FAILURE,
  FETCH_STATES_SUCCESS,
  DELETE_STATE,
  DELETE_STATE_FAILURE,
  DELETE_STATE_SUCCESS,
} from '../../../../constants';
import * as statesActions from '../../../../store/actions/dropdowns/state';
import stateReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/state';

const actions = [
  {
    type: ADD_STATES,
    action: statesActions.addStates,
    expected: true,
  },
  {
    type: ADD_STATES_FAILURE,
    action: statesActions.addStatesFailure,
    expected: false,
  },
  {
    type: ADD_STATES_SUCCESS,
    action: statesActions.addStatesSuccess,
    expected: false,
  },
  {
    type: FETCH_STATES,
    action: statesActions.fetchStates,
    expected: true,
  },
  {
    type: FETCH_STATES_FAILURE,
    action: statesActions.fetchStatesFailure,
    expected: false,
  },
  {
    type: FETCH_STATES_SUCCESS,
    action: statesActions.fetchStatesSuccess,
    expected: false,
  },
  {
    type: DELETE_STATE,
    action: statesActions.deleteState,
    expected: true,
  },
  {
    type: DELETE_STATE_FAILURE,
    action: statesActions.deleteStateFailure,
    expected: false,
  },
  {
    type: DELETE_STATE_SUCCESS,
    action: statesActions.deleteStateSuccess,
    expected: false,
  },
];

describe('Dropdown states actions', () => {
  actions.map((action) =>
    it(`should dispatch ${action.type}`, () => {
      expect(action.action({}).type).toEqual(action.type);
    }),
  );
});

describe('stateReducer', () => {
  actions.map((action) =>
    it(`should set ${action.type}`, () => {
      expect(stateReducer(initialState, action).loading).toEqual(
        action.expected,
      );
    }),
  );
  it('should provide an initial state', () => {
    expect(stateReducer(initialState, {})).toEqual(initialState);
  });
});
