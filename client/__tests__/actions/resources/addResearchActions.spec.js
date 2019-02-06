import {
  ADD_USER_RESEARCH,
  ADD_USER_RESEARCH_SUCCESS,
  ADD_USER_RESEARCH_FAILURE,
} from '../../../constants/resources/research';
import {
  addResearchSuccessfull,
  addResearch,
  addResearchFailure,
} from '../../../store/actions/resources/research';

describe('Add user research action', () => {
  it('should create an action to post user research', () => {
    const userData = {
      title: 'Research about code',
      file: 'file.pdf',
    };
    const expectedAction = {
      type: ADD_USER_RESEARCH,
      payload: userData,
    };
    expect(addResearch(userData)).toEqual(expectedAction);
  });
});

describe('Add user research success user action', () => {
  it('should create an action to update the state when the reponse is returned', () => {
    const userResponse = {
      payload: { message: 'research posted successfully' },
    };
    const expectedAction = {
      type: ADD_USER_RESEARCH_SUCCESS,
      payload: userResponse,
    };
    expect(addResearchSuccessfull(userResponse)).toEqual(expectedAction);
  });
});

describe('Add user research failure user action', () => {
  it('should create an action to update the state when the reponse fails', () => {
    const userResponse = {
      payload: { message: 'research failed to be posted' },
    };
    const expectedAction = {
      type: ADD_USER_RESEARCH_FAILURE,
      payload: userResponse,
    };
    expect(addResearchFailure(userResponse)).toEqual(expectedAction);
  });
});
