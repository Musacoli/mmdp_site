/* eslint-env jest */
import {
  FETCH_GROUPS, FETCHING_GROUPS,
  CREATE_GROUP, GROUP_CREATED_SUCCESS, UPDATE_GROUP,
  CLEAR_GROUP_ERRORS, FETCH_GROUP, EDIT_GROUP, TOGGLE_DELETE_GROUP,
  SET_GROUP, TOGGLE_SELECT_GROUPS, UNSELECT_ALL_GROUPS,
} from '../../../../constants';
import {
  fetchGroups, fetchingGroups, createGroup, groupCreatedSuccessfully,
  clearGroupErrors, fetchGroup, editGroup, updateGroup, toggleDeleteGroup,
  setGroup, toggleSelectGroups, unSelectAllGroups,
} from '../../../../store/actions/groups';

describe('Group Actions Creators', () => {
  it('should dispatch UNSELECT_ALL_GROUPS', () => {
    expect(unSelectAllGroups({}).type).toEqual(UNSELECT_ALL_GROUPS);
  });
  it('should dispatch TOGGLE_SELECT_GROUPS', () => {
    expect(toggleSelectGroups({}).type).toEqual(TOGGLE_SELECT_GROUPS);
  });
  it('should dispatch SET_GROUP', () => {
    expect(setGroup({}).type).toEqual(SET_GROUP);
  });
  it('should dispatch TOGGLE_DELETE_GROUP', () => {
    expect(toggleDeleteGroup({}).type).toEqual(TOGGLE_DELETE_GROUP);
  });
  it('should dispatch UPDATE_GROUP', () => {
    expect(updateGroup({}).type).toEqual(UPDATE_GROUP);
  });
  it('should dispatch EDIT_GROUP', () => {
    expect(editGroup({}).type).toEqual(EDIT_GROUP);
  });
  it('should dispatch FETCH_GROUP', () => {
    expect(fetchGroup({}).type).toEqual(FETCH_GROUP);
  });
  it('should dispatch CLEAR_GROUP_ERRORS', () => {
    expect(clearGroupErrors({}).type).toEqual(CLEAR_GROUP_ERRORS);
  });
  it('should dispatch GROUP_CREATED_SUCCESS', () => {
    expect(groupCreatedSuccessfully({}).type).toEqual(GROUP_CREATED_SUCCESS);
  });
  it('should dispatch FETCH_GROUPS', () => {
    expect(fetchGroups({}).type).toEqual(FETCH_GROUPS);
  });

  it('should dispatch fetchingGroups', () => {
    expect(fetchingGroups({}).type).toEqual(FETCHING_GROUPS);
  });

  it('should dispatch CREATE_GROUP', () => {
    expect(createGroup({}).type).toEqual(CREATE_GROUP);
  });
});
