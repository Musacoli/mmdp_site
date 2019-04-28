import { runSaga } from 'redux-saga';
import { responsePayload } from '../../../__mocks__/userProfileData';
import { api } from '../../../utils/api';
import { updateUserProfile } from '../../../store/sagas/users/updateUserProfile';
import { UPDATE_USER_PROFILE_COMPLETE } from '../../../constants/users';

describe('Update users profile saga', () => {
  it('should handle profile update', async () => {
    const dispatchedActions = [];

    api.users.updateProflie = jest.fn(() => Promise.resolve(responsePayload));

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        response: null,
        isUpdating: false,
        success: false,
      }),
    };
    await runSaga(fakeStore, updateUserProfile, {}).done;
    expect(dispatchedActions).toEqual([
      {
        payload: responsePayload.data,
        type: UPDATE_USER_PROFILE_COMPLETE,
      },
    ]);
  });
});
