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
import { watchFetchingOneUser } from './users/fetchOneUser';
import { watchAddEventWatcher } from './events/addEventSaga';
import { watcherListEvent } from './events/listEventsSaga';
import { singleEventWatcher } from './events/singleEventSaga';
import { updateEventWatcher } from './events/editEventSaga';
import { watcherDeleteEvent } from './events/deleteEventSaga';

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
    fork(aboutWatcher.createCoordinationWatcher),
    fork(aboutWatcher.updateCoordinationWatcher),
    fork(aboutWatcher.getCoordinationWatcher),
    fork(watchAddReport),
    fork(watchRegistration),
    fork(watchUserEdit),
    fork(watchFetchingUsers),
    fork(watchDeleteUser),
    fork(watchFetchingOneUser),
    fork(watchAddEventWatcher),
    fork(watcherListEvent),
    fork(singleEventWatcher),
    fork(updateEventWatcher),
    fork(watcherDeleteEvent),
  ]);
}
