import { put, takeEvery, call } from 'redux-saga/effects';
import { api } from '../../../utils/api';
import { fetchPermissions } from '../../actions/permission';
import { FETCHING_PERMISSIONS } from '../../../constants';

export function* fetchPermissionAsync() {
  const permissions = yield call(api.permission.list);
  const data = permissions !== undefined ? permissions.data : {};
  yield put(fetchPermissions(data));
}

export function* watchFetchingPermissions() {
  yield takeEvery(FETCHING_PERMISSIONS, fetchPermissionAsync);
}
