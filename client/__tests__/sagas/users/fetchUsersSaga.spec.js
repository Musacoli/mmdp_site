import { runSaga } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import { api } from '../../../utils/api';
import {
  watchFetchingUsers,
  loadUsers,
} from '../../../store/sagas/users/fetchUsers';

describe('fetch users saga', () => {
  it('should handle fetching users in case of success', async () => {
    const dispatchedActions = [];

    const usersList = {
      data: {
        status: 'success',
        users: [
          {
            email: 'charisschomba@gmail.com',
            isAdmin: false,
            groups: [
              {
                _id: '5c51a233bc3c8c1adc3f5469',
                name: 'Super Admin',
              },
            ],
            username: 'charisschomba8779',
            last_name: 'last name',
            first_name: 'first name',
          },
        ],
        pagination: {
          total: 1,
          currentPage: 1,
          totalPages: 1,
          pages: [1],
          previous: false,
          next: false,
          first: 1,
          last: 1,
        },
      },
    };
    api.users.list = jest.fn(() => Promise.resolve(usersList));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        status: false,
        success: false,
        isRegistering: false,
      }),
    };
    await runSaga(fakeStore, loadUsers, {}).done;
    expect(api.users.list.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      { type: 'FETCHING_STARTED' },
      {
        payload: {
          pagination: {
            currentPage: 1,
            first: 1,
            last: 1,
            next: false,
            pages: [1],
            previous: false,
            total: 1,
            totalPages: 1,
          },
          status: 'success',
          users: [
            {
              email: 'charisschomba@gmail.com',
              first_name: 'first name',
              groups: [
                { _id: '5c51a233bc3c8c1adc3f5469', name: 'Super Admin' },
              ],
              isAdmin: false,
              last_name: 'last name',
              username: 'charisschomba8779',
            },
          ],
        },
        type: 'FETCHING_USERS_SUCCESS',
      },
    ]);
  });

  it('should not handle  fetching users in case of error', async () => {
    const dispatchedActions = [];

    const usersList = {
      data: {
        users: { u: ['chariss', 'chali'] },
      },
    };
    const {
      data: { users },
    } = usersList;

    api.users.list = jest.fn(() => Promise.reject(users));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        status: false,
        success: false,
        isRegistering: false,
      }),
    };
    await runSaga(fakeStore, loadUsers, { payload: {} }).done;
    expect(api.users.list.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      { type: 'FETCHING_STARTED' },
      {
        payload: { message: 'Something went wrong.' },
        type: 'FETCHING_USERS_ERROR',
      },
    ]);
  });
});

describe('should wait for dispatched actions', () => {
  let generator = null;
  beforeEach(() => {
    generator = watchFetchingUsers();
  });
  const actionType = 'FETCHING';
  test('should wait for the proper action', () => {
    put({ type: actionType });
    const actual = generator.next();
    expect(actual.value).toEqual(takeLatest(actionType, loadUsers));
  });
});
