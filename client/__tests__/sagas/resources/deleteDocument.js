import { runSaga } from 'redux-saga';
import { api } from '../../../utils/api';
import { deleteDoc } from '../../../store/sagas/resources/deleteDocument';

describe('Delete document saga', () => {
  it('should handle document deletion in case of success', async () => {
    const dispatchedActions = [];

    const payload = {
      data: {
        message: 'Document deleted succesfully',
      },
    };
    api.resources.document.delete = jest.fn(() => Promise.resolve(payload));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
    };
    await runSaga(fakeStore, deleteDoc, 'eow9mamzlaqjdiw').done;
    expect(api.resources.document.delete.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      {
        payload: { message: 'Document deleted succesfully' },
        type: 'DELETE_SUCCESS',
      },
      {
        payload: { mediaType: false, page: 1, search: '' },
        type: 'FETCH_DOCUMENTS',
      },
    ]);
  });

  it('should handle document deletion in case of error', async () => {
    const dispatchedActions = [];

    api.resources.document.delete = jest.fn(() => Promise.resolve());

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
    };
    await runSaga(fakeStore, deleteDoc, {}).done;
    expect(api.resources.document.delete.mock.calls.length).toBe(1);
    expect(dispatchedActions).toEqual([
      {
        payload: { message: 'Something went wrong.' },
        type: 'DELETE_FAILURE',
      },
    ]);
  });
});
