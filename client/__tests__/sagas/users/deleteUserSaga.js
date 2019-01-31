import { runSaga } from 'redux-saga';
import { api } from '../../../utils/api';
import { deleteUser } from '../../../store/sagas/users/deleteUser';
import {
  DELETING_USER,
  DELETING_SUCCESS,
  DELETING_FAILURE,
} from '../../../constants/users';

describe('Delete users saga', () => {
  it('should handle user deletion in case of success', async () => {
    const dispatchedActions = [];

    const payload = ['chariss', 'chali'];
    api.users.delete = jest.fn(() => Promise.resolve(payload));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        message: '',
        error: '',
        isDeleting: false,
        success: true,
      }),
    };
    await runSaga(fakeStore, deleteUser, {}).done;
    expect(api.users.delete.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      {
        type: DELETING_USER,
      },
      { payload: undefined, type: DELETING_SUCCESS },
      { type: 'FETCHING' },
    ]);
  });

  it('should handle user deletion in case of error', async () => {
    const dispatchedActions = [];

    api.users.delete = jest.fn(() => Promise.resolve());

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        message: '',
        error: '',
        isDeleting: false,
        success: false,
      }),
    };
    await runSaga(fakeStore, deleteUser, {}).done;
    expect(api.users.delete.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      { type: DELETING_USER },
      {
        payload: { message: 'Something went wrong.' },
        type: DELETING_FAILURE,
      },
    ]);
  });
});
