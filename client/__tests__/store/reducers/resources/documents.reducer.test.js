import {
  ADD_DOCUMENT,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_FAILURE,
} from '../../../../constants/resources/document';
import documentsReducer, {
  initialState,
} from '../../../../store/reducers/resources/document';

describe('Document reducers', () => {
  it('should provide an initial state', () => {
    expect(documentsReducer(initialState, {})).toEqual(initialState);
  });
  it('should set ADD_DOCUMENT', () => {
    expect(
      documentsReducer(initialState, {
        type: ADD_DOCUMENT,
        payload: {},
      }).loading,
    ).toEqual(true);
  });

  it('should set ADD_DOCUMENT_SUCCESS', () => {
    expect(
      documentsReducer(initialState, {
        type: ADD_DOCUMENT_SUCCESS,
        payload: {},
      }).loading,
    ).toEqual(false);
  });

  it('should set ADD_DOCUMENT_FAILURE', () => {
    expect(
      documentsReducer(initialState, {
        type: ADD_DOCUMENT_FAILURE,
        payload: {},
      }).loading,
    ).toEqual(false);
  });
});
