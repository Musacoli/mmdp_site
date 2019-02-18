/* eslint-disable no-unused-vars */
import {
  GET_SINGLE_RESEARCH_FAILURE,
  GET_SINGLE_RESEARCH_SUCCESS,
  GET_SINGLE_RESEARCH_REQUEST,
  UPDATE_RESEARCH_REQUEST,
  UPDATE_RESEARCH_FAILURE,
  UPDATE_RESEARCH_SUCCESS,
  UPDATE_INPUT_DATA,
} from '../../../constants/resources/research';
import editResearchReducer from '../../../store/reducers/resources/editResearch';

describe('Add Research reducer', () => {
  const initialState = {
    loading: false,
    researchItem: {},
    updateInput: {},
    error: {},
  };
  const error = {
    data: { message: 'Invalid Object Id' },
  };
  const researchItem = {
    title: 'Welcome To Research',
    researchFile: {
      bucket: 'mmdp-img-assets',
      etag: '9bd46a8adedb4a78a165c4ad6c302a25',
      filename: 'VHl2-3o5I-DdnL-Q',
      mimetype: 'application/pdf',
      path: '/assets/documents',
      size: 519957,
      url:
        'https://s3.amazonaws.com/mmdp-img-assets/assets/documents/VHl2-3o5I-DdnL-Q',
    },
  };

  it('should return loading equal to true when making a request', () => {
    const action = {
      type: GET_SINGLE_RESEARCH_REQUEST,
    };
    expect(editResearchReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should return loading equal to true when making a request', () => {
    const action = {
      type: UPDATE_RESEARCH_REQUEST,
    };
    expect(editResearchReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should set loading to false', () => {
    const action = {
      type: UPDATE_RESEARCH_SUCCESS,
      data: { message: 'Successfully Updated The Research Item' },
    };

    expect(editResearchReducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
    });
  });

  it('should set loading to false and also return a message', () => {
    const action = {
      type: UPDATE_RESEARCH_FAILURE,
    };

    expect(editResearchReducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
    });
  });

  it('should set loading to false return Data For the Research Item', () => {
    const action = {
      type: GET_SINGLE_RESEARCH_SUCCESS,
      payload: researchItem,
    };

    expect(editResearchReducer(initialState, action)).toEqual({
      ...initialState,
      researchItem,
      loading: false,
    });
  });

  it('should set loading to false and Update the Input Data', () => {
    const action = {
      type: UPDATE_INPUT_DATA,
      payload: researchItem,
    };

    expect(editResearchReducer(initialState, action)).toEqual({
      ...initialState,
      updateInput: researchItem,
      loading: false,
    });
  });

  it('should set loading to false Return An Error Message', () => {
    const action = {
      type: GET_SINGLE_RESEARCH_FAILURE,
      payload: error,
    };

    expect(editResearchReducer(initialState, action)).toEqual({
      ...initialState,
      error,
      loading: false,
    });
  });
});
