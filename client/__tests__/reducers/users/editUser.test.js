import editResponse from '../../../__mocks__/editUserResponse';
import {
  EDIT_USER,
  USER_EDIT_SUCCESS,
  USER_EDIT_ERROR,
} from '../../../constants/users';
import editUser from '../../../store/reducers/users/editUser';
import initialState, {
  initialStateEdit,
} from '../../../__mocks__/initialState';

const action = { payload: {} };

describe('User Reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(editUser(initialState, action)).toEqual(initialState);
  });

  it('should handle EDIT_USER', () => {
    action.type = EDIT_USER;
    expect(editUser(initialState, action).success).toEqual(false);
  });

  it('should handle USER_EDIT_SUCCESS', () => {
    action.type = USER_EDIT_SUCCESS;
    action.payload.results = editResponse;
    expect(editUser(initialStateEdit, action).success).toEqual(true);
  });

  it('should handle USER_EDIT_ERROR', () => {
    action.type = USER_EDIT_ERROR;
    action.payload.results = editResponse;
    expect(editUser(initialStateEdit, action).success).toEqual(false);
  });
});
