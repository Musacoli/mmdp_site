import {
  ADD_LGA_REQUEST,
  ADD_LGA_FAILURE,
  ADD_LGA_SUCCESS,
  GET_LGA_REQUEST,
  GET_LGA_FAILURE,
  GET_LGA_SUCCESS,
  DELETE_LGA_REQUEST,
  DELETE_LGA_FAILURE,
  DELETE_LGA_SUCCESS,
  UPDATE_LGA_FAILURE,
  UPDATE_LGA_REQUEST,
  UPDATE_LGA_SUCCESS,
} from '../../../../constants/dropdowns/LGA';
import * as LGAActions from '../../../../store/actions/dropdowns/LGA';
import LGAReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/LGA';

const actions = [
  {
    type: ADD_LGA_REQUEST,
    action: LGAActions.addLGARequest,
    expected: true,
  },
  {
    type: ADD_LGA_FAILURE,
    action: LGAActions.addLGAFailure,
    expected: false,
  },
  {
    type: ADD_LGA_SUCCESS,
    action: LGAActions.addLGASuccess,
    expected: false,
  },
  {
    type: GET_LGA_REQUEST,
    action: LGAActions.getLGARequest,
    expected: true,
  },
  {
    type: GET_LGA_SUCCESS,
    action: LGAActions.getLGASuccess,
    expected: false,
  },
  {
    type: GET_LGA_FAILURE,
    action: LGAActions.getLGAFailure,
    expected: false,
  },
  {
    type: DELETE_LGA_REQUEST,
    action: LGAActions.deleteLGARequest,
    expected: true,
  },
  {
    type: DELETE_LGA_FAILURE,
    action: LGAActions.deleteLGAFailure,
    expected: false,
  },
  {
    type: DELETE_LGA_SUCCESS,
    action: LGAActions.deleteLGASuccess,
    expected: false,
  },
  {
    type: UPDATE_LGA_REQUEST,
    action: LGAActions.updateLGARequest,
    expected: true,
  },
  {
    type: UPDATE_LGA_FAILURE,
    action: LGAActions.updateLGAFailure,
    expected: false,
  },
  {
    type: UPDATE_LGA_SUCCESS,
    action: LGAActions.updateLGASuccess,
    expected: false,
  },
];

describe('Local Government dropdown actions', () => {
  actions.map((action) =>
    it(`should dispatch ${action.type}`, () => {
      expect(action.action({}).type).toEqual(action.type);
    }),
  );
});

describe('LGA Reducer', () => {
  actions.map((action) =>
    it(`should set ${action.type}`, () => {
      expect(LGAReducer(initialState, action).loading).toEqual(action.expected);
    }),
  );
  it('should provide an initial state', () => {
    expect(LGAReducer(initialState, {})).toEqual(initialState);
  });
});
