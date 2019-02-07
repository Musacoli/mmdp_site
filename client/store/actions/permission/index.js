import { FETCHING_PERMISSIONS, FETCH_PERMISSIONS } from '../../../constants';

export const fetchPermissions = (payload) => ({
  type: FETCH_PERMISSIONS,
  payload,
});

export const fetchingPermissions = (payload) => ({
  type: FETCHING_PERMISSIONS,
  payload,
});

export default fetchPermissions;
