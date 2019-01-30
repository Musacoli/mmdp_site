import {
  put, takeEvery, takeLatest, call,
} from 'redux-saga/effects';
import { api } from '../../utils/api';
import { fetchGroups, groupCreatedSuccessfully } from '../../store/actions/groups';
import {
  FETCHING_GROUPS,
  CREATE_GROUP,
  CREATE_GROUP_FAILURE,
  UPDATE_GROUP, TOGGLE_DELETE_GROUP,
  FETCH_GROUP, SET_GROUP,
} from '../../constants';

export function* fetchGroupsAsync() {
  const groups = yield call(api.group.list);
  yield put(fetchGroups(groups.data));
}

export function* fetchGroupAsync({ payload }) {
  const group = yield call(api.group.retrieve, payload.id);
  yield put({
    type: SET_GROUP,
    payload: group.data,
  });
}

export function* createGroupsAsync({ payload }) {
  try {
    const group = yield call(api.group.create, payload);
    yield put(groupCreatedSuccessfully(group.data));
  } catch (err) {
    yield put(({
      type: CREATE_GROUP_FAILURE,
      payload: { errors: err.response.data.message },
    }));
  }
}

export function* updateGroupsAsync({ payload }) {
  try {
    const { id } = payload;
    delete payload.id;
    const group = yield call(api.group.edit, id, payload);

    yield put(groupCreatedSuccessfully(group.data));
  } catch (err) {
    yield put(({
      type: CREATE_GROUP_FAILURE,
      payload: { errors: err.response.data.message },
    }));
  }
}

export function* deleteGroupsAsync({ payload }) {
  try {
    const { _id } = payload;
    yield call(api.group.delete, _id);
    yield put(({
      type: FETCHING_GROUPS,
      payload: {},
    }));
    // window.location.reload();
  } catch (err) {
    yield put(({
      type: 'DELETE_GROUP_FAILURE',
      payload: { errors: err.response.data.message },
    }));
  }
}

/** WATCHERS */
export function* watchFetchingGroups() {
  yield takeEvery(FETCHING_GROUPS, fetchGroupsAsync);
}

export function* watchFetchingGroup() {
  yield takeEvery(FETCH_GROUP, fetchGroupAsync);
}

export function* watchCreateGroup() {
  yield (takeLatest(CREATE_GROUP, createGroupsAsync));
}

export function* watchUpdateGroup() {
  yield (takeLatest(UPDATE_GROUP, updateGroupsAsync));
}

export function* watchDeleteGroup() {
  yield (takeLatest(TOGGLE_DELETE_GROUP, deleteGroupsAsync));
}
