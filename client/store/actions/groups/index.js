import {
  FETCH_GROUPS, FETCHING_GROUPS,
  CREATE_GROUP, GROUP_CREATED_SUCCESS, UPDATE_GROUP,
  CLEAR_GROUP_ERRORS, FETCH_GROUP, EDIT_GROUP, TOGGLE_DELETE_GROUP,
  SET_GROUP, TOGGLE_SELECT_GROUPS, UNSELECT_ALL_GROUPS,
} from '../../../constants';

export const fetchGroups = payload => ({
  type: FETCH_GROUPS,
  payload,
});

export const fetchGroup = payload => ({
  type: FETCH_GROUP,
  payload,
});

export const fetchingGroups = payload => ({
  type: FETCHING_GROUPS,
  payload,
});

export const createGroup = payload => ({
  type: CREATE_GROUP,
  payload,
});

export const updateGroup = payload => ({
  type: UPDATE_GROUP,
  payload,
});

export const editGroup = payload => ({
  type: EDIT_GROUP,
  payload,
});


export const setGroup = payload => ({
  type: SET_GROUP,
  payload,
});


export const groupCreatedSuccessfully = payload => ({
  type: GROUP_CREATED_SUCCESS,
  payload,
});

export const clearGroupErrors = payload => ({
  type: CLEAR_GROUP_ERRORS,
  payload,
});

export const toggleSelectGroups = payload => ({
  type: TOGGLE_SELECT_GROUPS,
  payload,
});

export const toggleDeleteGroup = payload => ({
  type: TOGGLE_DELETE_GROUP,
  payload,
});

export const unSelectAllGroups = payload => ({
  type: UNSELECT_ALL_GROUPS,
  payload,
});


export default fetchGroups;
