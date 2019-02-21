import {
  GET_USER_RESEARCH,
  GET_USER_RESEARCH_SUCCESS,
  GET_USER_RESEARCH_FAILURE,
} from '../../../constants/resources/research';
import {
  getResearch,
  getResearchSuccess,
  getResearchFailure,
} from '../../../store/actions/resources/getResearch';

describe('Gets the user research ', () => {
  it('should create an action to get all user research', () => {
    const data = [];
    const expectedAction = {
      type: GET_USER_RESEARCH,
      payload: data,
    };
    expect(getResearch(data)).toEqual(expectedAction);
  });
});

describe('GET user research success user action', () => {
  it('should create an action to update the state when the response is returned', () => {
    const data = [
      {
        title: 'Research about code',
        file: 'file.pdf',
      },
      {
        title: 'Research about code',
        file: 'file.pdf',
      },
    ];
    const expectedAction = {
      type: GET_USER_RESEARCH_SUCCESS,
      payload: data,
    };
    expect(getResearchSuccess(data)).toEqual(expectedAction);
  });
});

describe('Add user research failure user action', () => {
  it('should create an action to update the state when the reponse fails', () => {
    const data = {
      payload: { message: 'network error' },
    };
    const expectedAction = {
      type: GET_USER_RESEARCH_FAILURE,
      payload: data,
    };
    expect(getResearchFailure(data)).toEqual(expectedAction);
  });
});
