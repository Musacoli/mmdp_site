import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { api } from '../../../../utils/api';
import { SET_GROUP, FETCHING_GROUPS } from '../../../../constants';
import {
  fetchGroupsAsync,
  fetchGroupAsync,
  createGroupsAsync,
  updateGroupsAsync,
  deleteGroupsAsync,
} from '../../../../store/sagas/group';
import { fetchGroups, groupCreatedSuccessfully } from '../../../../store/actions/groups';

const id = 1;
const payload = { id };

describe('Group saga', async () => {
  describe('fetchGroupsAsync', async () => {
    const it = sagaHelper(fetchGroupsAsync());
    it('should have called api list group', (result) => {
      expect(result).toEqual(call(api.group.list));
    });
    it('and then trigger an fetchGroups', (result) => {
      expect(result).toEqual(put(fetchGroups({})));
    });
  });
  describe('fetchGroupAsync', async () => {
    const it = sagaHelper(fetchGroupAsync({ payload }));
    it('should have called the mock api.group.retrieve', (result) => {
      expect(result).toEqual(call(api.group.retrieve, id));
    });
    it('and then trigger a fetchGroups action', (result) => {
      expect(result).toEqual(put({
        type: SET_GROUP,
        payload: {},
      }));
    });
  });

  describe('createGroupsAsync', async () => {
    const it = sagaHelper(createGroupsAsync({ payload }));
    it('should have called the mock api.group.create', (result) => {
      expect(result).toEqual(call(api.group.create, payload));
    });
    it('and then trigger a groupCreatedSuccessfully action', (result) => {
      expect(result).toEqual(put(groupCreatedSuccessfully({})));
    });
  });

  describe('createGroupsAsync', async () => {
    const it = sagaHelper(createGroupsAsync({ payload: null }));
    it('should have called the mock api.group.create', (result) => {
      expect(result).toEqual(call(api.group.create, null));
    });
    it('and then trigger a groupCreatedSuccessfully action', (result) => {
      expect(result).toEqual(put(groupCreatedSuccessfully({})));
    });
  });

  describe('deleteGroupsAsync', async () => {
    const it = sagaHelper(deleteGroupsAsync({ payload }));
    it('should have called the mock api.group.delete', (result) => {
      expect(result).toEqual(call(api.group.delete, undefined));
    });
    it('and then trigger a FETCHING_GROUPS action', (result) => {
      expect(result).toEqual(put({
        type: FETCHING_GROUPS,
        payload: {},
      }));
    });
  });

  describe('updateGroupsAsync', async () => {
    const it = sagaHelper(updateGroupsAsync({ payload }));
    it('should have called the mock api.group.edit', (result) => {
      expect(result).toEqual(call(api.group.edit, 1, {}));
    });
    it('and then trigger a groupCreatedSuccessfully action', (result) => {
      expect(result).toEqual(put(groupCreatedSuccessfully({})));
    });
  });
});
