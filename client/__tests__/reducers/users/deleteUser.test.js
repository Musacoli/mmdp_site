import deleteResponse, {
  deleteUserFailure,
} from '../../../__mocks__/deleteResponse';
import {
  DELETE_USER,
  DELETING_SUCCESS,
  DELETING_FAILURE,
} from '../../../constants/users';
import deleteUser from '../../../store/reducers/users/deleteUser';
import { deleteInitialState } from '../../../__mocks__/initialState';

const action = { payload: {} };

describe('User Reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(deleteUser(deleteInitialState, action)).toEqual(deleteInitialState);
  });

  it('should handle EDIT_USER', () => {
    action.type = DELETE_USER;
    expect(deleteUser(deleteInitialState, action).success).toEqual(false);
  });

  it('should handle USER_EDIT_SUCCESS', () => {
    action.type = DELETING_SUCCESS;
    action.payload.results = deleteResponse;
    const deleteSuccessState = {
      success: true,
    };
    expect(deleteUser(deleteSuccessState, action).message.results).toEqual(
      deleteResponse,
    );
  });

  it('should handle USER_EDIT_ERROR', () => {
    action.type = DELETING_FAILURE;
    action.payload.results = deleteUserFailure;
    const deleteFailureState = {
      success: false,
    };
    expect(deleteUser(deleteFailureState, action).error.results).toEqual(
      deleteUserFailure,
    );
  });
});
