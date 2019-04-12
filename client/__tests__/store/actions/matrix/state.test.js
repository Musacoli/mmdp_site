import * as types from '../../../../constants/matrix/state';
import * as stateActions from '../../../../store/actions/matrix/state';
import StateMapReducer, {
  initialState,
} from '../../../../store/reducers/matrix/state';
import * as countryActions from '../../../../store/actions/matrix/country';
import CountyMapReducer from '../../../../store/reducers/matrix/country';

const actions = [
  {
    type: types.ADD_STATE_MAP,
    action: stateActions.addStateMap,
    expected: true,
  },
  {
    type: types.ADD_STATE_MAP_FAILURE,
    action: stateActions.addStateMapFailure,
    expected: false,
  },
  {
    type: types.ADD_STATE_MAP_SUCCESS,
    action: stateActions.addStateMapSuccess,
    expected: false,
  },
  {
    type: types.UPDATE_STATE_MAP,
    action: stateActions.updateStateMap,
    expected: true,
  },
  {
    type: types.UPDATE_STATE_MAP_FAILURE,
    action: stateActions.updateStateMapFailure,
    expected: false,
  },
  {
    type: types.UPDATE_STATE_MAP_SUCCESS,
    action: stateActions.updateStateMapSuccess,
    expected: false,
  },
  {
    type: types.FETCH_STATE_MAP,
    action: stateActions.fetchStateMap,
    expected: true,
  },
  {
    type: types.FETCH_STATE_MAP_SUCCESS,
    action: stateActions.fetchStateMapSuccess,
    expected: false,
  },
  {
    type: types.FETCH_STATE_MAP_FAILURE,
    action: stateActions.fetchStateMapFailure,
    expected: false,
  },
];

describe('StateMap actions', () => {
  actions.map((action) =>
    it(`should dispatch ${action.type}`, () => {
      expect(action.action({}).type).toEqual(action.type);
    }),
  );
});

describe('StateMap Reducer', () => {
  actions.map((action) =>
    it(`should set ${action.type}`, () => {
      expect(StateMapReducer(initialState, action).loading).toEqual(
        action.expected,
      );
    }),
  );
  it('should provide an initial state', () => {
    expect(StateMapReducer(initialState, {})).toEqual(initialState);
  });
});
