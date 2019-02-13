import { all, fork } from 'redux-saga/effects';
import loginSagaWatcher from './login/loginsaga';
import {
  watchFetchingGroups,
  watchFetchingGroup,
  watchCreateGroup,
  watchUpdateGroup,
  watchDeleteGroup,
} from './group';
import { watchReport } from './resources/report';
import { addUserResearchWatcher } from './resources/research';
import { watchAddDocument } from './resources/document';
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
import * as pillarWatcher from './pillar/pillarMiddleware';

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
    fork(aboutWatcher.createEdoStateApproachWatcher),
    fork(aboutWatcher.updateEdoStateApproachWatcher),
    fork(aboutWatcher.getEdoStateApproachWatcher),
    fork(aboutWatcher.createObjectivesWatcher),
    fork(aboutWatcher.updateObjectivesWatcher),
    fork(aboutWatcher.getObjectivesWatcher),
    fork(watchReport),
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
    fork(addUserResearchWatcher),
    fork(pillarWatcher.createPillarWatcher1),
    fork(pillarWatcher.createPillarWatcher2),
    fork(pillarWatcher.createPillarWatcher3),
    fork(pillarWatcher.createPillarWatcher4),

    fork(pillarWatcher.getPillarWatcher1),
    fork(pillarWatcher.getPillarWatcher2),
    fork(pillarWatcher.getPillarWatcher3),
    fork(pillarWatcher.getPillarWatcher4),

    fork(pillarWatcher.updatePillarWatcher1),
    fork(pillarWatcher.updatePillarWatcher2),
    fork(pillarWatcher.updatePillarWatcher3),
    fork(pillarWatcher.updatePillarWatcher4),
    fork(watchAddDocument),
  ]);
}
