import { user } from '../../../../__mocks__/fetchUserData';
import { FETCHING_USERS_SUCCESS, FETCHING, FETCHING_STARTED, FETCHING_USERS_ERROR } from '../../../../constants/users';
import fetchUsers from '../fetchUsers';
import initialState from './initialState';

const action = { payload: {} };

describe('User Reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(fetchUsers(initialState, action)).toEqual(initialState);
  });

  it('should handle FETCHING_STARTED', () => {
    action.type = FETCHING_STARTED;
    // action.payload.results = user.fetchedUsersData;
    // expect(fetchUsers(initialState.users, action).users).toEqual([]);
    expect(fetchUsers(initialState.users, action).success).toEqual(false);
  });

  it('should handle FETCHING_USERS_SUCCESS', () => {
    action.type = FETCHING_USERS_SUCCESS;
    action.payload.results = user.fetchedUsersData;
    expect(fetchUsers(initialState.users, action).users.results).toEqual(user.fetchedUsersData);
    expect(fetchUsers(initialState.users, action).success).toEqual(true);
  });

  it('should handle FETCHING', () => {
    action.type = FETCHING;
    action.payload.results = user.fetchedUsersData;
    expect(fetchUsers(initialState.users, action)).toEqual([]);
  });


});
