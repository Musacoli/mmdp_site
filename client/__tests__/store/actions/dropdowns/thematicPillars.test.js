import {
  ADD_THEMATIC_PILLAR,
  ADD_THEMATIC_PILLAR_FAILURE,
  ADD_THEMATIC_PILLAR_SUCCESS,
  FETCH_THEMATIC_PILLARS,
  FETCH_THEMATIC_PILLARS_FAILURE,
  FETCH_THEMATIC_PILLARS_SUCCESS,
  DELETE_THEMATIC_PILLAR,
  DELETE_THEMATIC_PILLAR_FAILURE,
  DELETE_THEMATIC_PILLAR_SUCCESS,
} from '../../../../constants/dropdowns/thematicPillars';
import * as thematicPillarActions from '../../../../store/actions/dropdowns/thematicPillars';
import statusReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/thematicPillar';

const actions = [
  {
    type: ADD_THEMATIC_PILLAR,
    action: thematicPillarActions.addThematicPillar,
    expected: true,
  },
  {
    type: ADD_THEMATIC_PILLAR_FAILURE,
    action: thematicPillarActions.addThematicPillarFailure,
    expected: false,
  },
  {
    type: ADD_THEMATIC_PILLAR_SUCCESS,
    action: thematicPillarActions.addThematicPillarSuccess,
    expected: false,
  },
  {
    type: FETCH_THEMATIC_PILLARS,
    action: thematicPillarActions.fetchThematicPillars,
    expected: true,
  },
  {
    type: FETCH_THEMATIC_PILLARS_FAILURE,
    action: thematicPillarActions.fetchThematicPillarsFailure,
    expected: false,
  },
  {
    type: FETCH_THEMATIC_PILLARS_SUCCESS,
    action: thematicPillarActions.fetchThematicPillarsSuccess,
    expected: false,
  },
  {
    type: DELETE_THEMATIC_PILLAR,
    action: thematicPillarActions.deletethematicPillar,
    expected: true,
  },
  {
    type: DELETE_THEMATIC_PILLAR_FAILURE,
    action: thematicPillarActions.deleteThematicPillarFailure,
    expected: false,
  },
  {
    type: DELETE_THEMATIC_PILLAR_SUCCESS,
    action: thematicPillarActions.deleteThematicPillarSuccess,
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
