import { runSaga } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';
import { api } from '../../../utils/api';
import {
  registerUser,
  editUser,
  watchUserEdit,
  watchRegistration,
} from '../../../store/sagas/users/AddUsersSaga';
import { REGISTERING_USER, EDITING_USER } from '../../../constants/users';

describe('Add users saga', () => {
  it('should handle user registration in case of success', async () => {
    const dispatchedActions = [];

    const payload = ['chariss', 'chali'];
    api.users.create = jest.fn(() => Promise.resolve(payload));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        status: false,
        success: false,
        isRegistering: false,
      }),
    };
    await runSaga(fakeStore, registerUser, {}).done;
    expect(api.users.create.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      {
        type: 'REGISTER_USER',
      },
      { payload: undefined, type: 'REGISTER_SUCCESS' },
    ]);
  });

  it('should not handle user registration in case of an error', async () => {
    const dispatchedActions = [];

    const payload = ['chariss', 'chali'];
    api.users.create = jest.fn(() => Promise.reject(payload));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        status: false,
        success: false,
        isRegistering: false,
      }),
    };
    await runSaga(fakeStore, registerUser, {}).done;
    expect(api.users.create.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      { type: 'REGISTER_USER' },
      { type: 'REGISTER_ERROR', payload: { message: 'Something went wrong.' } },
    ]);
  });
});

describe('Edit users saga', () => {
  it('should handle user editing in case of success', async () => {
    const dispatchedActions = [];

    api.users.edit = jest.fn(() => Promise.resolve({}));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        status: false,
        success: false,
        isRegistering: false,
      }),
    };
    await runSaga(fakeStore, editUser, {}).done;
    expect(api.users.edit.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      { type: 'EDIT_USER' },
      { payload: undefined, type: 'USER_EDIT_SUCCESS' },
    ]);
  });

  it('should not handle user editing in case of an error', async () => {
    const dispatchedActions = [];
    /* eslint-disable prefer-promise-reject-errors */
    api.users.edit = jest.fn(() => Promise.reject({}));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        status: false,
        success: false,
        isRegistering: false,
      }),
    };
    await runSaga(fakeStore, editUser, {}).done;
    expect(api.users.edit.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      { type: 'EDIT_USER' },
      {
        payload: { message: 'Something went wrong.' },
        type: 'USER_EDIT_ERROR',
      },
    ]);
  });
});

describe('should wait for dispatched actions when creating a user', () => {
  let generator = null;

  test('should wait for the proper action', () => {
    generator = watchRegistration();
    put({ type: REGISTERING_USER });
    const actual = generator.next();

    expect(actual.value).toEqual(takeLatest(REGISTERING_USER, registerUser));
  });
});

describe('should wait for dispatched actions when editing a user', () => {
  let generator = null;

  test('should wait for the proper action', () => {
    generator = watchUserEdit();
    put({ type: EDITING_USER });
    const actual = generator.next();

    expect(actual.value).toEqual(takeLatest(EDITING_USER, editUser));
  });
});
