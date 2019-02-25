import user from '../../../__mocks__/fetchUserData';
import {
  FETCHING_USERS_SUCCESS,
  FETCHING,
  FETCHING_STARTED,
} from '../../../constants/users';
import fetchUsers from '../../../store/reducers/users/fetchUsers';
import initialState from '../../../__mocks__/initialState';

const action = { payload: { results: user.results } };

describe('User Reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(fetchUsers(initialState, action)).toEqual(initialState);
  });

  it('should handle FETCHING_STARTED', () => {
    action.type = FETCHING_STARTED;
    expect(fetchUsers(initialState.users, action).success).toEqual(false);
  });

  it('should handle FETCHING_USERS_SUCCESS', () => {
    action.type = FETCHING_USERS_SUCCESS;
    action.payload.users = user.fetchedUsersData;
    action.payload.pagination = user.pagination;
    expect(fetchUsers(initialState.users, action).users).toEqual(
      user.fetchedUsersData,
    );
    expect(fetchUsers(initialState.users, action).success).toEqual(true);
  });

  it('should handle FETCHING', () => {
    action.type = FETCHING;
    action.payload.results = user.fetchedUsersData;
    expect(fetchUsers(initialState.users, action)).toEqual([]);
  });
});
