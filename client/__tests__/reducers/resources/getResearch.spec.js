import {
  GET_USER_RESEARCH,
  GET_USER_RESEARCH_SUCCESS,
  GET_USER_RESEARCH_FAILURE,
  ARCHIVE_USER_RESEARCH_SUCCESS,
  DELETE_USER_RESEARCH_SUCCESS,
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

  it('should return successful ', () => {
    const action = {
      type: GET_USER_RESEARCH_SUCCESS,
      loading: false,
      payload: {
        results: ['research 1', 'research 2'],
      },
    };

    expect(getResearchReducer({}, action)).toEqual({
      loading: false,
      results: {
        results: ['research 1', 'research 2'],
      },
    });
  });

  it('should return get failure for research', () => {
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

  it('should return get failure for deleting research', () => {
    const action = {
      type: DELETE_USER_RESEARCH_SUCCESS,
      payload: {
        message: 'Network failure',
      },
    };

    expect(
      getResearchReducer(
        {
          results: {
            data: {
              results: [{ _id: '123456', title: 'research 20' }],
            },
          },
        },
        action,
      ),
    ).toEqual({
      loading: false,
      results: { data: { results: [{ _id: '123456', title: 'research 20' }] } },
    });
  });

  it('should return archive successfor research', () => {
    const action = {
      type: ARCHIVE_USER_RESEARCH_SUCCESS,
      payload: { _id: 'sda21321', data: { Archived: false } },
    };

    expect(
      getResearchReducer(
        {
          results: {
            data: { results: [{ _id: 'sda21321', Archived: false }] },
          },
        },
        action,
      ),
    ).toEqual({
      loading: false,
      results: {
        data: { results: [{ Archived: false, _id: 'sda21321' }] },
        newResults: false,
      },
    });
  });
});
