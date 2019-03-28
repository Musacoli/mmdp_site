import {
  ADD_ORGANIZATION_TYPE_REQUEST,
  ADD_ORGANIZATION_TYPE_FAILURE,
  ADD_ORGANIZATION_TYPE_SUCCESS,
  GET_ORGANIZATION_TYPE_REQUEST,
  GET_ORGANIZATION_TYPE_FAILURE,
  GET_ORGANIZATION_TYPE_SUCCESS,
  DELETE_ORGANIZATION_TYPE_REQUEST,
  DELETE_ORGANIZATION_TYPE_FAILURE,
  DELETE_ORGANIZATION_TYPE_SUCCESS,
  UPDATE_ORGANIZATION_TYPE_FAILURE,
  UPDATE_ORGANIZATION_TYPE_REQUEST,
  UPDATE_ORGANIZATION_TYPE_SUCCESS,
} from '../../../../constants/dropdowns/organizationType';
import * as OTactions from '../../../../store/actions/dropdowns/organizationType';
import organizationTypeReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/organizationType';

const actions = [
  {
    type: ADD_ORGANIZATION_TYPE_REQUEST,
    action: OTactions.addOrganizationTypeRequest,
    expected: true,
  },
  {
    type: ADD_ORGANIZATION_TYPE_FAILURE,
    action: OTactions.addOrganizationTypeFailure,
    expected: false,
  },
  {
    type: ADD_ORGANIZATION_TYPE_SUCCESS,
    action: OTactions.addOrganizationTypeSuccess,
    expected: false,
  },
  {
    type: GET_ORGANIZATION_TYPE_REQUEST,
    action: OTactions.getOrganizationTypeRequest,
    expected: true,
  },
  {
    type: GET_ORGANIZATION_TYPE_SUCCESS,
    action: OTactions.getOrganizationTypeSuccess,
    expected: false,
  },
  {
    type: GET_ORGANIZATION_TYPE_FAILURE,
    action: OTactions.getOrganizationTypeFailure,
    expected: false,
  },
  {
    type: DELETE_ORGANIZATION_TYPE_REQUEST,
    action: OTactions.deleteOrganizationTypeRequest,
    expected: true,
  },
  {
    type: DELETE_ORGANIZATION_TYPE_FAILURE,
    action: OTactions.deleteOrganizationTypeFailure,
    expected: false,
  },
  {
    type: DELETE_ORGANIZATION_TYPE_SUCCESS,
    action: OTactions.deleteOrganizationTypeSuccess,
    expected: false,
  },
  {
    type: UPDATE_ORGANIZATION_TYPE_REQUEST,
    action: OTactions.updateOrganizationTypeRequest,
    expected: true,
  },
  {
    type: UPDATE_ORGANIZATION_TYPE_FAILURE,
    action: OTactions.updateOrganizationTypeFailure,
    expected: false,
  },
  {
    type: UPDATE_ORGANIZATION_TYPE_SUCCESS,
    action: OTactions.updateOrganizationTypeSuccess,
    expected: false,
  },
];

describe('Organization Type dropdown actions', () => {
  actions.map((action) =>
    it(`should dispatch ${action.type}`, () => {
      expect(action.action({}).type).toEqual(action.type);
    }),
  );
});

describe('Organization Type Reducer', () => {
  actions.map((action) =>
    it(`should set ${action.type}`, () => {
      expect(organizationTypeReducer(initialState, action).loading).toEqual(
        action.expected,
      );
    }),
  );
  it('should provide an initial state', () => {
    expect(organizationTypeReducer(initialState, {})).toEqual(initialState);
  });
});
