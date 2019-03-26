import { call, put, takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import * as types from '../../../constants';
import * as actions from '../../actions/dropdowns/communities';
import { api } from '../../../utils/api';

export function* fetchCommunities() {
  try {
    const response = yield call(api.dropdowns.community.list);
    const data = response ? response.data : {};
    yield put(actions.fetchCommunitiesSuccess(data));
  } catch (e) {
    yield put(actions.fetchCommunitiesFailure({}));
    const message = e.response
      ? e.response.data.message
      : 'Error listing communities';
    yield call(toastr.warning, message);
  }
}
export function* addCommunity({ payload }) {
  try {
    const newData = payload ? payload.new : false;
    let response;
    if (newData) {
      response = yield call(api.dropdowns.community.create, payload || {});
    } else {
      response = yield call(api.dropdowns.community.update, payload || {});
    }
    yield put(actions.addCommunitiesSuccess());
    yield put(actions.fetchCommunities());
    const {
      data: { message },
    } = response;
    toastr.success(message || 'Communities added successfully');
  } catch (e) {
    yield put(actions.addCommunitiesFailure({}));
    const message = e.response
      ? e.response.data.message
      : 'Error saving communities';
    yield call(toastr.warning, message);
  }
}

export function* deleteCommunity({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.dropdowns.community.delete, id);
    yield put(actions.deleteCommunitySuccess({}));
    yield put(actions.fetchCommunities());
    const {
      data: { message },
    } = response;
    toastr.success(message || 'Community Deleted successfully');
  } catch (e) {
    yield put(actions.deleteCommunityFailure({}));
    const message = e.response
      ? e.response.data.message
      : 'Error deleting community';
    yield call(toastr.warning, message);
  }
}

/**
 * watchers
 */
export function* watchFetchCommunities() {
  yield takeEvery(types.FETCH_COMMUNITIES, fetchCommunities);
}
export function* watchAddCommunities() {
  yield takeEvery(types.ADD_COMMUNITIES, addCommunity);
}
export function* watchDeleteCommunity() {
  yield takeEvery(types.DELETE_COMMUNITY, deleteCommunity);
}
