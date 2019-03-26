import {
  ADD_IMPACT_TYPES,
  ADD_IMPACT_TYPES_FAILURE,
  ADD_IMPACT_TYPES_SUCCESS,
  FETCH_IMPACT_TYPES,
  FETCH_IMPACT_TYPES_FAILURE,
  FETCH_IMPACT_TYPES_SUCCESS,
  DELETE_IMPACT_TYPE,
  DELETE_IMPACT_TYPE_FAILURE,
  DELETE_IMPACT_TYPE_SUCCESS,
} from '../../../../constants';
import * as impactTypeActions from '../../../../store/actions/dropdowns/impactTypes';
import impactTypeReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/impactTypes';

const actions = [
  {
    type: ADD_IMPACT_TYPES,
    action: impactTypeActions.addImpactTypes(),
    expected: true,
  },
  {
    type: ADD_IMPACT_TYPES_FAILURE,
    action: impactTypeActions.addImpactTypesFailure(),
    expected: false,
  },
  {
    type: ADD_IMPACT_TYPES_SUCCESS,
    action: impactTypeActions.addImpactTypesSuccess(),
    expected: false,
  },
  {
    type: FETCH_IMPACT_TYPES,
    action: impactTypeActions.fetchImpactTypes(),
    expected: true,
  },
  {
    type: FETCH_IMPACT_TYPES_FAILURE,
    action: impactTypeActions.fetchImpactTypesFailure(),
    expected: false,
  },
  {
    type: FETCH_IMPACT_TYPES_SUCCESS,
    action: impactTypeActions.fetchImpactTypesSuccess(),
    expected: false,
  },
  {
    type: DELETE_IMPACT_TYPE,
    action: impactTypeActions.deleteImpactType(),
    expected: true,
  },
  {
    type: DELETE_IMPACT_TYPE_FAILURE,
    action: impactTypeActions.deleteImpactTypeFailure(),
    expected: false,
  },
  {
    type: DELETE_IMPACT_TYPE_SUCCESS,
    action: impactTypeActions.deleteImpactTypeSuccess(),
    expected: false,
  },
];

describe('Dropdown impact types actions', () => {
  actions.map((action) =>
    it(`should dispatch ${action.type}`, () => {
      expect(action.type).toEqual(action.type);
    }),
  );
});

describe('impactTypeReducer', () => {
  actions.map((action) =>
    it(`should set ${action.type}`, () => {
      expect(impactTypeReducer(initialState, action).loading).toEqual(
        action.expected,
      );
    }),
  );
  it('should provide an initial state', () => {
    expect(impactTypeReducer(initialState, {})).toEqual(initialState);
  });
});
