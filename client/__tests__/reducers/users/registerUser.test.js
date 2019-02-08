import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from '../../../constants/users';
import addUser from '../../../store/reducers/users';
import initialState, {
  initialStateEdit,
} from '../../../__mocks__/initialState';

const action = { payload: {} };

describe('User Reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(addUser(initialState, action)).toEqual(initialState);
  });

  it('should handle EDIT_USER', () => {
    action.type = REGISTER_USER;
    expect(addUser(initialState, action).success).toEqual(false);
  });

  it('should handle USER_EDIT_SUCCESS', () => {
    action.type = REGISTER_SUCCESS;
    expect(addUser(initialStateEdit, action).success).toEqual(true);
  });

  it('should handle USER_EDIT_ERROR', () => {
    action.type = REGISTER_ERROR;
    expect(addUser(initialStateEdit, action).success).toEqual(false);
  });
});
