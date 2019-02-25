import {
  ADD_DOCUMENT,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
  FETCH_DOCUMENT,
  FETCH_DOCUMENT_SUCCESS,
  EDIT_DOCUMENT,
  EDIT_DOCUMENT_FAILURE,
  EDIT_DOCUMENT_SUCCESS,
} from '../../../../constants/resources/document';

import documentsReducer, {
  initialState,
} from '../../../../store/reducers/resources/document';

const documentActions = [
  {
    type: ADD_DOCUMENT,
    expected: true,
    payload: {},
  },
  {
    type: ADD_DOCUMENT_SUCCESS,
    expected: false,
    payload: {},
  },
  {
    type: ADD_DOCUMENT_FAILURE,
    expected: false,
    payload: {},
  },
  {
    type: FETCH_DOCUMENT,
    expected: true,
    payload: {},
  },
  {
    type: FETCH_DOCUMENT_SUCCESS,
    expected: false,
    payload: {},
  },
  {
    type: EDIT_DOCUMENT,
    expected: true,
    payload: {},
  },
  {
    type: EDIT_DOCUMENT_SUCCESS,
    expected: false,
    payload: {},
  },
  {
    type: EDIT_DOCUMENT_FAILURE,
    expected: false,
    payload: {},
  },
];
describe('Document reducers', () => {
  documentActions.map((action) => {
    return it(`should set ${action.type}`, () => {
      expect(documentsReducer(initialState, action).loading).toEqual(
        action.expected,
      );
    });
  });
  it('should provide an initial state', () => {
    expect(documentsReducer(initialState, {})).toEqual(initialState);
  });
});
