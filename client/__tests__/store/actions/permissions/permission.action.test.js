/* eslint-env jest */
import { FETCHING_PERMISSIONS, FETCH_PERMISSIONS } from '../../../../constants';
import { fetchPermissions, fetchingPermissions } from '../../../../store/actions/permission';

describe('Permission Actions Creators', () => {
  it('should dispatch FETCHING_PERMISSIONS', () => {
    expect(fetchingPermissions({}).type).toEqual(FETCHING_PERMISSIONS);
  });
  it('should dispatch FETCH_PERMISSIONS', () => {
    expect(fetchPermissions({}).type).toEqual(FETCH_PERMISSIONS);
  });
});
