import { runSaga } from 'redux-saga';
import { api } from '../../../utils/events';
import { archiver } from '../../../store/sagas/events/archiveEvents';

describe('Archive event saga', () => {
  it('should handle archiving events in case of success', async () => {
    const dispatchedActions = [];

    const payload = {
      data: {
        message: 'Event archived succesfully',
        page: 1,
        search: '',
      },
    };
    api.archive = jest.fn(() => Promise.resolve(payload));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
    };
    await runSaga(fakeStore, archiver, 'archiveeny').done;
    expect(api.archive.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      {
        payload: {
          message: 'Event archived succesfully',
          page: 1,
          search: '',
        },
        type: 'ARCHIVE_EVENT_SUCCESS',
      },
      {
        payload: { page: 1, search: '' },
        type: 'LIST_EVENTS_REQUEST',
      },
    ]);
  });

  it('should handle event restoring in case of error', async () => {
    const dispatchedActions = [];

    api.archive = jest.fn(() => Promise.resolve());

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
    };
    await runSaga(fakeStore, archiver, 'archiveeny').done;
    expect(api.archive.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      {
        payload: { message: 'Something went wrong.' },
        type: 'ARCHIVE_EVENT_FAILURE',
      },
    ]);
  });
});
