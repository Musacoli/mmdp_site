import {
  ADD_USER_RESEARCH,
  ADD_USER_RESEARCH_SUCCESS,
} from '../../../../constants/resources/research';
import { addResearchSuccessfull, addResearch } from '../research';

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

describe('Add user research success or failure user action', () => {
  it('should create an action to update the state when the reponse is returned', () => {
    const userResponse = {
      message: 'research posted successfully',
    };
    const expectedAction = {
      type: ADD_USER_RESEARCH_SUCCESS,
      payload: userResponse,
    };
    expect(addResearchSuccessfull(userResponse)).toEqual(expectedAction);
  });
});
