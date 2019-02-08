import { runSaga } from 'redux-saga';
import { api } from '../../../utils/api';
import { loadOneUser } from '../../../store/sagas/users/fetchOneUser';

describe('fetch user saga', () => {
  it('should handle fetching user in case of success', async () => {
    const dispatchedActions = [];

    const user = {
      status: 'success',
      data: {
        user: {
          _id: '5c599b5380ff2292bd17ce0a',
          email: 'super.admin@mmdp.com',
          groups: [
            {
              _id: '5c599b5380ff2292bd17ce09',
              name: 'Security Admin',
              __v: 0,
              createdAt: '2019-02-05T14:18:59.847Z',
              permissions: ['user.*', 'group.*', 'user.view', ''],
            },
          ],
          confirmed: true,
          username: 'new@User',
        },
      },
    };

    api.users.getOne = jest.fn(() => Promise.resolve(user));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        status: false,
        success: false,
        isFetching: false,
      }),
    };
    await runSaga(fakeStore, loadOneUser, user.data.user.username).done;
    expect(api.users.getOne.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      {
        payload: {
          _id: '5c599b5380ff2292bd17ce0a',
          confirmed: true,
          email: 'super.admin@mmdp.com',
          groups: [
            {
              __v: 0,
              _id: '5c599b5380ff2292bd17ce09',
              createdAt: '2019-02-05T14:18:59.847Z',
              name: 'Security Admin',
              permissions: ['user.*', 'group.*', 'user.view', ''],
            },
          ],
          username: 'new@User',
        },
        type: 'FETCHING_ONE_USER_SUCCESS',
      },
    ]);
  });

  it('should handle fetching user in case of success', async () => {
    const dispatchedActions = [];

    const user = {
      status: 'success',
      data: {
        user: {
          _id: '5c599b5380ff2292bd17ce0a',
          email: 'super.admin@mmdp.com',
          groups: [
            {
              _id: '5c599b5380ff2292bd17ce09',
              name: 'Security Admin',
              __v: 0,
              createdAt: '2019-02-05T14:18:59.847Z',
              permissions: ['user.*', 'group.*', 'user.view', ''],
            },
          ],
          confirmed: true,
          username: 'new@User',
        },
      },
    };

    api.users.getOne = jest.fn(() => Promise.reject(user));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        status: false,
        success: false,
        isFetching: false,
      }),
    };
    await runSaga(fakeStore, loadOneUser, user.data.user.username).done;
    expect(api.users.getOne.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      {
        payload: { message: 'Something went wrong.' },
        type: 'FETCHING_ONE_USER_ERROR',
      },
    ]);
  });
});
