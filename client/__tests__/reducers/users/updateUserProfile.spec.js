import { responsePayload } from '../../../__mocks__/userProfileData';
import {
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_COMPLETE,
} from '../../../constants/users';
import updateUserProfile from '../../../store/reducers/users/updateUserProfile';
import { initialUpdateUserProfile } from '../../../__mocks__/initialState';

const action = { payload: {} };

describe('Update User Profile Reducer', () => {
  it('should return initial state when there is no action', () => {
    expect(updateUserProfile(initialUpdateUserProfile, action)).toEqual(
      initialUpdateUserProfile,
    );
  });

  it('should handle UPDATE_USER_PROFILE', () => {
    action.type = UPDATE_USER_PROFILE;
    expect(
      updateUserProfile(initialUpdateUserProfile, action).isUpdating,
    ).toEqual(true);
  });

  it('should handle UPDATE_USER_PROFILE_COMPLETE', () => {
    action.type = UPDATE_USER_PROFILE_COMPLETE;
    action.payload = responsePayload.data;
    expect(
      updateUserProfile(initialUpdateUserProfile, action).response,
    ).toEqual('Congrations! Your profile has been updated');
  });
});
