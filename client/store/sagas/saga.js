import { all, fork } from 'redux-saga/effects';
import loginSagaWatcher from './login/loginsaga';
import {
  watchFetchingGroups,
  watchFetchingGroup,
  watchCreateGroup,
  watchUpdateGroup,
  watchDeleteGroup,
} from './group';
import { watchAddReport } from './resources/report';
import { watchFetchingPermissions } from './permission';
import * as aboutWatcher from './about';
import { watchRegistration, watchUserEdit } from './users/AddUsersSaga';
import { watchDeleteUser } from './users/deleteUser';
import { watchFetchingUsers } from './users/fetchUsers';

export default function* root() {
  yield all([
    fork(watchFetchingGroups),
    fork(watchFetchingPermissions),
    fork(watchCreateGroup),
    fork(watchFetchingGroup),
    fork(watchUpdateGroup),
    fork(watchDeleteGroup),
    fork(loginSagaWatcher),
    fork(aboutWatcher.createGovernorMessageWatcher),
    fork(aboutWatcher.updateGovernorMessageWatcher),
    fork(aboutWatcher.getGovernorMessageWatcher),
    fork(aboutWatcher.createAboutMMDPWatcher),
    fork(aboutWatcher.updateAboutMMDPWatcher),
    fork(aboutWatcher.getAboutMMDPWatcher),
    fork(watchAddReport),
    fork(watchRegistration),
    fork(watchUserEdit),
    fork(watchFetchingUsers),
    fork(watchDeleteUser),
  ]);
}
