import {
  FETCH_DOCUMENTS,
  FETCH_DOCUMENT_FAILURE,
} from '../../../../constants/resources/document';

import documentReducer, {
  initialState,
} from '../../../../store/reducers/resources/document';

describe('documentReducer Reducer', () => {
  it('should provide an initial state', () => {
    expect(documentReducer(initialState, {})).toEqual(initialState);
  });
  it('should fetch groupReducer', () => {
    expect(
      documentReducer(null, {
        type: FETCH_DOCUMENTS,
        payload: { isFetching: false },
      }).isFetching,
    ).toEqual(true);
  });
  it('should set FETCH_DOCUMENT_FAILURE', () => {
    expect(
      documentReducer(null, {
        type: FETCH_DOCUMENT_FAILURE,
        payload: { isFetching: false },
      }).isFetching,
    ).toEqual(false);
  });
  it('should set isFetching false', () => {
    expect(
      documentReducer(null, {
        type: FETCH_DOCUMENT_FAILURE,
        payload: { isFetching: false },
      }).isFetching,
    ).toEqual(false);
  });
});
