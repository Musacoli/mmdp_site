/* eslint-disable no-undef */
import * as types from '../../../constants/dropdowns/communities';
import * as actions from '../../../store/actions/dropdowns/communities';

describe('List communities action tests', () => {
  it('should dispatch FETCH_COMMUNITIES', () => {
    expect(actions.fetchCommunities({}).type).toEqual(types.FETCH_COMMUNITIES);
  });
  it('should dispatch FETCH_COMMUNITIES_SUCCESS', () => {
    expect(actions.fetchCommunitiesSuccess({}).type).toEqual(
      types.FETCH_COMMUNITIES_SUCCESS,
    );
  });
  it('should dispatch FETCH_COMMUNITIES_FAILURE', () => {
    expect(actions.fetchCommunitiesFailure({}).type).toEqual(
      types.FETCH_COMMUNITIES_FAILURE,
    );
  });
});

describe('create community action tests', () => {
  it('should dispatch ADD_COMMUNITIES', () => {
    expect(actions.addCommunity({}).type).toEqual(types.ADD_COMMUNITIES);
  });
  it('should dispatch ADD_COMMUNITIES_SUCCESS', () => {
    expect(actions.addCommunitiesSuccess({}).type).toEqual(
      types.ADD_COMMUNITIES_SUCCESS,
    );
  });
  it('should dispatch ADD_COMMUNITIES_FAILURE', () => {
    expect(actions.addCommunitiesFailure({}).type).toEqual(
      types.ADD_COMMUNITIES_FAILURE,
    );
  });
});
describe('Delete community action tests', () => {
  it('should dispatch DELETE_COMMUNITY', () => {
    expect(actions.deleteCommunity({}).type).toEqual(types.DELETE_COMMUNITY);
  });
  it('should dispatch DELETE_COMMUNITY_SUCCESS', () => {
    expect(actions.deleteCommunitySuccess({}).type).toEqual(
      types.DELETE_COMMUNITY_SUCCESS,
    );
  });
  it('should dispatch DELETE_COMMUNITY_FAILURE', () => {
    expect(actions.deleteCommunityFailure({}).type).toEqual(
      types.DELETE_COMMUNITY_FAILURE,
    );
  });
});
