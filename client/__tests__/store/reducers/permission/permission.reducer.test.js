/* eslint-env jest */
import { FETCHING_PERMISSIONS, FETCH_PERMISSIONS } from '../../../../constants';

import permissionReducer, { initialState } from '../../../../store/reducers/permission';

describe('Permission Reducer', () => {
  it('should provide an initial state', () => {
    expect(permissionReducer(initialState, {})).toEqual(initialState);
  });
  it('should fetch permissions', () => {
    expect(permissionReducer(null, {
      type: FETCHING_PERMISSIONS,
      payload: { isFetching: false },
    }).isFetching).toEqual(true);
  });
  it('should set permissions index', () => {
    expect(permissionReducer(null, {
      type: FETCH_PERMISSIONS,
      payload: [{ cms: 'cms' }],
    }).isFetching).toEqual(false);
  });
});
