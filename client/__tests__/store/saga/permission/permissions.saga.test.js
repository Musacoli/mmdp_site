import sagaHelper from 'redux-saga-testing';
import { call, put } from 'redux-saga/effects';
import { api } from '../../../../utils/api';
import { fetchPermissionAsync } from '../../../../store/sagas/permission';
import { fetchPermissions } from '../../../../store/actions/permission';

describe('Permission saga', async () => {
  const it = sagaHelper(fetchPermissionAsync());
  it('should have called the mock API first permissions', (result) => {
    expect(result).toEqual(call(api.permission.list));
  });
  it('and then trigger an action for listed permissions', (result) => {
    expect(result).toEqual(put(fetchPermissions({})));
  });
});
