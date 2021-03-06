import { runSaga } from 'redux-saga';
import { api } from '../../../utils/api';
import { addStakeholder } from '../../../store/sagas/resources/Stakeholders';
import * as constants from '../../../constants/stakeholderDirectory';

describe('Add stakeholder saga', () => {
  it('should handle adding a stakeholder in case of success', async () => {
    const dispatchedActions = [];

    const payload = {};
    api.stakeholdersDirectory.create = jest.fn(() => Promise.resolve(payload));

    const mockStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        adding: true,
        error: null,
      }),
    };
    await runSaga(mockStore, addStakeholder, {}).done;
    expect(dispatchedActions).toEqual([
      { payload: undefined, type: constants.ADD_STAKEHOLDER_SUCCESS },
    ]);
  });

  it('should not add stakeholder error or failure', async () => {
    const dispatchedActions = [];

    const payload = {
      response: {
        data: ['error message'],
      },
    };
    api.stakeholdersDirectory.create = jest.fn(() => Promise.reject(payload));

    const mockStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        adding: false,
        error: 'error',
      }),
    };
    await runSaga(mockStore, addStakeholder, {}).done;
    expect(dispatchedActions).toEqual([
      { payload: { data: ['error message'] }, type: 'ADD_STAKEHOLDER_FAILURE' },
    ]);
  });
});
