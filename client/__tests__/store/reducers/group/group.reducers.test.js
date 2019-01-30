/* eslint-env jest */
import {
  FETCH_GROUPS, FETCHING_GROUPS, TOGGLE_DELETE_GROUP,
  CREATE_GROUP, GROUP_CREATED_SUCCESS, DELETE_GROUP,
  CREATE_GROUP_FAILURE, TOGGLE_SELECT_GROUPS,
  CLEAR_GROUP_ERRORS, SET_GROUP, EDIT_GROUP,
} from '../../../../constants';
import groupReducer, { initialState } from '../../../../store/reducers/group';

describe('groupReducer Reducer', () => {
  it('should provide an initial state', () => {
    expect(groupReducer(initialState, {})).toEqual(initialState);
  });
  it('should fetch groupReducer', () => {
    expect(groupReducer(null, {
      type: FETCH_GROUPS,
      payload: { isFetching: false },
    }).isFetching).toEqual(false);
  });
  it('should show fetching groups', () => {
    expect(groupReducer(null, {
      type: FETCHING_GROUPS,
      payload: [{ cms: 'cms' }],
    }).isFetching).toEqual(true);
  });
  it('should toggle delete group', () => {
    expect(groupReducer(null, {
      type: TOGGLE_DELETE_GROUP,
      payload: {},
    })).toEqual(null);
  });

  it('should create group', () => {
    expect(groupReducer(null, {
      type: CREATE_GROUP,
      payload: {},
    }).isFetching).toEqual(true);
  });

  it('should set group as created successfully', () => {
    expect(groupReducer(null, {
      type: GROUP_CREATED_SUCCESS,
      payload: {},
    }).isFetching).toEqual(false);
  });

  it('should delete a group', () => {
    expect(groupReducer(initialState, {
      type: DELETE_GROUP,
      payload: {},
    }).isFetching).toEqual(false);
  });

  it('should show group failure', () => {
    expect(groupReducer(initialState, {
      type: CREATE_GROUP_FAILURE,
      payload: {},
    }).isFetching).toEqual(false);
  });

  it('should toggle selected group', () => {
    expect(groupReducer(initialState, {
      type: TOGGLE_SELECT_GROUPS,
      payload: {},
    }).isFetching).toEqual(false);
  });

  it('should clear selected group', () => {
    expect(groupReducer(initialState, {
      type: CLEAR_GROUP_ERRORS,
      payload: {},
    }).isFetching).toEqual(false);
  });

  it('should select a group', () => {
    expect(groupReducer(initialState, {
      type: SET_GROUP,
      payload: {},
    }).isFetching).toEqual(false);
  });

  it('should edit a group', () => {
    expect(groupReducer(initialState, {
      type: EDIT_GROUP,
      payload: {},
    }).isFetching).toEqual(false);
  });
});
