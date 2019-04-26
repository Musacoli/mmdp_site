import { runSaga } from 'redux-saga';
import registrationPayload from '../../../__mocks__/completeRegistrationData';
import completeRegistrationApi from '../../../utils/completeRegistration';
import { completeUserRegistration } from '../../../store/sagas/users/completeRegistration';
import {
  COMPLETE_REGISTRATION_USER_START,
  COMPLETE_REGISTRATION_FAIL_OR_SUCCESS,
} from '../../../constants/users';

describe('Complete users registration saga', () => {
  it('should handle user registration in case of success', async () => {
    const dispatchedActions = [];

    completeRegistrationApi.put = jest.fn(() =>
      Promise.resolve(registrationPayload),
    );

    const fakeStore = {
      dispatch: (action) => dispatchedActions.push(action),
      getState: () => ({
        message: '',
        isRegistering: false,
        success: true,
        groups: null,
      }),
    };
    await runSaga(fakeStore, completeUserRegistration, {}).done;
    expect(dispatchedActions).toEqual([
      {
        type: COMPLETE_REGISTRATION_USER_START,
      },
      {
        payload: registrationPayload,
        type: COMPLETE_REGISTRATION_FAIL_OR_SUCCESS,
      },
    ]);
  });
});
