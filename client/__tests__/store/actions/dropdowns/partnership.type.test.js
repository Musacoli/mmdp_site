import {
  ADD_PARTNERSHIP_TYPES,
  ADD_PARTNERSHIP_TYPES_FAILURE,
  ADD_PARTNERSHIP_TYPES_SUCCESS,
  FETCH_PARTNERSHIP_TYPES,
  FETCH_PARTNERSHIP_TYPES_FAILURE,
  FETCH_PARTNERSHIP_TYPES_SUCCESS,
  DELETE_PARTNERSHIP_TYPE,
  DELETE_PARTNERSHIP_TYPE_FAILURE,
  DELETE_PARTNERSHIP_TYPE_SUCCESS,
} from '../../../../constants';
import * as statesActions from '../../../../store/actions/dropdowns/partnershipType';
import reducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/partnershipType';

const actions = [
  {
    type: ADD_PARTNERSHIP_TYPES,
    action: statesActions.addPartnershipType,
    expected: true,
  },
  {
    type: ADD_PARTNERSHIP_TYPES_FAILURE,
    action: statesActions.addPartnershipTypeFailure,
    expected: false,
  },
  {
    type: ADD_PARTNERSHIP_TYPES_SUCCESS,
    action: statesActions.addPartnershipTypeSuccess,
    expected: false,
  },
  {
    type: FETCH_PARTNERSHIP_TYPES,
    action: statesActions.fetchPartnershipType,
    expected: true,
  },
  {
    type: FETCH_PARTNERSHIP_TYPES_FAILURE,
    action: statesActions.fetchPartnershipTypeFailure,
    expected: false,
  },
  {
    type: FETCH_PARTNERSHIP_TYPES_SUCCESS,
    action: statesActions.fetchPartnershipTypeSuccess,
    expected: false,
  },
  {
    type: DELETE_PARTNERSHIP_TYPE,
    action: statesActions.deletePartnershipType,
    expected: true,
  },
  {
    type: DELETE_PARTNERSHIP_TYPE_FAILURE,
    action: statesActions.deletePartnershipTypeFailure,
    expected: false,
  },
  {
    type: DELETE_PARTNERSHIP_TYPE_SUCCESS,
    action: statesActions.deletePartnershipTypeSuccess,
    expected: false,
  },
];

describe('Dropdown partnership type actions', () => {
  actions.map((action) =>
    it(`should dispatch ${action.type}`, () => {
      expect(action.action({}).type).toEqual(action.type);
    }),
  );
});

describe('partership type Reducer', () => {
  actions.map((action) =>
    it(`should set ${action.type}`, () => {
      expect(reducer(initialState, action).loading).toEqual(action.expected);
    }),
  );
  it('should provide an initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });
});
