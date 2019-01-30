/* eslint-env jest */
import * as types from '../../../../constants/about';
import * as governorMessageActions from '../../../../store/actions/about/governorMessage';

describe('About MMDP Actions Creators', () => {
  it('should dispatch CREATE_GOVERNOR_MESSAGE_REQUEST', () => {
    expect(governorMessageActions.createGovernorMessage({}).type).toEqual(
      types.CREATE_GOVERNOR_MESSAGE_REQUEST,
    );
  });
  it('should dispatch GET_GOVERNOR_MESSAGE_REQUEST', () => {
    expect(governorMessageActions.getGovernorMessage({}).type).toEqual(
      types.GET_GOVERNOR_MESSAGE_REQUEST,
    );
  });
  it('should dispatch UPDATE_GOVERNOR_MESSAGE_REQUEST', () => {
    expect(governorMessageActions.updateGovernorMessage({}).type).toEqual(
      types.UPDATE_GOVERNOR_MESSAGE_REQUEST,
    );
  });
});
