import {
  ADD_COMMUNITIES,
  ADD_COMMUNITIES_FAILURE,
  ADD_COMMUNITIES_SUCCESS,
  FETCH_COMMUNITIES,
  FETCH_COMMUNITIES_FAILURE,
  FETCH_COMMUNITIES_SUCCESS,
  DELETE_COMMUNITY,
  DELETE_COMMUNITY_FAILURE,
  DELETE_COMMUNITY_SUCCESS,
} from '../../../constants';

export const deleteCommunity = (payload) => ({
  type: DELETE_COMMUNITY,
  payload,
});

export const deleteCommunitySuccess = (payload) => ({
  type: DELETE_COMMUNITY_SUCCESS,
  payload,
});

export const deleteCommunityFailure = (payload) => ({
  type: DELETE_COMMUNITY_FAILURE,
  payload,
});

export const fetchCommunities = (payload) => ({
  type: FETCH_COMMUNITIES,
  payload,
});

export const fetchCommunitiesSuccess = (payload) => ({
  type: FETCH_COMMUNITIES_SUCCESS,
  payload,
});

export const fetchCommunitiesFailure = (payload) => ({
  type: FETCH_COMMUNITIES_FAILURE,
  payload,
});

export const addCommunity = (payload) => ({
  type: ADD_COMMUNITIES,
  payload,
});

export const addCommunitiesSuccess = (payload) => ({
  type: ADD_COMMUNITIES_SUCCESS,
  payload,
});

export const addCommunitiesFailure = (payload) => ({
  type: ADD_COMMUNITIES_FAILURE,
  payload,
});
