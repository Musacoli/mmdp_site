import {
  ADD_TYPES,
  ADD_TYPES_FAILURE,
  ADD_TYPES_SUCCESS,
  FETCH_TYPES,
  FETCH_TYPES_FAILURE,
  FETCH_TYPES_SUCCESS,
  DELETE_TYPE,
  DELETE_TYPE_FAILURE,
  DELETE_TYPE_SUCCESS,
} from '../../../../constants/dropdowns/beneficiaryType';
import * as typeActions from '../../../../store/actions/dropdowns/beneficiaryType';
import beneficiaryTypeReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/beneficiaryTypes';

const actions = [
  {
    type: ADD_TYPES,
    action: typeActions.addTypes,
    expected: true,
  },
  {
    type: ADD_TYPES_FAILURE,
    action: typeActions.addTypesFailure,
    expected: false,
  },
  {
    type: ADD_TYPES_SUCCESS,
    action: typeActions.addTypesSuccess,
    expected: false,
  },
  {
    type: FETCH_TYPES,
    action: typeActions.fetchTypes,
    expected: true,
  },
  {
    type: FETCH_TYPES_FAILURE,
    action: typeActions.fetchTypesFailure,
    expected: false,
  },
  {
    type: FETCH_TYPES_SUCCESS,
    action: typeActions.fetchTypesSuccess,
    expected: false,
  },
  {
    type: DELETE_TYPE,
    action: typeActions.deleteType,
    expected: true,
  },
  {
    type: DELETE_TYPE_FAILURE,
    action: typeActions.deleteTypeFailure,
    expected: false,
  },
  {
    type: DELETE_TYPE_SUCCESS,
    action: typeActions.deleteTypeSuccess,
    expected: false,
  },
];

describe('Beneficiary type dropdown actions', () => {
  actions.map((action) =>
    it(`should dispatch ${action.type}`, () => {
      expect(action.action({}).type).toEqual(action.type);
    }),
  );
});

describe('typeReducer', () => {
  actions.map((action) =>
    it(`should set ${action.type}`, () => {
      expect(beneficiaryTypeReducer(initialState, action).loading).toEqual(
        action.expected,
      );
    }),
  );
  it('should provide an initial state', () => {
    expect(beneficiaryTypeReducer(initialState, {})).toEqual(initialState);
  });
});
