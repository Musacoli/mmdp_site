import {
  ADD_USER_RESEARCH,
  ADD_USER_RESEARCH_SUCCESS,
  ADD_USER_RESEARCH_FAILURE,
} from '../../../constants/resources/research';
import researchReducer from '../../../store/reducers/resources/research';

describe('Add Research reducer', () => {
  it('should return the initial state', () => {
    expect(researchReducer({}, ADD_USER_RESEARCH)).toEqual({});
  });

  it('should return the user state with the data passed in', () => {
    const action = {
      type: ADD_USER_RESEARCH,
      loading: true,
      payload: {
        title: 'research about Africa',
        file: 'res.pdf',
      },
    };
    expect(researchReducer({}, action)).toEqual({
      loading: true,
      payload: {
        title: 'research about Africa',
        file: 'res.pdf',
      },
    });
  });

  it('should return successful research posted', () => {
    const action = {
      type: ADD_USER_RESEARCH_SUCCESS,
      loading: false,
      payload: {
        message: 'research added successfully',
      },
    };

    expect(researchReducer({}, action)).toEqual({
      loading: false,
      payload: {
        message: 'research added successfully',
      },
    });
  });

  it('should return post failure for research', () => {
    const action = {
      type: ADD_USER_RESEARCH_FAILURE,
      payload: {
        message: 'invalid details provided',
      },
    };

    expect(researchReducer({}, action)).toEqual({
      loading: false,
      payload: {
        message: 'invalid details provided',
      },
    });
  });
});
