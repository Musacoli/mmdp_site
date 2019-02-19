import { runSaga } from 'redux-saga';
import { api } from '../../../utils/api';
import { archiver } from '../../../store/sagas/resources/archive';

describe('Archive document saga', () => {
  it('should handle archiving document in case of success', async () => {
    const dispatchedActions = [];

    const payload = {
      data: {
        message: 'Document archived succesfully',
      },
    };
    api.resources.document.archive = jest.fn(() => Promise.resolve(payload));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
    };
    await runSaga(fakeStore, archiver, 'eow9mamzlaqjdiw').done;
    expect(api.resources.document.archive.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      {
        payload: { message: 'Document archived succesfully' },
        type: 'ARCHIVE_SUCCESS',
      },
      { type: 'FETCH_DOCUMENTS' },
    ]);
  });

  it('should handle document restoring in case of error', async () => {
    const dispatchedActions = [];

    api.resources.document.archive = jest.fn(() => Promise.resolve());

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
    };
    await runSaga(fakeStore, archiver, 'eow9mamzlaqjdiw').done;
    expect(api.resources.document.archive.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      {
        payload: { message: 'Something went wrong.' },
        type: 'ARCHIVE_FAILURE',
      },
    ]);
  });
});
