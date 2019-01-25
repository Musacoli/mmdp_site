import { all, fork } from 'redux-saga/effects';
import loginSagaWatcher from './login/loginsaga';
import {
  watchFetchingGroups,
  watchFetchingGroup,
  watchCreateGroup,
  watchUpdateGroup,
  watchDeleteGroup,
} from './group';
import { watchFetchingPermissions } from './permission';

export default function* root() {
  yield all([
    fork(watchFetchingGroups),
    fork(watchFetchingPermissions),
    fork(watchCreateGroup),
    fork(watchFetchingGroup),
    fork(watchUpdateGroup),
    fork(watchDeleteGroup),
    fork(loginSagaWatcher),
  ]);
}
