import user from '../../../__mocks__/fetchUserData';
import {
  FETCHING_ONE_USER_ERROR,
  FETCHING_ONE,
  FETCHING_ONE_STARTED,
  FETCHING_ONE_USER_SUCCESS,
} from '../../../constants/users';
import fetchUser from '../../../store/reducers/users/fetchOneUser';
import { initialStateFetchOne } from '../../../__mocks__/initialState';

const action = { payload: {} };

describe('User Reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(fetchUser(initialStateFetchOne, action)).toEqual(
      initialStateFetchOne,
    );
  });

  it('should handle FETCHING_ONE_STARTED', () => {
    action.type = FETCHING_ONE_STARTED;
    expect(fetchUser(initialStateFetchOne.success, action)).toEqual(false);
  });

  it('should handle FETCHING_USERS_SUCCESS', () => {
    action.type = FETCHING_ONE_USER_SUCCESS;
    /* eslint-disable  prefer-destructuring */
    action.payload.results = user.fetchedUsersData[0];
    expect(
      fetchUser(initialStateFetchOne.singleUser, action).singleUser.results,
    ).toEqual(user.fetchedUsersData[0]);
    expect(fetchUser(initialStateFetchOne.singleUser, action).success).toEqual(
      true,
    );
  });

  it('should handle FETCHING', () => {
    action.type = FETCHING_ONE;
    action.payload.results = user.fetchedUsersData[0];
    expect(fetchUser(initialStateFetchOne, action).singleUser).toEqual(null);
  });

  it('should handle FETCHING_ONE_USER_ERROR', () => {
    action.type = FETCHING_ONE_USER_ERROR;
    action.payload.results = { error: 'something went wrong' };
    expect(fetchUser(initialStateFetchOne, action).error).toEqual(true);
  });
});
