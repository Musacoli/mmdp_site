import {
  ADD_FOCUS_AREA,
  ADD_FOCUS_AREA_FAILURE,
  ADD_FOCUS_AREA_SUCCESS,
  FETCH_FOCUS_AREA,
  FETCH_FOCUS_AREA_FAILURE,
  FETCH_FOCUS_AREA_SUCCESS,
  DELETE_FOCUS_AREA,
  DELETE_FOCUS_AREA_FAILURE,
  DELETE_FOCUS_AREA_SUCCESS,
} from '../../../../constants/dropdowns/focusArea';
import * as focusActions from '../../../../store/actions/dropdowns/focusArea';
import focusAreaReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/focusArea';

const actions = [
  {
    type: ADD_FOCUS_AREA,
    action: focusActions.addFocusArea,
    expected: true,
  },
  {
    type: ADD_FOCUS_AREA_FAILURE,
    action: focusActions.addFocusAreaFailure,
    expected: false,
  },
  {
    type: ADD_FOCUS_AREA_SUCCESS,
    action: focusActions.addFocusAreaSuccess,
    expected: false,
  },
  {
    type: FETCH_FOCUS_AREA,
    action: focusActions.fetchFocusArea,
    expected: true,
  },
  {
    type: FETCH_FOCUS_AREA_FAILURE,
    action: focusActions.fetchFocusAreaFailure,
    expected: false,
  },
  {
    type: FETCH_FOCUS_AREA_SUCCESS,
    action: focusActions.fetchFocusAreaSuccess,
    expected: false,
  },
  {
    type: DELETE_FOCUS_AREA,
    action: focusActions.deleteFocusArea,
    expected: true,
  },
  {
    type: DELETE_FOCUS_AREA_FAILURE,
    action: focusActions.deleteFocusAreaFailure,
    expected: false,
  },
  {
    type: DELETE_FOCUS_AREA_SUCCESS,
    action: focusActions.deleteFocusAreaSuccess,
    expected: false,
  },
];

describe('Dropdown Focus Area actions', () => {
  actions.map((action) =>
    it(`should dispatch ${action.type}`, () => {
      expect(action.action({}).type).toEqual(action.type);
    }),
  );
});

describe('Focus Area', () => {
  actions.map((action) =>
    it(`should set ${action.type}`, () => {
      expect(focusAreaReducer(initialState, action).loading).toEqual(
        action.expected,
      );
    }),
  );
  it('should provide an initial state', () => {
    expect(focusAreaReducer(initialState, {})).toEqual(initialState);
  });
});
