import {
  GET_USER_RESEARCH,
  GET_USER_RESEARCH_SUCCESS,
  GET_USER_RESEARCH_FAILURE,
} from '../../../constants/resources/research';
import getResearchReducer from '../../../store/reducers/resources/getResearch';

describe('Get Research reducer', () => {
  it('should return the initial state', () => {
    expect(getResearchReducer({}, GET_USER_RESEARCH)).toEqual({});
  });

  it('should return the user state with the data passed in', () => {
    const action = {
      type: GET_USER_RESEARCH,
      loading: true,
      payload: {
        results: ['research 1', 'research 2'],
      },
    };
    expect(getResearchReducer({}, action)).toEqual({
      loading: true,
      payload: {
        results: ['research 1', 'research 2'],
      },
    });
  });

  it('should return successful research posted', () => {
    const action = {
      type: GET_USER_RESEARCH_SUCCESS,
      loading: false,
      payload: {
        results: ['research 1', 'research 2'],
      },
    };

    expect(getResearchReducer({}, action)).toEqual({
      loading: false,
      payload: {
        results: ['research 1', 'research 2'],
      },
    });
  });

  it('should return post failure for research', () => {
    const action = {
      type: GET_USER_RESEARCH_FAILURE,
      payload: {
        message: 'Network failure',
      },
    };

    expect(getResearchReducer({}, action)).toEqual({
      loading: false,
      payload: {
        message: 'Network failure',
      },
    });
  });
});
