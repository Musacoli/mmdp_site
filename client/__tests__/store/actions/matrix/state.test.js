import * as types from '../../../../constants/matrix/lga';
import * as lgaActions from '../../../../store/actions/matrix/lga';
import LGAMap, { initialState } from '../../../../store/reducers/matrix/lga';

const actions = [
  {
    type: types.ADD_STATE_SVG_FILE,
    action: lgaActions.addStateMatrix,
    expected: true,
  },
  {
    type: types.ADD_STATE_SVG_FILE_FAILURE,
    action: lgaActions.addStateMatrixFailure,
    expected: false,
  },
  {
    type: types.ADD_STATE_SVG_FILE_SUCCESS,
    action: lgaActions.addStateMatrixSuccessful,
    expected: false,
  },
  {
    type: types.UPDATE_LGA,
    action: lgaActions.updateLGAMatrix,
    expected: true,
  },
  {
    type: types.UPDATE_LGA_MAP_FAILURE,
    action: lgaActions.updateLGAMatrixFailure,
    expected: false,
  },
  {
    type: types.UPDATE_LGA_MAP_SUCCESS,
    action: lgaActions.updateLGAMatrixSuccess,
    expected: false,
  },
  {
    type: types.FETCH_LGA_BOUNDARIES,
    action: lgaActions.getLGAMapRequest,
    expected: false,
  },
  {
    type: types.FETCH_LGA_BOUNDARIES_SUCCESS,
    action: lgaActions.getLGAMapSuccess,
    expected: false,
  },
  {
    type: types.FETCH_LGA_BOUNDARIES_FAILURE,
    action: lgaActions.getLGAMapFailure,
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
      expect(LGAMap(initialState, action).loading).toEqual(action.expected);
    }),
  );
  it('should provide an initial state', () => {
    expect(LGAMap(initialState, {})).toEqual(initialState);
  });
});
